var url = '';
var index = 0;
function getData() {
    $.ajax({
        type: 'GET',
        // url: 'http://localhost/german/server.php',
        url: 'https://bestensverpackt.de/german/server.php',
        dataType : "JSON",
        success: function (data) {
            for(var i=0; i<data.length; i++) {
                if(data[i].freifeld_1){
                    data.splice(i, 1);
                    i--;
                }
            }
            // console.log(data);
            localStorage.removeItem('data');
            localStorage.setItem('data', JSON.stringify(data));
            if(!localStorage.getItem('index')){
                localStorage.setItem('index', 0);
            }
        }
    });
}

function display(data) {
    index = parseInt(localStorage.getItem('index'));
    if(!data){
        return;
    } else if(!data[index]){
        return;
    }
    $('#id').val(data[index].id);
    $('#firmenname').val(data[index].firmenname);
    $('#strasse').val(data[index].strasse);
    $('#plz').val(data[index].plz);
    $('#ort').val(data[index].ort);
    $('#vorname').val(data[index].vorname);
    $('#nachname').val(data[index].nachname);
    $('#url').val(data[index].web);
    if(data[index].anrede === 'Herr'){
        $('#herr').prop('checked', true);
    } else if(data[index].anrede === 'Frau'){
        $('#frau').prop('checked', true);
    } else if(data[index].anrede === ''){
        $('#gnv').prop('checked', true);
    }
    if(data[index].titel === 'Dr.'){
        $('#dr').prop('checked', true);
    } else if(data[index].titel === 'Prof.'){
        $('#prof').prop('checked', true);
    } else if(data[index].titel === ''){
        $('#tnv').prop('checked', true);
    }

    switch(data[index].freifeld_1) {
        case '1':
            $('#freifeld_1-1').prop('checked', true);
          break;
        case '2':
            $('#freifeld_1-2').prop('checked', true);
          break;
        case '3':
            $('#freifeld_1-3').prop('checked', true);
          break;
        case '4':
            $('#freifeld_1-4').prop('checked', true);
          break;
        case 'Shop':
            $('#freifeld_1-Shop').prop('checked', true);
          break;
        case 'Werbung':
            $('#freifeld_1-Werbung').prop('checked', true);
          break;
        case 'Foto':
            $('#freifeld_1-Foto').prop('checked', true);
          break;
        case 'Nein':
            $('#freifeld_1-Nein').prop('checked', true);
          break;
        default:
          // code block
      }
      if($('#url').val() && url != $('#url').val() && url != "www.google.com") {
        chrome.runtime.sendMessage({type: 'updateUrl', web: 'https://'+$('#url').val()});
      }
}

$(document).ready(() => {
    getData();
});

document.addEventListener('DOMContentLoaded', function() {
    var getUrlButton = document.getElementById('get_url');
    getUrlButton.addEventListener('click', function() {
            $('#url').val(url);
    });

    var gotoUrlButton = document.getElementById('gotoUrl');
    gotoUrlButton.addEventListener('click', function() {
        if($('#url').val()){
            chrome.runtime.sendMessage({type: 'updateUrl', web: 'https://'+$('#url').val()});
        }
    });

    var closeButton = document.getElementById('close');
    closeButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'closePanel'});
    });

    var backButton = document.getElementById('back');
    backButton.addEventListener('click', function() {
        var data = JSON.parse(localStorage.getItem('data'));
        index = parseInt(localStorage.getItem('index')) - 1;
        localStorage.setItem('index', index);
        if(index < 0){
            index = data.length-1;
            localStorage.setItem('index', index);
        }
        if(data[index].web){
            chrome.runtime.sendMessage({type: 'updateUrl', web: 'https://'+data[index].web});
        } else {
            var searchUrl = `https://www.google.com/search?q=${data[index].firmenname}+${data[index].strasse}+${data[index].plz}+${data[index].ort}`;
            chrome.runtime.sendMessage({type: 'updateUrl', web: searchUrl});
        }
    });

    var nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function() {
        var id = $('#id').val();
        var firmenname = $('#firmenname').val();
        var strasse = $('#strasse').val();
        var plz = $('#plz').val();
        var ort = $('#ort').val();
        var vorname = $('#vorname').val();
        var nachname = $('#nachname').val();
        var anrede = $("input[name='anrede']:checked").val();
        var titel = $("input[name='titel']:checked").val();
        var freifeld_1 = $("input[name='freifeld_1']:checked").val();
        var newurl = $('#url').val();
        if(freifeld_1 === undefined){
            freifeld_1 = "";
        }
        if(newurl === "www.google.com") {
            newurl = "";
        }
        if(newurl === "") {
            freifeld_1 = "";
        }
        var updateData = {
            'id': id,
            'firmenname': firmenname,
            'strasse': strasse,
            'plz': plz,
            'ort': ort,
            'vorname': vorname,
            'nachname': nachname,
            'anrede': anrede,
            'titel': titel,
            'freifeld_1': freifeld_1,
            'web': newurl
        };
        $.ajax({
            type: 'POST',
            // url: 'http://localhost/german/update.php',
            url: 'https://bestensverpackt.de/german/update.php',
            data: updateData,
            success: function (result) {
                if(result === 'success') {
                    var data = JSON.parse(localStorage.getItem('data'));
                    index = parseInt(localStorage.getItem('index')) + 1;
                    localStorage.setItem('index', index);
                    if(index >= data.length){
                        index = 0;
                        localStorage.setItem('index', index);
                    }
                    if(data[index].web){
                        chrome.runtime.sendMessage({type: 'updateUrl', web: 'https://'+data[index].web});
                    } else {
                        var searchUrl = `https://www.google.com/search?q=${data[index].firmenname}+${data[index].strasse}+${data[index].plz}+${data[index].ort}`;
                        chrome.runtime.sendMessage({type: 'updateUrl', web: searchUrl});
                    }
                }
            }
        });
    });
});

function receiveMessage(message, sender, callback) {
    if(message.type === 'godisplay') {
        url = message.url;
        var data = JSON.parse(localStorage.getItem('data'));
        display(data);
        // if(url === "www.google.com") {
        //     chrome.runtime.sendMessage({type: 'updateUrl', web: 'https://'+data[index].web});
        // }
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);