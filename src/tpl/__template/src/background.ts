console.log('background module loaded')
chrome.runtime.onInstalled.addListener(function () {
  console.log('插件安装')
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });
});
console.log('browserAction', chrome.browserAction)
chrome.browserAction.onClicked.addListener(() => {
  console.log('content to be loaded')
  // alert(1)
  // chrome.tabs.executeScript({
  //   file: 'content.js',
  // });
});
