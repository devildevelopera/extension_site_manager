chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "close"){
        close();
    }
    if(msg === "get_url"){
        chrome.runtime.sendMessage({type: "set_url", url: window.location.hostname});
	}
})

var iframe = document.createElement('iframe');
iframe.style.width = "100%";
iframe.style.height = "0px";
iframe.style.position = "fixed";
iframe.style.bottom = "50px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none";
iframe.src = chrome.extension.getURL("popup.html");

if(window.location.hostname != 'bestensverpackt.de') {
    document.body.appendChild(iframe);
}

function open(){
    iframe.style.height="350px";
}

function close(){
    iframe.style.height="0px";
}

window.addEventListener('load', (event) => {
    open();
    var bodystring = document.documentElement.outerHTML;
    var freifeld_2 = bodystring.substr(bodystring.length - 190);
    chrome.runtime.sendMessage({type: "set_freifeld_2", freifeld_2: freifeld_2});
});
