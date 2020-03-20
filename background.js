var currentUrl = 'https://www.google.com/';
var active_status = false; 
chrome.browserAction.onClicked.addListener(function(tab){
    if(tab.url === 'chrome://newtab/' || !active_status){
        chrome.tabs.update({url: 'https://www.google.com/'});
    }
});

function receiveMessage(message, sender, callback) {
    if(message.type === 'updateUrl') {
        currentUrl = message.web;
        chrome.tabs.update({url: message.web});
    }
    if(message.type === 'closePanel') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'close');});
    }
    if(message.type === 'display') {
        currentUrl = message.url;
        chrome.runtime.sendMessage({type: "godisplay", url: currentUrl});
    }
    if(message.type === 'active') {
        active_status = true;
    }
    if(message.type === 'inactive') {
        active_status = false;
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);

