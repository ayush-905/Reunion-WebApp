import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PropertyCard from './PropertyCard'

const API_URL='http://localhost:5001/api/'

const Properties = () => {
  const [allProperties, setAllProperties] = useState([])

  useEffect(() => {
    const fetchAllProperties = async() => {
      const response = await axios.get(API_URL + 'list-properties')
      setAllProperties(response.data)
    }
    fetchAllProperties()
  }, [])

  return (
    <div className="properties-list">
    {allProperties?.length > 0 ?
          <>
          {allProperties.map((prop) => {
                return <PropertyCard key={prop._id} prop={prop} />;
          })}    
          </> : <h2>We have no properties with the specified options.</h2>}
    </div>
  )
}

export default Properties