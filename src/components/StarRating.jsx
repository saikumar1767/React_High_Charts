import React from "react";
import { FaStar } from "react-icons/fa";
import "../App.css";

const Star = ({ size, fillPercentage }) => {
  const starWrapperStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const starForegroundStyle = {
    width: `${fillPercentage}%`,
  };

  return (
    <div className="star-wrapper" style={starWrapperStyle}>
      <FaStar className="star-background" size={size} />
      <div className="star-foreground" style={starForegroundStyle}>
        <FaStar size={size} />
      </div>
    </div>
  );
};

const StarRating = ({ rating = 7.9, size = 20, ...props }) => {
  const totalStars = 10;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      const starRating = Math.min(Math.max(rating - i, 0), 1) * 100;
      stars.push(<Star key={i} size={size} fillPercentage={starRating} />);
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
