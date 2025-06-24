import React from 'react';
import './Card.css';

export interface CardProps {
  title: string;
  text: string;
  image: string;
  imageAlt?: string;
}

const Card: React.FC<CardProps> = ({ title, text, image, imageAlt = '' }) => {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={image} alt={imageAlt} className="card__image" />
      </div>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
