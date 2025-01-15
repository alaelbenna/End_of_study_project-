import React, { useState } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Footer } from "@/widgets/layout";

export function Profile() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("17:00 - 18:30");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative block h-[40vh] md:h-[50vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      {/* Profile Section */}
      <section className="relative bg-white py-8 md:py-16">
        <div className="relative mb-6 -mt-32 md:-mt-40 flex w-full px-4 md:px-8 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Profile Information */}
              <div className="relative flex gap-6 items-start">
                <div className="-mt-16 md:-mt-20 w-28 md:w-40">
                  <Avatar
                    src="/img/team-5.png"
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray" className="text-lg md:text-2xl">
                    Jenna Stones
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="!mt-0 font-normal text-sm md:text-base"
                  >
                    jena@mail.com
                  </Typography>
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <Typography variant="h5" className="mb-6 text-blue-gray-800">
                Reservation Form
              </Typography>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full p-3 mt-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-3 mt-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-blue-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full p-3 mt-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </form>
            </div>

            {/* Calendar Section */}
            <div className="py-6 flex flex-col items-center">
              <Typography variant="h5" className="mb-4 text-blue-gray-800">
                Select Your Reservation Date
              </Typography>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} // Disable past dates
                className="shadow-md rounded-lg"
              />
              <Typography className="mt-4 text-blue-gray-600">
                Selected Date:{" "}
                <span className="font-semibold">
                  {selectedDate.toDateString()}
                </span>
              </Typography>
            </div>

            {/* Time Slot Picker */}
            <div className="py-4">
              <label
                htmlFor="time-slot"
                className="block text-sm font-medium text-blue-gray-600 text-center"
              >
                Select Reservation Time Slot
              </label>
              <select
                id="time-slot"
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                className="w-1/3 mx-auto block p-3 mt-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {/* Time slots */}
                <option value="17:00 - 18:30">17:00 - 18:30</option>
                <option value="18:30 - 19:30">18:30 - 19:30</option>
                <option value="19:30 - 20:30">19:30 - 20:30</option>
                <option value="20:30 - 21:30">20:30 - 21:30</option>
                <option value="21:30 - 22:30">21:30 - 22:30</option>
                <option value="22:30 - 23:30">22:30 - 23:30</option>
              </select>
              <Typography className="mt-4 text-blue-gray-600 text-center">
                Selected Time Slot:{" "}
                <span className="font-semibold">{selectedTimeSlot}</span>
              </Typography>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="p-3 text-white bg-gray-500 rounded-lg text-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
