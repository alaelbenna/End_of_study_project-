import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export function Profile() {
  const [stadiums, setStadiums] = useState([]); // Ensure stadiums is initialized as an array
  const [selectedStadium, setSelectedStadium] = useState(""); // Store selected stadium ID
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("17:00 - 18:30");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reservationStatus, setReservationStatus] = useState(null); // To track reservation status
  const [reservations, setReservations] = useState([]); // To store user-specific reservations

  const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/stadiums");
        const data = await response.json();
        console.log("Fetched stadiums:", data); // Debugging log

        if (Array.isArray(data)) {
          setStadiums(data);
        } else {
          console.error("API did not return an array:", data);
          setStadiums([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching stadiums:", error);
        setStadiums([]); // Ensure state is an array
      }
    };

    fetchStadiums();
  }, []);

      
    
  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle time slot change
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  // Fetch reservations for the logged-in user
  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/reservations/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setReservations(data.reservations); // Update state with fetched reservations
      } else {
        console.error("Error fetching reservations:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedStadium) {
      setReservationStatus("Please select a stadium.");
      return;
    }
    const reservationData = {
      stadiumId: selectedStadium,

      name: fullName,
      email: email,
      phone: phone,
      date: selectedDate.toDateString(),
      timeSlot: selectedTimeSlot,
    };

    try {
      const response = await fetch("http://localhost:4000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok) {
        setReservationStatus("Reservation successful!");
        fetchReservations(); // Fetch updated reservations for the user
      } else {
        setReservationStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setReservationStatus("An error occurred. Please try again.");
    }
  };

  // Fetch reservations when the component mounts
  useEffect(() => {
    if (token) {
      fetchReservations();
    }
  }, [token]);

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
            </div>

            {/* Reservation Form */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <Typography variant="h5" className="mb-6 text-blue-gray-800">
                Reservation Form
              </Typography>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  {/* Stadium Selection */}
      <label className="block mb-2">Select Stadium:</label>
      <select
        value={selectedStadium}
        onChange={(e) => setSelectedStadium(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="">Choose a stadium</option>
        {stadiums.map((stadium) => (
          <option key={stadium._id} value={stadium._id}>
            {stadium.name}
          </option>
        ))}
      </select>
                </div>
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 mt-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your full name"
                    required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mt-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your email"
                    required
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 mt-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Display Status */}
                {reservationStatus && (
                  <div className="mt-4 text-center text-gray-700">
                    <Typography className="font-semibold text-lg">
                      {reservationStatus}
                    </Typography>
                  </div>
                )}

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="p-3 text-white bg-gray-500 rounded-lg text-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Reserve Now
                  </button>
                   {/* Reservation Status Message */}
      {reservationStatus && <p className="mt-4 text-center">{reservationStatus}</p>}
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
                <span className="font-semibold">{selectedDate.toDateString()}</span>
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

            {/* User Reservations */}
            <div className="mt-8">
              <Typography variant="h5" className="mb-4 text-blue-gray-800">
                Your Reservations
              </Typography>
              {reservations.length > 0 ? (
                <ul className="space-y-4">
                  {reservations.map((res, index) => (
                    <li key={index} className="p-4 bg-gray-200 rounded-lg shadow-md">
                      <p className="font-semibold">{res.name}</p>
                      <p>{res.email}</p>
                      <p>{res.phone}</p>
                      <p>
                        {res.date} - {res.timeSlot}
                      </p>
                      <p>{res.stadium.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography className="text-gray-600">No reservations found.</Typography>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
