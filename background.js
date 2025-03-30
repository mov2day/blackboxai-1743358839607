chrome.storage.local.set({ xpath: "" });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "set_xpath") {
    chrome.storage.local.set({ xpath: request.xpath });
  }
});