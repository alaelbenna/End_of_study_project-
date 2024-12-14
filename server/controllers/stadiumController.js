export const createStadium = (req, res) => {
    res.status(201).json({ message: 'Stadium created successfully!' });
  };
  
  export const getStadiums = (req, res) => {
    res.status(200).json({ message: 'Fetching all stadiums' });
  };
  