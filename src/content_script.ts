const script = document.createElement("script");
script.src = chrome.runtime.getURL("inject_script.js");
script.onload = () => script.remove();
document.documentElement.appendChild(script);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "inject_token") {
    window.postMessage(message, "*");
    sendResponse({ success: true });
  }
  return true;
});
