//通信をキャッチする
// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log(details.url);
//     },
//     {urls: ['<all_urls>']},
//     []
// );

//background->タブのデータの受け渡し
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
