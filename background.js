var update_status = false;
var isExtensionOn = true;
chrome.browserAction.onClicked.addListener(function(tab){
    isExtensionOn = true;
    update_status = false;
    chrome.tabs.update({url: 'https://www.google.com/'});
});

function receiveMessage(message, sender, callback) {
    if(!isExtensionOn) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'close');});
        return;
    }
    if(message.type === 'success') {
        update_status = false;
    }
    if(message.type === 'updateUrl') {
        $.ajax({
            type: 'GET',
            // url: 'http://localhost/german/server.php',
            url: 'https://bestensverpackt.de/german/server.php',
            dataType : "JSON",
            success: function (res) {
                if(res.length>0){
                    var record = res[0];
                    if(!update_status){
                        if(!record.web){
                            var searchUrl = `https://www.google.com/search?q=${record.firmenname}+${record.strasse}+${record.plz}+${record.ort}`;
                            chrome.tabs.update({url: searchUrl});
                        } else {
                            $.ajax({
                                type: "GET",
                                url: "https://"+record.web,
                                success: function(){
                                    chrome.tabs.update({url: 'https://'+record.web});
                                },
                                error: function(){
                                    chrome.tabs.update({url: 'https://errorsite.com'});
                                }
                            });
                        }
                    }
                    update_status = true;
                    chrome.runtime.sendMessage({type: "display", record: record});
                } else {
                    setTimeout(function(){ chrome.runtime.sendMessage({type: "allset"}); }, 1000);
                }
            }
        });
    }
    if(message.type === 'closeExtension') {
        isExtensionOn = false;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'close');});
    }
    if(message.type === 'get_url') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, 'get_url');});
    }
    if(message.type === 'set_freifeld_2') {
        chrome.runtime.sendMessage({type: "set_freifeld_2_popup", freifeld_2: message.freifeld_2});
    }
    if(message.type === 'set_url') {
        chrome.runtime.sendMessage({type: "set_url_popup", url: message.url});
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);

