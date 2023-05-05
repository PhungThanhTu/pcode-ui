import MarkdownPreview from '@uiw/react-markdown-preview';

interface PreviewProps {
	source: any;
	type: string;
}
const Preview = (props: PreviewProps) => {
	const { source } = props;

	return <MarkdownPreview source={source} />;
};

export default Preview;
