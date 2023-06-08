import CustomTab from '@/components/Custom/CustomTab';
import NotFound from '@/components/NotFound';
import Compose from '@/components/Document/Tab/Compose';
import Content from '@/components/Document/Tab/Content';
import Exercise from '@/components/Document/Tab/Exercise';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState, ChangeEvent, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getDocument } from '@/selectors/document.selector';

import {
	createDocumentContent,
	createDocumentExercise,
	createSubmission,
	createTestCase,
	deleteTestCase,
	fetchAllSubmissions,
	fetchAllSubmissionsManage,
	fetchAllTestCases,
	fetchDocumentById,
	fetchExercise,
	fetchSampleSourceCode,
	fetchSingleSubmission,
	markSubmission,
	resetDocumentContent,
	scoreSubmissionManage,
	updateDocumentExercise,
	updateTestCase
} from '@/slices/document.slice';

import { usePDFFileReader } from '@/hook/useFileReader';
import {
	CreateDocumentContentRequest,
	CreateSubmissionRequest,
	CreateTestCaseRequest,
	GetExerciseResponse,
	ScoreSubmissionRequest,
	SubmissionActionRequest,
	UpdateExerciseRequest,
	UpdateSampleSourceCodeRequest,
	UpdateTestCaseRequest
} from '@/types/document.type';
import { Worker } from '@react-pdf-viewer/core';
import TestCase from '@/components/Document/Tab/TestCase';
import CustomDialog from '@/components/Custom/CustomDialog';
import { JudgerId, contentTypeId, createExerciseDefault } from '@/config';
import { getApiDateFormat, getToday, parseToLocalDate } from '@/utils/convert';
import Submission from '@/components/Document/Tab/Submission';
import { LocalStorageService } from '@/services/localStorageService';



