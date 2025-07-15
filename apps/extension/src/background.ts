// Listen for messages from the popup (or content script)
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "makeRequest") {
    const { url, payload } = message;
    console.log("Payload from popup:", payload);

    const jsonPayload = JSON.stringify(payload);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
      mode: "cors",
      credentials: "omit",
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keep the channel open for async response
  }
});

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const headers = details.responseHeaders?.filter(
      (header) => !["access-control-allow-origin", "access-control-allow-methods"].includes(header.name.toLowerCase()),
    );

    headers?.push(
      { name: "Access-Control-Allow-Origin", value: "*" },
      {
        name: "Access-Control-Allow-Methods",
        value: "GET, POST, PUT, DELETE, OPTIONS",
      },
      { name: "Access-Control-Allow-Headers", value: "*" },
    );

    return { responseHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"],
);
