export const EditorButton = (p: { text: string; onClick: () => void }) => (
  <div className="editor-button" onClick={p.onClick}>
    {p.text}
  </div>
)
