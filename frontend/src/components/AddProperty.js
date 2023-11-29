import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { createProperty } from './../features/properties/propertySlice'

function AddProperty() {
    const [form, setForm] = useState({
        currentOwner:'',
        title: '',
        price: '',
        city: '',
        state: '',
        country: '',
        beds: '',
        bathrooms: '',
        area: '',
      })

    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    
     setForm((prevData) => {
        const updatedForm = { ...prevData, currentOwner: user._id }
        dispatch(createProperty(updatedForm))
        return updatedForm
      })
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Property Details</label>
          <input
            type='text'
            placeholder='Property Title'
            name='title'
            value={form.title}
            onChange={handleChange}
          />
           <input
            type='number'
            placeholder='Price'
            name='price'
            value={form.price}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='City'
            name='city'
            value={form.city}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='State'
            name='state'
            value={form.state}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Country'
            name='country'
            value={form.country}
            onChange={handleChange}
          />
          <input
            type='number'
            placeholder='No of beds in property'
            name='beds'
            value={form.beds}
            onChange={handleChange}
          />
          <input
            type='number'
            placeholder='No of bathrooms in property'
            name='bathrooms'
            value={form.bathrooms}
            onChange={handleChange}
          />
          <input
            type='number'
            placeholder='Area of property'
            name='area'
            value={form.area}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Property
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddProperty
