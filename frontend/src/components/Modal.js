import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useModal} from './Properties'
import axiosInstance from '../utils/axiosConfig'
import { toast } from 'react-toastify'


const ContactModal = () => {
  const { isModalOpen, closeModal } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('send-email', formData)
      toast.success('Email sent successfully!')
      closeModal()
    } catch (error) {
      toast.error('Failed to send email')
      console.error('Error:', error)
    }
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='modal' >
        <h2 id="modal-modal-title">User Information</h2>
        <TextField 
            name="name" 
            label="Name" 
            placeholder="Enter your name" 
            fullWidth margin="normal" 
            onChange={handleInputChange} 
        />
        <TextField 
            name="email" 
            label="Email" 
            placeholder="Enter your email" 
            fullWidth margin="normal" 
            onChange={handleInputChange} 
        />
        <TextField 
            name="phone" 
            label="Phone No" 
            placeholder="Enter your phone number" 
            fullWidth margin="normal" 
            onChange={handleInputChange} 
        />
        <TextField 
            name="description" 
            label="Description" 
            placeholder="Enter a description" 
            fullWidth multiline rows={4} 
            margin="normal" 
            onChange={handleInputChange} 
        />
        <Button variant="contained" onClick={handleSubmit}>Send</Button>
        <Button onClick={closeModal}>Close</Button>
      </Box>
    </Modal>
  )
}

export default ContactModal




