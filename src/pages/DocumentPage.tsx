import CustomTab from '@/components/Custom/CustomTab';
import NotFound from '@/components/NotFound';
import Editor from '@/components/Document/Tab/Editor';
import Content from '@/components/Document/Tab/Content';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getDocument } from '@/selectors/document.selector';
import { fetchDocumentById } from '@/slices/document.slice';

import { usePDFFileReader } from '@/hook/useFileReader';
import { CreateDocumentContentRequest } from '@/types/document.type';

import '@react-pdf-viewer/core/lib/styles/index.css';


const DocumentPage = () => {

	const InitialCreateDocumentContentForm = {
		file: new Blob(),
		contentTypeId: ''
	}
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [Tabs, setTabs] = useState<TabElement[]>([]);
	



	const UserProfile = useSelector(getProfile);
	const { document, loading, documentContent } = useSelector(getDocument);

	const [CreateDocumentContentForm, setCreateDocumentContentForm] = useState<CreateDocumentContentRequest>(InitialCreateDocumentContentForm)


	const { file, contentTypeId } = CreateDocumentContentForm

	const { PdfFile, getFile } = usePDFFileReader()

	const onChangeDocumentContent = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'file') {
			getFile(e);
		}
	}

	// this for update as well as create
	const onCreateDocumentContent = () => {
		console.log(PdfFile)

	}

	console.log(PdfFile)
	useEffect(() => {
		if (!document) {
			dispatch(fetchDocumentById({ id: params.documentId ? params.documentId : '' }));
		} else if (document === null) {
			navigate(-1);
		} else {
			if (UserProfile?.id === document.CreatorId) {
				setTabs([
					{
						title: 'Editor',
						element: <Editor document={document} documentContent={documentContent} onChange={onChangeDocumentContent} onCreate={onCreateDocumentContent} />
					},
					{
						title: 'Content',
						element: <Content source={'Test'} type="markdown" />
					}
				]);
			}
			else {
				setTabs([
					{
						title: 'Content',
						element: <Content source={'Test'} type="markdown" />
					}
				]);
			}

		}
	}, [document]);

	return loading ? (
		<LinearLoading />
	) : document ? (
		<Fragment>
		
			<CustomTab ListOfTabs={Tabs} />
		</Fragment>
	) : (
		<NotFound />
	);
};

export default DocumentPage;
