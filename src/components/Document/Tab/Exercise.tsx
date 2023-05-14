import DocumentTabLayout from "@/layouts/DocumentTabLayout";

interface ExerciseProps {
	onCreate: Function;
	onChange: Function;
	onUpdate: Function;
	isCreator: boolean;
	title: string
}

const Exercise = (props: ExerciseProps) => {
	const { title, isCreator, onChange, onCreate, onUpdate } = props
	return (
		<DocumentTabLayout
			title={title}
			right={<></>}
			left={<></>}
		>
			{
				<></>
			}
		</DocumentTabLayout>
	)
};

export default Exercise;
