
var pop_alert = function(passed_message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: passed_message},
            function(response) { /* Ignore any response. */ }
        );
    });
}
// chrome.browserAction.onClicked.addListener(function (tab) {
// 	// for the current tab, inject the "inject.js" file & execute it
//     chrome.tabs.executeScript(tab.ib, {
// 		file: 'inject.js'
// 	});
	
// });	