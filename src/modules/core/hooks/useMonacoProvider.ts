import { loader, Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const useMonacoProvider = () => {
  const [monaco, setMonaco] = useState<Monaco>();

  loader.init().then((monacoInit) => {
    setMonaco(monacoInit);
  });

  useEffect(() => {
    if (monaco) {
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: (model: any, position: any) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return {
            suggestions: [
              {
                label: "my_assertNotEqual",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "assertNotEqual(a,b)",
                range: range,
              },
              {
                label: "my_assertEqual",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "assertEqual(a,b)",
                range: range,
              },
            ],
          };
        },
      });
    }
  }, [monaco]);
};

export default useMonacoProvider;
