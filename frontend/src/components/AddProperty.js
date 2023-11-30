  import { useState } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { createProperty } from './../features/properties/propertySlice'
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
  import { app } from './../firebase'

  function AddProperty() {
    const [form, setForm] = useState({
      currentOwner: '',
      title: '',
      price: '',
      city: '',
      state: '',
      country: '',
      beds: '',
      bathrooms: '',
      area: '',
      imageUrl: '',
    })
    const [files,setFiles]= useState('')
    const [loading,setLoading]= useState(false)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleChange = (e) => {
      const { name, value } = e.target
        setForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }

    const handleUpload = async () => {
      setLoading(true);
      if (files && files.length>0) {
        const storage = getStorage(app)
        const file = files[0]
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        try {
          await uploadBytes(storageRef, file)
          const imageUrl = await getDownloadURL(storageRef)
          return imageUrl
        } catch (error) {
          console.error("Error uploading image:", error)
        }
      }
      console.log(form)
    };

    const onSubmit = async (e) => {
      e.preventDefault()

      if (files && files.length>0) {
        try{
          const imageUrl = await handleUpload()
          const updatedForm = { ...form, currentOwner: user._id, imageUrl:imageUrl }
          dispatch(createProperty(updatedForm))
          setForm(updatedForm)
        }catch(error){
          console.log(error)
        }
      }
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
            <label htmlFor='file'>Property Image</label>
            <input
              type='file'
              onChange={(e) => setFiles(e.target.files)}
              accept='image/*'
            />
          </div>
          <div className='form-group'>
            <button 
             className='btn btn-block' 
             type='submit'
             disabled={loading}
            >
             {loading ? 'Adding Property...' : 'Add Property'}
            </button>
          </div>
        </form>
      </section>
    )
  }

  export default AddProperty
