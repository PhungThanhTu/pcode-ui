import CustomTab from '@/components/Custom/CustomTab';
import NotFound from '@/components/NotFound';
import Editor from '@/components/Document/Tab/Editor';
import Content from '@/components/Document/Tab/Content';
import Exercise from '@/components/Document/Tab/Exercise';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState, ChangeEvent, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getDocument } from '@/selectors/document.selector';
import { createDocumentContent, fetchDocumentById } from '@/slices/document.slice';

import { usePDFFileReader } from '@/hook/useFileReader';
import { CreateDocumentContentRequest } from '@/types/document.type';
import { Worker } from '@react-pdf-viewer/core';

const DocumentPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const UserProfile = useSelector(getProfile);
	const { document, loading, documentContent } = useSelector(getDocument);

	const [Tabs, setTabs] = useState<TabElement[]>([]);

	const { PdfFile, getFile } = usePDFFileReader();

	const onChangeDocumentContent = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'file') {
			getFile(e);
		}
	};

	// this for update as well as create
	const onCreateDocumentContent = (Type: string, content: any) => {
		if (Type === 'PDF') {
			let CreateDocumentContentForm: CreateDocumentContentRequest = {
				content: content,
				contentTypeId: '2',
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
							title: 'Editor',
							element: (
								<Editor
									document={document}
									documentContent={documentContent}
									onChange={onChangeDocumentContent}
									onCreate={onCreateDocumentContent}
								/>
							)
						},
						{
							title: 'Content',
							element: (
								<Content
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 1}
								/>
							)
						},
						{
							title: 'Exercise',
							element: <Exercise />
						}
					]);
				} else {
					setTabs([
						{
							title: 'Editor',
							element: (
								<Editor
									document={document}
									documentContent={documentContent}
									onChange={onChangeDocumentContent}
									onCreate={onCreateDocumentContent}
								/>
							)
						},
						{
							title: 'Content',
							element: (
								<Content
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 1}
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
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 1}
								/>
							)
						},
						{
							title: 'Submission',
							element: <></>
						},
						{
							title: 'Exercise',
							element: <></>
						}
					]);
				} else {
					setTabs([
						{
							title: 'Content',
							element: (
								<Content
									source={documentContent}
									type={document.Contents.length > 0 ? document.Contents[0].ContentTypeId : 1}
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
		</Fragment>
	) : (
		<NotFound />
	);
};

export default DocumentPage;
