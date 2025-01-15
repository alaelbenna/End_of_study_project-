import React, { useState } from "react";
import Calendar from "react-calendar";

const ReservationCalendar = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate); // Pass selected date to the parent
  };

  return (
    <div className="calendar-container">
      <h2 className="text-xl font-bold mb-4">Choose Your Reservation Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()} // Disable past dates
      />
      <p className="mt-4">
        Selected Date: <span className="font-semibold">{date.toDateString()}</span>
      </p>
    </div>
  );
};

export default ReservationCalendar;
