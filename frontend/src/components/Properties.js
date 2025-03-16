import React, { createContext, useContext, useState, useEffect} from 'react'
import axiosInstance from '../utils/axiosConfig'
import PropertyCard from './PropertyCard'
import ContactModal from './Modal'
import { toast } from 'react-toastify'

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
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('list-properties')
        setAllProperties(response.data)
      } catch (error) {
        console.error('Error fetching properties:', error)
        toast.error('Failed to fetch properties')
      }
    }

    fetchProperties()
  }, [])


  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      <div className="properties-list">
      {allProperties?.length > 0 ?
            <>
            {allProperties.map((prop) => {
                  return <PropertyCard key={prop._id} prop={prop} />
            })}    
            </> : <h2>Wait a minute.. Server is starting.</h2>}
      </div>
      <ContactModal />
    </ModalContext.Provider>
  )
}

export default Properties