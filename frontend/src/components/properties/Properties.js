import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PropertyCard from '../propertyCard/PropertyCard'
import '../properties/Properties.css'

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
          {allProperties.map((property) => {
                console.log(property);
                return <PropertyCard property={property} />;
          })}    
          </> : <h2>We have no properties with the specified options.</h2>}
    </div>
  )
}

export default Properties