export const getObjectProperty = (obj: Record<string, never>, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj as Record<string, never>);

window.addEventListener("message", (event) => {
  if (event.source !== window || event.data.type !== "inject_token") return;

  try {
    const editorElement = document.querySelectorAll(".CodeMirror")?.[1];
    if (!editorElement) throw new Error("CodeMirror editor not found");

    const editor = (editorElement as any).CodeMirror;
    if (!editor) throw new Error("CodeMirror instance not found");

    const content = editor.getValue().trim();
    const token = getObjectProperty(event.data.payload, event.data.token_path);

    let headers: Record<string, any> = {};
    if (content) headers = JSON.parse(content);

    headers["Authorization"] = `Bearer ${token}`;
    editor.setValue(JSON.stringify(headers, null, 2));
    editor.setCursor(editor.lineCount() - 1);

    console.log("Token injected successfully.");
  } catch (error) {
    console.error("Error injecting token:", error);
  }
});
