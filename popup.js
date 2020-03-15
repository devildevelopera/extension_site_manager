var url = '';
var index = 0;
function getData() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/german/server.php',
        dataType : "JSON",
        success: function (data) {
            for(var i=0; i<data.length; i++) {
                if(data[i].optradio){
                    data.splice(i, 1);
                }
            }
            localStorage.setItem('data', JSON.stringify(data));
            if(!localStorage.getItem('index')){
                localStorage.setItem('index', 0);
            }
        }
    });
}

function display(data) {
    if(!data){
        return;
    }
    index = parseInt(localStorage.getItem('index'));
    $('#comid').val(data[index].comid);
    $('#firmenname').val(data[index].firmenname);
    $('#strasse').val(data[index].strasse);
    $('#plz').val(data[index].plz);
    $('#ort').val(data[index].ort);
    $('#vorname').val(data[index].vorname);
    $('#nachname').val(data[index].nachname);
    $('#url').val(data[index].web);
    if(data[index].gender === 'Herr'){
        $('#herr').prop('checked', true);
    } else if(data[index].gender === 'Frau'){
        $('#frau').prop('checked', true);
    } else if(data[index].gender === ''){
        $('#gnv').prop('checked', true);
    }
    if(data[index].titel === 'Dr'){
        $('#dr').prop('checked', true);
    } else if(data[index].titel === 'Prof'){
        $('#pref').prop('checked', true);
    } else if(data[index].titel === ''){
        $('#tnv').prop('checked', true);
    }

    switch(data[index].optradio) {
        case '1':
            $('#optradio-1').prop('checked', true);
          break;
        case '2':
            $('#optradio-2').prop('checked', true);
          break;
        case '3':
            $('#optradio-3').prop('checked', true);
          break;
        case '4':
            $('#optradio-4').prop('checked', true);
          break;
        case 'Shop':
            $('#optradio-Shop').prop('checked', true);
          break;
        case 'Werbung':
            $('#optradio-Werbung').prop('checked', true);
          break;
        case 'Foto':
            $('#optradio-Foto').prop('checked', true);
          break;
        case 'Nein':
            $('#optradio-Nein').prop('checked', true);
          break;
        default:
          // code block
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
            window.open(url);
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
            chrome.runtime.sendMessage({type: 'updateUrl', web: data[index].web});
        } else {
            var searchUrl = `https://www.google.com/search?q=${data[index].firmenname}+${data[index].strasse}+${data[index].plz}+${data[index].ort}`;
            chrome.runtime.sendMessage({type: 'updateUrl', web: searchUrl});
        }
    });

    var nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function() {
        var data = JSON.parse(localStorage.getItem('data'));
        var comid = $('#comid').val();
        var firmenname = $('#firmenname').val();
        var strasse = $('#strasse').val();
        var plz = $('#plz').val();
        var ort = $('#ort').val();
        var vorname = $('#vorname').val();
        var nachname = $('#nachname').val();
        var gender = $("input[name='gender']:checked").val();
        var titel = $("input[name='titel']:checked").val();
        var optradio = $("input[name='optradio']:checked").val();
        var newurl = $('#url').val();
        if(optradio === undefined){
            optradio = "";
        }
        var updateData = {
            'comid': comid,
            'firmenname': firmenname,
            'strasse': strasse,
            'plz': plz,
            'ort': ort,
            'vorname': vorname,
            'nachname': nachname,
            'gender': gender,
            'titel': titel,
            'optradio': optradio,
            'web': newurl
        };
        console.log(updateData)
        $.ajax({
            type: 'POST',
            url: 'http:/localhost/german/update.php',
            data: updateData,
            success: function (result) {
                if(result === 'success') {
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
        if(url === "https://www.google.com/") {
            chrome.runtime.sendMessage({type: 'updateUrl', web: data[index].web});
        }
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);