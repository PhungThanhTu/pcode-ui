import CourseCustomizeModal from '@/components/Course/CourseCustomizeModal';
import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/Custom/CustomTab';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import NotFound from '@/components/NotFound';
import { getDocument } from '@/selectors/document.selector';
import { fetchDocumentById } from '@/slices/document.slice';
import Editor from '@/components/Document/Tab/Editor';
import Preview from '@/components/Document/Tab/Preview';

const DocumentPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const UserProfile = useSelector(getProfile);
    const { document, loading } = useSelector(getDocument);

    const [Tabs, setTabs] = useState<TabElement[]>([]);

    useEffect(() => {
        if (!document) {
            dispatch(fetchDocumentById({ id: params.documentId ? params.documentId : '' }));
        } else if (document === null) {
            navigate(-1);
        } else {
            setTabs([{
                title: 'Editor',
                element: (
                    <Editor />
                )
            },
            {
                title: 'Preview',
                element: (
                    <Preview source ={"Text"} type='markdown'/>
                )
            }
            ])
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
