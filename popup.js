document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#showAlert').addEventListener('change', function() {
        var details={name: "Joseph",
        url:"testlink"};
        console.log(details.url);
        // 現在のタブを取得する
        chrome.tabs.query({
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
        }, function (result) {
            var currentTab = result.shift();
            // 取得したタブに対してメッセージを送る
            chrome.tabs.sendMessage(currentTab.id, details, function() {});
        });
    });
});


chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log(details.url);
        // 現在のタブを取得する
        chrome.tabs.query({
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
        }, function (result) {
            var currentTab = result.shift();
            // 取得したタブに対してメッセージを送る
            chrome.tabs.sendMessage(currentTab.id, details, function() {});
        });
    },
    {urls: ['<all_urls>']},
    []
);





function changeHandler(){
    chrome.runtime.sendMessage({
        type: "hello",
        text: "Taka"
    }, function (response) {
        if (response) {
            alert(response);
        }
    });

    // //Do Something...maybe another function showAlert(), for instance
    // if(showAlert.checked){
    //    //do something
    //    alert("bomb");
    // }
    // else{
    //    //do something else
    //    alert("bomb");
    //
    // }
}
