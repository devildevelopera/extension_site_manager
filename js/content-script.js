chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "close"){
        close();
    }
    if(msg == "minimize"){
        minimize();
    }
    if(msg == "maximize"){
        maximize();
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

function close(){
    iframe.style.height="0px";
}

function minimize(){
    iframe.style.width="100px";
    iframe.style.height="75px";
}
function maximize(){
    iframe.style.width="100%";
    iframe.style.height="350px";
}

window.addEventListener('load', (event) => {
    chrome.runtime.sendMessage({type: "get_size"});
    $.ajax({
        type: "GET",
        url: window.location.href,
        success: function(response){
            var freifeld_2 = response.substr(response.length - 190);
            chrome.runtime.sendMessage({type: "set_freifeld_2", freifeld_2: freifeld_2});
        }
    });
});
