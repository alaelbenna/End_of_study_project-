import PropTypes from "prop-types";
import { Card, Avatar, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; 

export function TeamCard({ img, name, position, socials, userId }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Check if the user is authenticated
    const user = auth.currentUser;

    if (user) {
      // If authenticated, navigate to the profile page (or any other page)
      navigate(`/profile/${userId}`); // Assuming userId is passed as a prop to TeamCard
    } else {
      // If not authenticated, redirect to the login page
      navigate("/sign-in");
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="text-center cursor-pointer"
      onClick={handleCardClick} // Added onClick handler
    >
      <Avatar
        src={img}
        alt={name}
        size="xxl"
        variant="rounded"
        className="h-full w-full shadow-lg shadow-gray-500/25"
      />
      <Typography variant="h5" color="blue-gray" className="mt-6 mb-1">
        {name}
      </Typography>
      {position && (
        <Typography className="font-bold text-blue-gray-500">
          {position}
        </Typography>
      )}
      {socials && <div className="mx-auto mt-5">{socials}</div>}
    </Card>
  );
}

TeamCard.defaultProps = {
  position: "",
  socials: null,
  userId: "", // Added userId as a prop
};

TeamCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  socials: PropTypes.node,
  userId: PropTypes.string.isRequired, // userId is required
};

TeamCard.displayName = "/src/widgets/layout/team-card.jsx";

export default TeamCard;
