import React from 'react'
import { useModal } from './Properties'

const PropertyCard = ({ prop }) => {
    const {area,title,price,city,state,country,beds,bathrooms,imageUrl}={...prop}
    const { openModal } = useModal()
   
    return (
      <div className='card'>
        <img src={imageUrl} alt='Property '/>
        <h4>₹ {price}/month</h4>
        <h2>{title}</h2>
        <h4>{city}, {state}, {country}</h4>
        <span className='span'>
          <h4>{beds} beds</h4>
          <h4>{bathrooms} Bathrooms</h4>
          <h4>{area} sq.m</h4>
        </span>
        <button className='button' onClick={openModal} >Contact Owner</button>
      </div>
    )
  }

  export default PropertyCard