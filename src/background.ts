chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (!tab.url || tab.url.startsWith("chrome://")) {
        return;
    }

    if (changeInfo.status === "complete") {
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["haps.js"],
        });

        await chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["haps.css"],
        });

        console.log(chrome);
        console.log(chrome.action);

        await chrome.action.setBadgeText({
            text: "ON",
            tabId: tabId,
        });
    }
});
