var currentUrl = 'https://www.google.com/';
chrome.browserAction.onClicked.addListener(function(tab){
    if(tab.url === 'chrome://newtab/'){
        chrome.tabs.update({url: 'https://www.google.com/'});
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'open');});
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
}

chrome.runtime.onMessage.addListener(receiveMessage);

