import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProperty, reset } from '../features/properties/propertySlice'
import MyProperty from './MyProperty'
import AddProperty from './AddProperty'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [addProperty,setAddProperty] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { property, isLoading, isError, message } = useSelector(
    (state) => state.property
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/')
    }
    
    if (user) {
      dispatch(getProperty());
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if (isLoading) {
    return <h1>Loading</h1>
  }
 
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Property Dashboard</p>
      </section>
      <section className='content'>
      {addProperty?
        (<AddProperty/>)
        :
        (<button className='btn' onClick={()=>{setAddProperty(true)}}>
          Add Property
          </button>)
      }
         
        {property.length > 0 ? (
          <div className='properties-list'>
            {property.map((prop) => (
              <MyProperty key={prop._id} property={prop} />
            ))}
          </div>
        ) : (
          <h3>You do not have any property listed as of now.</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
