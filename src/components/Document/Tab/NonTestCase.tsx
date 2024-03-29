import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { BoxFieldSx } from '@/style/BoxSx';
import { GetDocumentByIdResponse, GetSingleTestCaseResponse } from '@/types/document.type';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTestCases, fetchExercise } from '@/slices/document.slice';
import { getDocumentExercise, getDocumentTestCases } from '@/selectors/document.selector';
import { LinearLoading } from '@/components/Loading';
import CustomDialog from '@/components/Custom/CustomDialog';
import { CustomIconButton } from '@/components/Custom/CustomButton';
import { borderRadius, centerPos, componentStyle } from '@/style/Variables';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ListItems from '@/components/ListItems';
import { CodeEditor } from '@/components/CodeEditor';

const BoxCreateTestCase = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 0,
    borderRadius: `0 0 0 ${borderRadius}`,
    width: '100%',
    boxShadow: '0 2px 6px 0 rgba(0,0,0,.12)',
    zIndex: 10
};

interface TestCaseProps {
    document: GetDocumentByIdResponse;
    onCreate: Function;
    onUpdate: Function;
    onDelete: Function;
}

const NonTestCase = (props: TestCaseProps) => {
    const { document, onDelete, onCreate, onUpdate } = props;

    const params = useParams();
    const dispatch = useDispatch();
    const testCases = useSelector(getDocumentTestCases);
    const exercise = useSelector(getDocumentExercise);

    const InitialTestCaseForm: GetSingleTestCaseResponse = {
        Id: 1,
        input: '0 0',
        output: '0',
        scoreWeight: 1,
        TestOrder: 0,
        visibility: true
    };

    const [SeletedTestCase, setSeletedTestCase] = useState<number | null>(null);
    const [TestCaseForm, setTestCaseForm] = useState<GetSingleTestCaseResponse>(InitialTestCaseForm);
    const [OpenDeleteTestCaseDialog, setOpenDeleteTestCaseDialog] = useState(false);
    const [Visibility, setVisibility] = useState(TestCaseForm.visibility);

    const { input, output, scoreWeight, visibility } = TestCaseForm;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'visibility') {
            setTestCaseForm({
                ...TestCaseForm,
                [e.target.name]: e.target.checked
            });
        } else if (e.target.name === 'scoreWeight') {

            setTestCaseForm({
                ...TestCaseForm,
                [e.target.name]: e.target.value ? Number(e.target.value) > 0 ? Number(e.target.value) : 1 : e.target.value
            });
        } else {
            setTestCaseForm({
                ...TestCaseForm,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSelected = (order: number) => {
        setSeletedTestCase(order);
        let item = FindTestCaseByOrder(order);
        setTestCaseForm(item);
    };

    const FindTestCaseByOrder = (order: number) => {
        let item = testCases?.filter((item) => item.TestOrder === order)[0];

        return item ? item : InitialTestCaseForm;
    };

    const FindTestCaseById = (id: number) => {
        let item = testCases?.filter((item) => item.Id === id)[0];

        return item ? item : InitialTestCaseForm;
    };

    useEffect(() => {
        if (testCases && testCases.length > 0) {
            if (!SeletedTestCase) {
                setSeletedTestCase(1);
                let item = FindTestCaseByOrder(1);
                setTestCaseForm(item);
            }
        }
    }, [testCases]);

    useEffect(() => {
        // if (testCases === null) {
        // 	dispatch(fetchAllTestCases({ documentId: params.documentId ? params.documentId : '' }));
        // }

    }, []);

    return (
        <Fragment>
            {
                // testCases === undefined ? (
                // 	<LinearLoading />
                // ) : exercise === null || testCases === null ? (
                // 	<Typography sx={centerPos} variant="h5">
                // 		Cannot create Test Cases without Exercises!
                // 	</Typography>
                // ) : 
                (
                    <DocumentTabLayout
                        title={document.Title}
                        childrenPosition={true}
                        right={
                            <Fragment>

                                <Stack
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    rowGap="1.5"
                                    minHeight="inherit"
                                >
                                    <Stack
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="center"
                                        rowGap="2"
                                        width="100%"
                                    >
                                        <Box component="form" sx={BoxFieldSx}>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Input:"
                                                multiline
                                                value={input}
                                                maxRows={4}
                                                minRows={4}
                                                name="input"
                                                onChange={onChange}
                                            />
                                            <TextField
                                                fullWidth
                                                required
                                                label="Output:"
                                                multiline
                                                value={output}
                                                maxRows={4}
                                                minRows={4}
                                                name="output"
                                                onChange={onChange}
                                            />
                                        </Box>

                                    </Stack>
                                </Stack>
                            </Fragment>
                        }
                        left={
                            <CodeEditor
                                // deadline={TargetDeadline}
                                source={''}
                                language={1}
                                documentId={document.Id}
                                onGetSampleSourceCode={() => { }}
                                getSource={() => { }}


                            />
                        }
                    >
                       
                    </DocumentTabLayout>
                )
            }
            <CustomDialog
                onCancel={() => setOpenDeleteTestCaseDialog(false)}
                onSave={() => {
                    onDelete(document.Id, TestCaseForm.Id);
                    setOpenDeleteTestCaseDialog(false);
                }}
                open={OpenDeleteTestCaseDialog}
                title="Delete Test Case"
                content={`Do you want to delete this test case: Test Case ${SeletedTestCase}?\n
				Input: ${TestCaseForm.input}\n
				Output: ${TestCaseForm.output}\n
				Score Weight: ${TestCaseForm.scoreWeight}\n
				Visible to others: ${TestCaseForm.visibility}`}
            />
        </Fragment >
    );
};

export default NonTestCase;
