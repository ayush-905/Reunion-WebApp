import React, { createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import PropertyCard from './PropertyCard'
import ContactModal from './Modal'

const API_URL='http://localhost:5001/api/'

export const ModalContext = createContext()

export const useModal = () => useContext(ModalContext)

const Properties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    const fetchAllProperties = async() => {
      const response = await axios.get(API_URL + 'list-properties')
      setAllProperties(response.data)
    }
    fetchAllProperties()
  }, [])



  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      <div className="properties-list">
      {allProperties?.length > 0 ?
            <>
            {allProperties.map((prop) => {
                  return <PropertyCard key={prop._id} prop={prop} />
            })}    
            </> : <h2>We have no properties with the specified options.</h2>}
      </div>
      <ContactModal />
    </ModalContext.Provider>
  )
}

export default Properties