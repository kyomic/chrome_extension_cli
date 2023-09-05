// 监听插件图标点击事件
chrome.browserAction.onClicked.addListener(() => {
  console.log('content to be loaded')
  chrome.tabs.executeScript({
    file: 'content.js',
  });
});
