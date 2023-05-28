import DataGridListItems from "@/components/DataGridListItems";
import TabLayout from "@/layouts/TabLayout";
import { getCourseScore } from "@/selectors/course.selector"
import { fetchCourseScoreById } from "@/slices/course.slice";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

interface ScoreBoardProps {
    courseId: string;

}
const ScoreBoard = (props: ScoreBoardProps) => {

    const { courseId } = props

    const dispatch = useDispatch();

    const courseScore = useSelector(getCourseScore);

   
    useEffect(() => {
        dispatch(fetchCourseScoreById({ courseId: courseId }))
    }, [])

    return (
        <TabLayout
            header={<></>}
            rightBody={
                <DataGridListItems />
            }
        />
    )
}

export default ScoreBoard
