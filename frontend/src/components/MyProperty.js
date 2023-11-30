import React from 'react'
import { deleteProperty } from '../features/properties/propertySlice'
import { useDispatch } from 'react-redux'
const MyProperty = ({ property }) => {
    const {area,title,price,city,state,country,beds,bathrooms,imageUrl} = property
    const dispatch = useDispatch()

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
        <button onClick={() => dispatch(deleteProperty(property._id))} className='button'>
        Delete Property
      </button>
      </div>
      
    )
  }

  export default MyProperty