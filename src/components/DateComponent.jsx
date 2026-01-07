import { DayPicker } from "react-day-picker";
const DateComponent = ({onClick}) => {
  const [dateRange, setDateRange] = useState({
      from: null,
      to: null,
    });

  return  <DateRangePicker value={dateRange} onChange={handleClick}/>
}
export default DateComponent;