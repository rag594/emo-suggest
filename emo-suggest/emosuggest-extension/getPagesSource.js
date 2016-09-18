var messArr = [];
    function throttle (callback, limit) {
    var wait = false;                 // Initially, we're not waiting
    return function () {              // We return a throttled function
        if (!wait) {                  // If we're not waiting
            callback.call();          // Execute users function
            wait = true;              // Prevent future invocations
            setTimeout(function () {  // After a period of time
                wait = false;         // And allow future invocations
            }, limit);
        }
    }
}
function start(document) {

        var message = document.getElementsByClassName('input')[1].innerHTML;
        messArr.push(message);

        if((messArr[messArr.length-1]) != (messArr[messArr.length-2])){
            console.log(messArr[messArr.length-1]);
        }

            var xmlhttp = new XMLHttpRequest();
            var url = "http://localhost:5000/q?text="+(messArr[messArr.length-1]).toString();

        //     xmlhttp.onreadystatechange = function() {
        //         console.log("Response",JSON.parse(this.responseText));
        //     }

        //     xmlhttp.open("GET", url, true);
        //     xmlhttp.send();

        // }


            // var div = document.createElement('div');
            // div.style.position = 'fixed';
            // div.style.bottom = 0;
            // div.style.right = 0;
            // div.style.width = "250px";
            // div.style.height = "250px";
            // div.style.opacity = 0.6;
            // div.style.backgroundColor = "#ffe0bd";
            // div.textContent = (messArr[messArr.length-1]).toString();
            // document.body.appendChild(div); 

        return url;
        
}



chrome.runtime.sendMessage({
    action: "getSource",
    source: start(document)
});