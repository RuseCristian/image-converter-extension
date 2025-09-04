chrome.runtime.onInstalled.addListener(() => {
  
  // Create parent menu
  chrome.contextMenus.create({
    id: "convertImage",
    title: "Convert Image",
    contexts: ["image"]
  });

  // Create child menu items
  chrome.contextMenus.create({
    id: "convertToPNG",
    parentId: "convertImage",
    title: "Convert to PNG",
    contexts: ["image"]
  });

  chrome.contextMenus.create({
    id: "convertToJPG",
    parentId: "convertImage",
    title: "Convert to JPG",
    contexts: ["image"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return;
  const format = info.menuItemId === "convertToPNG" ? "PNG" : "JPG";
  chrome.tabs.sendMessage(tab.id, {
    type: 'CONTEXT_MENU_CLICKED',
    imageUrl: info.srcUrl,
    format: format
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_DATA') {
    // Handle data requests
    sendResponse({ success: true });
  }
  return true;
});

