chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "open"){
        open();
    }
    if(msg == "close"){
        close();
    }
    if(msg === "get_url"){
        chrome.runtime.sendMessage({type: "set_url", url: window.location.hostname});
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

if(window.location.hostname != 'bestensverpackt.de') {
    document.body.appendChild(iframe);
}

function open(){
    iframe.style.height="300px";
}

function close(){
    iframe.style.height="0px";
}

chrome.runtime.sendMessage({type: "active"});

window.addEventListener('load', (event) => {
    open();
    chrome.runtime.sendMessage({type: "inactive", url: window.location.hostname});
});
