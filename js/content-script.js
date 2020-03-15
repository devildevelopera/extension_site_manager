chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "open"){
        open();
    }
    if(msg == "close"){
        close();
    }
})

var iframe = document.createElement('iframe'); 
iframe.style.background = "#f0f0f0";
iframe.style.width = "100%";
iframe.style.height = "0px";
iframe.style.position = "fixed";
iframe.style.bottom = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none";
iframe.src = chrome.extension.getURL("popup.html");

document.body.appendChild(iframe);

function open(){
    iframe.style.height="300px";
}

function close(){
    iframe.style.height="0px";
}

window.addEventListener('load', (event) => {
    open();
    chrome.runtime.sendMessage({type: "display", url: window.location.hostname});
});