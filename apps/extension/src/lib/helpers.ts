import { Request } from "./types";

export async function sendRequest(values: Omit<Omit<Request, "id">, "timestamp">) {
  const transformedData = values.fields.reduce<Record<string, string>>((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});

  chrome.runtime.sendMessage({ type: "makeRequest", url: values.endpoint, payload: transformedData }, (response) => {
    if (response?.success) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs?.[0]?.id)
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "inject_token",
            payload: response.data,
            token_path: values.token_path,
          });
      });
    } else if (chrome.runtime.lastError) console.error(chrome.runtime.lastError.message);
    else console.error(response.error);
  });
}
