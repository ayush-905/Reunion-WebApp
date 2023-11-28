import React from 'react'
import './PropertyCard.css'

const PropertyCard = ({ property }) => {
    const {area,title,price,city,state,country,beds,bathrooms}={...property}
    return (
      <div className='card'>
        <h4>₹ {price}/month</h4>
        <h2>{title}</h2>
        <h4>{city}, {state}, {country}</h4>
        <span className='span'>
          <h4>{beds} beds</h4>
          <h4>{bathrooms} Bathrooms</h4>
          <h4>{area} sq.m</h4>
        </span>
      </div>
    );
  };

  export default PropertyCard