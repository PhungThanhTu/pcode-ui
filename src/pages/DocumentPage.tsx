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
import { createDocumentContent, fetchDocumentById, resetDocumentContent } from '@/slices/document.slice';

import { usePDFFileReader } from '@/hook/useFileReader';
import { CreateDocumentContentRequest, CreateExerciseRequest } from '@/types/document.type';
import { Worker } from '@react-pdf-viewer/core';
import TestCase from '@/components/Document/Tab/TestCase';
import CustomDialog from '@/components/Custom/CustomDialog';

const DocumentPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const UserProfile = useSelector(getProfile);
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

	const onCreateDocumentContent = (Type: string, content: any) => {
		if (Type === 'PDF') {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: '1',
				documentId: params.documentId ? params.documentId : ''
			};
			dispatch(createDocumentContent(CreateDocumentContentForm));
		} else if (Type === 'Markdown') {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: '0',
				documentId: params.documentId ? params.documentId : ''
			};
			dispatch(createDocumentContent(CreateDocumentContentForm));
		}
	};

	const onResetDocumentContent = () => {
		dispatch(resetDocumentContent({ id: params.documentId ? params.documentId : '' }));
		setOpenDialog(false);
	};
	//#endregion

	//#region exercise

	const onCreateExercise = () => {};
	const onUpdateExercise = () => {};
	//#endregion

	useEffect(() => {
		if (!document) {
			// dispatch(fetchDocumentById({ id: params.documentId ? params.documentId : '' }));
		} else if (document === null) {
			navigate(-1);
		} else {
			if (UserProfile?.id === document.CreatorId) {
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
								/>
							)
						},
						{
							title: 'TestCases',
							element: <TestCase />
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
							element: <></>
						},
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

	return loading ? (
		<LinearLoading />
	) : document ? (
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
	) : (
		<NotFound />
	);
};

export default DocumentPage;
