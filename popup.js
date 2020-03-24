function display(record) {
    $('#id').val(record.id);
    $('#firmenname').val(record.firmenname);
    $('#strasse').val(record.strasse);
    $('#plz').val(record.plz);
    $('#ort').val(record.ort);
    $('#vorname').val(record.vorname);
    $('#nachname').val(record.nachname);
    $('#url').val(record.web);
    if(record.anrede === 'Herr'){
        $('#herr').prop('checked', true);
    } else if(record.anrede === 'Frau'){
        $('#frau').prop('checked', true);
    } else if(record.anrede === ''){
        $('#gnv').prop('checked', true);
    }
    if(record.titel === 'Dr.'){
        $('#dr').prop('checked', true);
    } else if(record.titel === 'Prof.'){
        $('#prof').prop('checked', true);
    } else if(record.titel === ''){
        $('#tnv').prop('checked', true);
    }

    switch(record.freifeld_1) {
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
}

document.addEventListener('DOMContentLoaded', function() {
    var getUrlButton = document.getElementById('get_url');
    getUrlButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'get_url'});
    });

    var newRecordButton = document.getElementById('new-record');
    newRecordButton.addEventListener('click', function() {
        $('#id').val('');
        $('#firmenname').val('');
        $('#strasse').val('');
        $('#plz').val('');
        $('#ort').val('');
        $('#vorname').val('');
        $('#nachname').val('');
        $("input[name='anrede']").prop("checked",false);
        $("input[name='titel']").prop("checked",false);
        $("input[name='freifeld_1']").prop("checked",false);
        $('#url').val('');
    });

    var closeButton = document.getElementById('close');
    closeButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'closeExtension'});
    });

    var minusButton = document.getElementById('minus');
    minusButton.addEventListener('click', function() {
        $('.big').hide();
        $('#plusdiv').show();
    });
    var plusButton = document.getElementById('plusdiv');
    plusButton.addEventListener('click', function() {
        $('.big').show();
        $('#plusdiv').hide();
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
        var freifeld_2 = $('#freifeld_2').val();
        var newurl = $('#url').val();
        if(!freifeld_2){
            freifeld_2 = '';
        }
        if(newurl === "www.google.com.hk") {
            newurl = "";
            $('#modal-title').html("Info");
            $('#modal-body').html("Choosse the real site, please!");
            $('#modal').click();
            return;
        }
        if(!freifeld_1 || !newurl){
            $('#modal-title').html("Info");
            $('#modal-body').html("Choose the site and Select the type, please!");
            $('#modal').click();
            return;
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
            'freifeld_2': freifeld_2,
            'web': newurl
        };
        $.ajax({
            type: 'POST',
            // url: 'http://localhost/german/update.php',
            url: 'https://bestensverpackt.de/german/update.php',
            data: updateData,
            success: function (result) {
                if(result === 'success') {
                    chrome.runtime.sendMessage({type: 'success'});
                    chrome.runtime.sendMessage({type: 'updateUrl'});
                }
            }
        });
    });
});

$(document).ready(() => {
    $('#plusdiv').hide();
    chrome.runtime.sendMessage({type: "updateUrl"});
});

function receiveMessage(message, sender, callback) {
    if(message.type === 'display') {
        display(message.record);
    }

    if(message.type === 'allset') {
        $('#modal-title').html("All set");
        $('#modal-body').html("All records have been classified!");
        $('#modal').click();
    }
    if(message.type === 'set_url_popup') {
        if(message.url != 'errorsite.com'){
            var url = message.url;
            $('#url').val(url);
        }
    }
    if(message.type === 'set_freifeld_2_popup') {
        var freifeld_2 = message.freifeld_2;
        $('#freifeld_2').val(freifeld_2);
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);