import { GetSingleTestCaseResponse } from '@/types/document.type';

interface TestCaseItemProps {
	index: number;
	onSelected: Function;
	onDeleted: Function;
	item: GetSingleTestCaseResponse;
}

const TestCaseItem = (props: TestCaseItemProps) => {
	return <div>TestCaseItem</div>;
};

export default TestCaseItem;
