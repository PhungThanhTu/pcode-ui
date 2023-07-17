import CustomTab from '@/components/Custom/CustomTab';
import NotFound from '@/components/NotFound';
import Compose from '@/components/Document/Tab/Compose';
import Content from '@/components/Document/Tab/Content';
import Exercise from '@/components/Document/Tab/Exercise';
import Submissions from '@/components/Document/Tab/Submission';
import TestCase from '@/components/Document/Tab/TestCase';
import CustomDialog from '@/components/Custom/CustomDialog';
import { LinearLoading } from '@/components/Loading';

import { useEffect, Fragment, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getDocument } from '@/selectors/document.selector';
import { usePdfReader } from '@/hook/useFileReader';

import {
	createDocumentContent,
	createDocumentExercise,
	createSubmission,
	createTestCase,
	deleteTestCase,
	fetchDocumentById,
	fetchSampleSourceCode,
	fetchSingleSubmission,
	markSubmission,
	resetDocumentContent,
	scoreSubmissionManage,
	updateDocumentExercise,
	updateTestCase
} from '@/slices/document.slice';

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
import { contentTypeId, createExerciseDefault } from '@/config';
import { getApiDateFormat, getToday } from '@/utils/convert';
import { LocalStorageService } from '@/services/localStorageService';
import { setDocumentTabIndex, setDocumentTabs } from '@/slices/tab.slice';
import { getDocumentTabIndex, getDocumentTabs } from '@/selectors/tab.selector';
import NonTestCase from '@/components/Document/Tab/NonTestCase';

const DocumentPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userProfile = useSelector(getProfile);

	const { document, loading, documentContent } = useSelector(getDocument);


	const tabs = useSelector(getDocumentTabs);
	const tabIndex = useSelector(getDocumentTabIndex);

	const [OpenDialog, setOpenDialog] = useState(false);

	const { PdfFile, getFile } = usePdfReader();

	const SetTabIndex = (index: string) => {
		dispatch(setDocumentTabIndex(index));
	};

	//#region document content
	const onChangeDocumentContent = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'file') {
			getFile(e);
		}
	};

	const onCreateDocumentContent = (type: number, content: any) => {
		if (type === 1) {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: contentTypeId.pdf,
				documentId: params.documentId ? params.documentId : ''
			};
			dispatch(createDocumentContent(CreateDocumentContentForm));
		} else if (type === 0) {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: contentTypeId.markDown,
				documentId: params.documentId ? params.documentId : ''
			};
			dispatch(createDocumentContent(CreateDocumentContentForm));
		}
		else if (type === 2) {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: contentTypeId.file,
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

	const onCreateExercise = (documentId: string, judgerId: string) => {
		let form = { ...createExerciseDefault, judgerId: judgerId };
		dispatch(createDocumentExercise({ body: form, documentId: documentId }));
	};

	const onUpdateExercise = (
		ExeriseForm: GetExerciseResponse,
		sourceForm: UpdateSampleSourceCodeRequest,
		documentId: string,
		judgerId: string
	) => {
		let exerciseForm: UpdateExerciseRequest = {
			deadline: ExeriseForm.HaveDeadline
				? getApiDateFormat(new Date(ExeriseForm.Deadline).toISOString())
				: getApiDateFormat(new Date(getToday()).toISOString()),
			haveDeadline: ExeriseForm.HaveDeadline,
			manualPercentage: Number(ExeriseForm.ManualPercentage),
			memoryLimit: Number(ExeriseForm.MemoryLimit),
			runtimeLimit: Number(ExeriseForm.RuntimeLimit),
			scoreWeight: Number(ExeriseForm.ScoreWeight),
			strictDeadline: ExeriseForm.HaveDeadline
				? ExeriseForm.StrictDeadline
					? ExeriseForm.StrictDeadline
					: false
				: false,
			judgerId: judgerId
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
			scoreWeight: Number(Form.scoreWeight),
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

		LocalStorageService.setCodeCache(form);
		dispatch(createSubmission({ documentId: documentId, body: form }));
		SetTabIndex('3');
	};

	const onMarkSubmission = (Request: SubmissionActionRequest) => {
		dispatch(markSubmission(Request));
	};
	const onScoreSubmission = (Request: ScoreSubmissionRequest) => {
		dispatch(scoreSubmissionManage({ Ids: Request.Ids, score: Number(Request.score) }));
	};
	const onDeleteSubmission = (Request: SubmissionActionRequest) => { };

	//#endregion

	useEffect(() => {
		if (!document) {
		} else if (document === null) {
			navigate(-1);
		} else if (document !== undefined) {
			if (userProfile?.id === document.CreatorId) {
				if (document.HasExercise) {
					dispatch(
						setDocumentTabs([
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
										contentBody={document.Contents.length > 0 ? document.Contents[0].ContentBody : ""}
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
											type: document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3,
											contentBody: document.Contents.length > 0 ? document.Contents[0].ContentBody : ""
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
									<Submissions
										isCreator={true}
										document={document}
										onSelected={() => { }}
										onScore={onScoreSubmission}
									/>
								)
							}
						])
					);
				} else {
					dispatch(
						setDocumentTabs([
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
										contentBody={document.Contents.length > 0 ? document.Contents[0].ContentBody : ""}
									/>
								)
							}
						])
					);
				}
			} else {
				if (document.HasExercise) {

					dispatch(
						setDocumentTabs([
							{
								title: 'Exercise',
								element: (
									<Exercise
										content={{
											source: documentContent,
											type: document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3,
											contentBody: document.Contents.length > 0 ? document.Contents[0].ContentBody : ""
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
										contentBody={document.Contents.length > 0 ? document.Contents[0].ContentBody : ""}
									/>
								)
							},
							{
								title: 'TestCases',
								element: (
									<NonTestCase
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
									<Submissions
										isCreator={false}
										document={document}
										onMark={onMarkSubmission}
										onSelected={onFetchSingleSubmission}
									/>
								)
							}
						])
					);
				} else {
					dispatch(
						setDocumentTabs([
							{
								title: 'Content',
								element: (
									<Content
										title={document.Title}
										source={documentContent}
										type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 3}
										contentBody={document.Contents.length > 0 ? document.Contents[0].ContentBody : ""}
									/>
								)
							}
						])
					);
				}
			}
		}
	}, [document]);

	useEffect(() => {
		dispatch(fetchDocumentById({ id: params.documentId ? params.documentId : '' }));

	}, []);

	return loading ? (
		<LinearLoading />
	) : document ? (
		<Fragment>
			<Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
				<CustomTab listOfTabs={tabs} tabIndex={tabIndex} setTabIndex={SetTabIndex} />
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
	) : (
		<NotFound />
	);
};

export default DocumentPage;
