import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer } from "@/widgets/layout";

export const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stadiums, setStadiums] = useState([]);
  const [newStadium, setNewStadium] = useState({ name: "", location: "", capacity: "", availableSlots: [] });

  const fetchStadiums = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/stadiums");
      const data = await response.json();
      setStadiums(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStadiums();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:4000/api/reservations", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();

        if (Array.isArray(data.reservations)) {
          setReservations(data.reservations);
          console.log(data.reservations);
        } else {
          throw new Error("Reservations data is not an array");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleRemoveReservation = async (reservationId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:4000/api/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(reservations.filter(res => res._id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <section className="relative block h-[80vh] md:h-[50vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center scale-105" />
      </section>
  
      <div className="p-6 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
  
        {/* Add Stadium Form (moved to the top) */}
        <div className="w-full max-w-4xl p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-200">
  <h2 className="text-lg font-semibold mb-4">Add Stadium</h2>
  <form
    className="flex flex-col gap-4"
    onSubmit={async (e) => {
      e.preventDefault();

      // Vérifier que `newStadium` est valide
      if (!newStadium.name || !newStadium.location || !newStadium.capacity) {
        console.error("All fields are required.");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/stadiums", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStadium),
        });

        if (!response.ok) {
          console.error("Failed to create stadium");
          return;
        }

        const data = await response.json();
        if (data?.stadium) {
          setStadiums((prevStadiums) => [...(prevStadiums || []), data.stadium]); // Évite l'erreur si `stadiums` est undefined
          setNewStadium({ name: "", location: "", capacity: "", availableSlots: [] });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }}
  >
    <input
      className="border rounded p-2 focus:outline-none focus:ring focus:ring-gray-300"
      type="text"
      placeholder="Name"
      value={newStadium?.name || ""}
      onChange={(e) => setNewStadium((prev) => ({ ...prev, name: e.target.value }))}
      required
    />
    <input
      className="border rounded p-2 focus:outline-none focus:ring focus:ring-gray-300"
      type="text"
      placeholder="Location"
      value={newStadium?.location || ""}
      onChange={(e) => setNewStadium((prev) => ({ ...prev, location: e.target.value }))}
      required
    />
    <input
      className="border rounded p-2 focus:outline-none focus:ring focus:ring-gray-300"
      type="number"
      placeholder="Capacity"
      value={newStadium?.capacity || ""}
      onChange={(e) => setNewStadium((prev) => ({ ...prev, capacity: e.target.value }))}
      required
    />
    <button
      className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
      type="submit"
    >
      Add Stadium
    </button>
  </form>
</div>
  
        {/* Tables for Reservations and Stadiums (moved to the bottom) */}
        <div className="w-full max-w-4xl p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-200 mt-6">
          <h2 className="text-lg font-semibold mb-4">Reservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-600 text-white border-b">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium">Name</th>
                  <th className="px-4 py-2 text-sm font-medium">Email</th>
                  <th className="px-4 py-2 text-sm font-medium">Phone</th>
                  <th className="px-4 py-2 text-sm font-medium">Date</th>
                  <th className="px-4 py-2 text-sm font-medium">Time Slot</th>
                  <th className="px-4 py-2 text-sm font-medium">User</th>
                  <th className="px-4 py-2 text-sm font-medium">Stadium</th>
                  <th className="px-4 py-2 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
  {Array.isArray(reservations) && reservations.length > 0 ? (
    reservations.map((reservation, index) => (
      <tr key={reservation._id || index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.name}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.email}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.phone}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.date}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.timeSlot}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.user}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{reservation.stadium.name}</td>

        <td className="px-4 py-2 text-sm text-red-500">
          <button onClick={() => handleRemoveReservation(reservation._id)}>
            Remove
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
        No reservations available
      </td>
    </tr>
  )}
</tbody>
            </table>
          </div>
        </div>
  
        {/* Stadiums Table */}
        <div className="w-full max-w-4xl p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-200 mt-6">
          <h2 className="text-lg font-semibold mb-4">Stadiums</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-600 text-white border-b">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium">Name</th>
                  <th className="px-4 py-2 text-sm font-medium">Location</th>
                  <th className="px-4 py-2 text-sm font-medium">Capacity</th>
                  <th className="px-4 py-2 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
  {Array.isArray(stadiums) && stadiums.length > 0 ? (
    stadiums.map((stadium) => (
      <tr key={stadium._id} className="border-b">
        <td className="px-4 py-2 text-sm text-gray-700">{stadium.name}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{stadium.location}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{stadium.capacity}</td>
        <td className="px-4 py-2 text-sm text-red-500">
          <button
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:4000/api/stadiums/${stadium._id}`);
                setStadiums((prevStadiums) => prevStadiums.filter((s) => s._id !== stadium._id));
              } catch (err) {
                console.error("Error deleting stadium:", err);
              }
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
        No stadiums available
      </td>
    </tr>
  )}
</tbody>
            </table>
          </div>
        </div>
      </div>
  
      <Footer />
    </>
  );
};

export default Dashboard;
