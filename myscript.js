//backgroundからのメッセージを受け取る
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("myscript ",message.url);
});

//
//
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         switch (request.type) {
//             case "hello":
//             hello(request.text, sendResponse);
//             break;
//             case "night":
//             night(request.text, sendResponse);
//             break;
//             default:
//             console.log("Error: Unkown request.")
//             console.log(request);
//         }
//     }
// );
//
// function hello(name, callback) {
//     callback("Hello, " + name);
// }
//
// function night(name, callback) {
//     callback("Good night, " + name);
// }
