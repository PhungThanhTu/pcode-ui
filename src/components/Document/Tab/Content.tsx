import MarkdownPreview from '@uiw/react-markdown-preview';

interface PreviewProps {
	source: any;
	type: string;
}
const Content = (props: PreviewProps) => {
	const { source } = props;

	return <MarkdownPreview source={source} />;
};

export default Content;
