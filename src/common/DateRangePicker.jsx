import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-gray-500">
        DEPARTURE – RETURN
      </label>

      {/* Input */}
      <div
        onClick={() => setOpen(!open)}
        className="mt-1 h-12 px-4 flex items-center cursor-pointer
                   rounded-xl border border-gray-300 bg-white
                   focus-within:ring-4 focus-within:ring-blue-100"
      >
        {value?.from && value?.to ? (
          <span className="text-gray-800">
            {value.from.toLocaleDateString()} →{" "}
            {value.to.toLocaleDateString()}
          </span>
        ) : (
          <span className="text-gray-400">Select date range</span>
        )}
      </div>

      {/* Calendar */}
      {open && (
        <div className="absolute z-20 mt-2 bg-white p-4 rounded-2xl shadow-xl">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full h-10 rounded-lg bg-blue-600 text-white font-semibold"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
