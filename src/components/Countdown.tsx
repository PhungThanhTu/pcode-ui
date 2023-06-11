import useCountdown from "@/hook/useCountdown";
import { Error } from "@/style/Colors";
import Box from "@mui/material/Box";



const BoxDatesSx = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '1rem',
    border: '1px solid #ebebeb',
    borderRadius: '0.25rem',
    height: '100%',
    color: '#000',
}
const BoxDateSx = {
    lineHeight: '1.25rem',
    padding: '0 0.75rem 0 0.75rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    '>p': {
        margin: 0
    },
    '>span': {
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        lineHeight: '1rem'
    },


}
interface ShowCounterProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
const ShowCounter = (props: ShowCounterProps) => {

    const { days, hours, minutes, seconds } = props

    return (
        <Box sx={BoxDatesSx}  >
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 2} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={hours <= 12} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={minutes <= 60} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={seconds <= 60 && minutes <= 1} />
        </Box>
    );
};
interface CountdownTimerProps {
    targetDate: number;
}
const CountdownTimer = (props: CountdownTimerProps) => {

    const { targetDate } = props

    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ShowCounter
            days={0}
            hours={0}
            minutes={0}
            seconds={0}
        />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;

interface DateTimeDisplayProps {
    value: string | number;
    type: string;
    isDanger: boolean;
}
const DateTimeDisplay = (props: DateTimeDisplayProps) => {
    const { isDanger, type, value } = props
    return (
        <Box sx={{ ...BoxDateSx, color: isDanger ? Error.main : 'inherit' }}>
            <p>{value.toString()}</p>
            <span>{type}</span>
        </Box>
    );
};


