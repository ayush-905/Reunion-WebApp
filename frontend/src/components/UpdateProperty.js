import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProperty } from './../features/properties/propertySlice'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from './../firebase'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProperty = () => {
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    const data = location.state
    if (data) {
      setForm((prevForm) => ({ ...prevForm, ...data }));
    }
  }, []);

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
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error('File size exceeds the limit (2 MB)');
        setLoading(false);
        return null;
      }
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
    return form.imageUrl
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    const isEmpty = Object.entries(form).some(([key, value]) => key !== 'imageUrl' && value === '');
    if(isEmpty){
      toast.error("Fill all details")
      setLoading(false)
      return
    }
    try{
      const imageUrl = await handleUpload()
      if(!imageUrl)
        return
        const updatedForm = { ...form, imageUrl:imageUrl }
        dispatch(updateProperty({PropertyData: updatedForm, id:location.state._id}))
        navigate('/dashboard')
      }catch(error){
        console.log(error)
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
           {loading ? 'Updating Property...' : 'Update Property'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdateProperty
