import Editor from '@monaco-editor/react';

export const CodeEditor = () => {
	return <Editor height="90vh" width="45vw" defaultLanguage="cpp" defaultValue="//some code" theme="light" />;
};
