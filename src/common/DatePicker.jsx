import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = ({ action = "Departure", maxDate, value, onChange }) => {
  const [open, setOpen] = useState(false);

 const date = value ? new Date(value) : new Date();

  const dayMonth = date
    ? date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "Select date";

  const weekday = date
    ? date.toLocaleDateString("en-IN", {
        weekday: "long",
      })
    : "";

  return (
    <div className="relative bookingslot hover:shadow-lg hover:shadow-blue-400/40">
      {/* DISPLAY */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer p-3 rounded-xl g-white"
      >
        <p className="text-xs text-gray-500 font-semibold">
          {action}
        </p>

        <p className="text-xl font-bold text-gray-900">
          {dayMonth}
        </p>

        <p className="text-sm text-gray-500">
          {weekday}
        </p>
      </div>

      {/* CALENDAR */}
      {open && (
        <div className="absolute z-20 mt-2 bg-white p-4 rounded-2xl shadow-xl">
          <DayPicker
            mode="single"
            startDate={maxDate}
            onSelect={(selected) => {
              onChange(selected);
              setOpen(false);
            }}
            disabled={{ before: maxDate }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
