import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

function ServiceCard({ imageUrl, title, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className="service-card" onClick={handleClick}>
      <img src={imageUrl} alt={title} className="service-card-image" />
      <h3 className="service-card-title">{title}</h3>
    </div>
  );
}

// Définition des types de props
ServiceCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ServiceCard;
