console.log('popup is run....')
//console.log(' VITE_HI: ', import.meta.env);
import Application from "./app/Application";

//import Environment from "./env";
//console.log('runat==', Environment)
try {
  chrome.browserAction.onClicked.addListener(() => {
    console.log('content to be loaded')
    chrome.tabs.executeScript({
      file: 'content.js',
    });
  });
} catch (err) { }

const launchApplication = () => {
  const app = new Application('#root')
}
document.addEventListener("DOMContentLoaded", launchApplication)