const DocumentPage = () => {

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userProfile = useSelector(getProfile);

	const { document, loading, documentContent } = useSelector(getDocument);

	const [Tabs, setTabs] = useState<TabElement[]>([]);
	const [OpenDialog, setOpenDialog] = useState(false);

	const { PdfFile, getFile } = usePDFFileReader();

	//#region document content
	const onChangeDocumentContent = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'file') {
			getFile(e);
		}
	};

	const onCreateDocumentContent = (type: string, content: any) => {
		if (type === 'PDF') {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: contentTypeId.pdf,
				documentId: params.documentId ? params.documentId : ''
			};
			dispatch(createDocumentContent(CreateDocumentContentForm));
		} else if (type === 'Markdown') {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: contentTypeId.markDown,
				documentId: params.documentId ? params.documentId : ''
			};
			dispatch(createDocumentContent(CreateDocumentContentForm));
		}
	};

	const onResetDocumentContent = () => {
		dispatch(resetDocumentContent({ documentId: params.documentId ? params.documentId : '' }));
		setOpenDialog(false);
	};
	//#endregion

	//#region exercise

	const onCreateExercise = (documentId: string) => {
		let form = createExerciseDefault;
		dispatch(createDocumentExercise({ body: form, documentId: documentId }));
	};

	const onUpdateExercise = (
		ExeriseForm: GetExerciseResponse,
		sourceForm: UpdateSampleSourceCodeRequest,
		documentId: string
	) => {
		let exerciseForm: UpdateExerciseRequest = {
			deadline: ExeriseForm.HaveDeadline
				? getApiDateFormat(ExeriseForm.Deadline)
				: getApiDateFormat(new Date(getToday()).toISOString()),
			haveDeadline: ExeriseForm.HaveDeadline,
			manualPercentage: ExeriseForm.ManualPercentage,
			memoryLimit: ExeriseForm.MemoryLimit,
			runtimeLimit: ExeriseForm.RuntimeLimit,
			scoreWeight: ExeriseForm.ScoreWeight,
			strictDeadline: ExeriseForm.HaveDeadline
				? ExeriseForm.StrictDeadline
					? ExeriseForm.StrictDeadline
					: false
				: false,
			judgerId: JudgerId
		};

		dispatch(
			updateDocumentExercise({ documentId: documentId, ExerciseBody: exerciseForm, SourceBody: sourceForm })
		);
	};
	const onGetSampleSourceCode = (documentId: string, type: number) => {
		dispatch(fetchSampleSourceCode({ documentId: documentId, type: type }));
	};

	//#endregion

	//#region test cases
	const onCreateTestCase = (documentId: string, Form: CreateTestCaseRequest) => {
		let form: CreateTestCaseRequest = {
			input: Form.input,
			output: Form.output,
			scoreWeight: Form.scoreWeight,
			visibility: Form.visibility
		};
		dispatch(createTestCase({ body: form, documentId: documentId }));
	};

	const onUpdateTestCase = (documentId: string, testCaseId: number, Form: UpdateTestCaseRequest) => {

		let form: UpdateTestCaseRequest = {
			input: Form.input,
			output: Form.output,
			scoreWeight: Form.scoreWeight,
			visibility: Form.visibility
		};
		dispatch(updateTestCase({ documentId: documentId, testCaseId: testCaseId, body: form }));
	};
	const onDeleteTestCase = (documentId: string, testCaseId: number) => {
		dispatch(deleteTestCase({ documentId: documentId, testCaseId: testCaseId }));
	};
	//#endregion

	//#region submissions

	const onFetchSingleSubmission = (Request: SubmissionActionRequest) => {
		dispatch(fetchSingleSubmission(Request));
	};
	const onCreateSubmission = (Request: UpdateSampleSourceCodeRequest, documentId: string) => {

		let form: CreateSubmissionRequest = {
			programmingLanguageId: Request.type,
			sourceCode: Request.sampleSourceCode
		};

		LocalStorageService.setCodeCache(form)

		dispatch(createSubmission({ documentId: documentId, body: form }));
	};

	const onMarkSubmission = (Request: SubmissionActionRequest) => {
		dispatch(markSubmission(Request));
	};
	const onScoreSubmission = (Request: ScoreSubmissionRequest) => {
		dispatch(scoreSubmissionManage({ Ids: Request.Ids, score: Request.score }))
	}
	const onDeleteSubmission = (Request: SubmissionActionRequest) => { };

	//#endregion

	useEffect(() => {
		if (!document) {

		}
		else if (document === null) {
			navigate(-1);
		} else if (document !== undefined) {

			if (userProfile?.id === document.CreatorId) {
				if (document.HasExercise) {

					setTabs([
						{
							title: 'Compose',
							element: (
								<Compose
									document={document}
									documentContent={documentContent}
									onChange={onChangeDocumentContent}
									onCreate={onCreateDocumentContent}
									onReset={() => {
										setOpenDialog(true);
									}}
								/>
							)
						},
						{
							title: 'Content',
							element: (
								<Content
									title={document.Title}
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3}
								/>
							)
						},
						{
							title: 'Exercise',
							element: (
								<Exercise
									isCreator={true}
									document={document}
									content={{
										source: documentContent,
										type: document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3
									}}
									onCreate={onCreateExercise}
									onUpdate={onUpdateExercise}
									onGetSampleSourceCode={onGetSampleSourceCode}
								/>
							)
						},
						{
							title: 'TestCases',
							element: (
								<TestCase
									document={document}
									onCreate={onCreateTestCase}
									onUpdate={onUpdateTestCase}
									onDelete={onDeleteTestCase}
								/>
							)
						},
						{
							title: 'Submission',
							element: (
								<Submission
									isCreator={true}
									document={document}
									onSelected={() => { }}
									onScore={onScoreSubmission}

								/>
							)
						}
					]);
				} else {
					setTabs([
						{
							title: 'Composer',
							element: (
								<Compose
									document={document}
									documentContent={documentContent}
									onChange={onChangeDocumentContent}
									onCreate={onCreateDocumentContent}
									onReset={() => {
										setOpenDialog(true);
									}}
								/>
							)
						},
						{
							title: 'Content',
							element: (
								<Content
									title={document.Title}
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3}
								/>
							)
						}
					]);
				}
			} else {
				if (document.HasExercise) {

					setTabs([
						{
							title: 'Exercise',
							element: (
								<Exercise
									content={{
										source: documentContent,
										type: document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3
									}}
									document={document}
									isCreator={false}
									onSubmit={onCreateSubmission}
									onGetSampleSourceCode={onGetSampleSourceCode}
								/>
							)
						},
						{
							title: 'Content',
							element: (
								<Content
									title={document.Title}
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3}
								/>
							)
						},
						{
							title: 'Submission',
							element: (
								<Submission
									isCreator={false}
									document={document}
									onMark={onMarkSubmission}
									onSelected={onFetchSingleSubmission}
								/>
							)
						}
					]);
				} else {
					setTabs([
						{
							title: 'Content',
							element: (
								<Content
									title={document.Title}
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3}
								/>
							)
						}
					]);
				}
			}

		}
	}, [document]);

	useLayoutEffect(() => {
		dispatch(fetchDocumentById({ id: params.documentId ? params.documentId : '' }));
	}, []);

	return loading ?
		<LinearLoading />
		: document ?
			<Fragment>
				<Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
					<CustomTab ListOfTabs={Tabs} />
				</Worker>
				<CustomDialog
					title="Reset the content?"
					content="This will reset (delete) and make the document content can be set up again!"
					open={OpenDialog}
					onCancel={() => setOpenDialog(false)}
					onSave={() => {
						onResetDocumentContent();
					}}
				/>
			</Fragment>
			:
			<NotFound />
		;
};

export default DocumentPage;
