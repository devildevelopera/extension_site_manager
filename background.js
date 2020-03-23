var current_url = "";
var active_status = false;
var update_status = false;
chrome.browserAction.onClicked.addListener(function(tab){
    if(tab.url === 'chrome://newtab/'){
        chrome.tabs.update({url: 'https://www.google.com/'});
    } else if(!active_status){
        chrome.tabs.update({url: 'http://errorsite.com/'});
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'open');});
    }
});

function receiveMessage(message, sender, callback) {
    if(message.type === 'success') {
        update_status = false;
        active_status = false;
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
                        } else if(record.web != current_url && current_url != 'errorsite.com'){
                                chrome.tabs.update({url: 'https://'+record.web});
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
    if(message.type === 'closePanel') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'close');});
    }
    if(message.type === 'get_url') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, 'get_url');});
    }
    if(message.type === 'active') {
        active_status = true;
    }
    if(message.type === 'inactive') {
        current_url = message.url;
    }
    if(message.type === 'set_url') {
        current_url = message.url;
        chrome.runtime.sendMessage({type: "set_url_popup", url: message.url});
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);

