export const createReservation = (req, res) => {
    res.status(201).json({ message: 'Reservation created successfully!' });
  };
  
  export const getReservations = (req, res) => {
    res.status(200).json({ message: 'Fetching reservations' });
  };
  