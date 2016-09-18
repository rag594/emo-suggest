chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    //message.innerText = "👑🔕🍔🍟".toString('utf-8');
    axios.get(request.source)
      .then(function(response) {
        console.log("Res",response);
        //message.innerText = response.data;
        //
        var str = response.data;//"a,b,c,d,e";
        var splitArr = str.split(',');
        message.innerHTML = 
        '<input id="but1" type="button" style="font-size:30px" value='+splitArr[0]+' >\
        <input id= "but2" type="button" style="font-size:30px" value='+ splitArr[1]+' >\
        <input id= "but3" type="button" style="font-size:30px" value='+ splitArr[2]+' >\
        <input id= "but4" type="button" style="font-size:30px" value='+ splitArr[3]+' >\
        <input id= "but5" type="button" style="font-size:30px" value='+ splitArr[4]+' >';
        var textArea = document.createElement('textarea');
        var str="";
        document.getElementById("but1").addEventListener("click", function() {
          str+= document.getElementById("but1").value;
          textArea.value=str;
          document.body.appendChild(textArea);
          textArea.select();
          var msg = document.execCommand("copy");
        });
        document.getElementById("but2").addEventListener("click", function() {
          str+= document.getElementById("but2").value;
          textArea.value=str;
          document.body.appendChild(textArea);
          textArea.select();
          var msg = document.execCommand("copy");
          console.log(msg);
        });
        document.getElementById("but3").addEventListener("click", function() {
          str+= document.getElementById("but3").value;
          textArea.value=str;
          document.body.appendChild(textArea);
          textArea.select();
          var msg = document.execCommand("copy");
          console.log(msg);
        });
        document.getElementById("but4").addEventListener("click", function() {
          str+= document.getElementById("but4").value;
          textArea.value=str;
          document.body.appendChild(textArea);
          textArea.select();
          var msg = document.execCommand("copy");
          console.log(msg);
        });
        document.getElementById("but5").addEventListener("click", function() {
          str+= document.getElementById("but5").value;
          textArea.value=str;
          document.body.appendChild(textArea);
          textArea.select();
          var msg = document.execCommand("copy");
          console.log(msg);
        });
         
      })
      .catch(function (err) {
        console.log(err);
      })
  }

});



function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}
window.onload = onWindowLoad;