import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authslice'

function Logoutbtn() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await authservice.logout() //Delete all sessions from the user account and remove any sessions cookies from the end client.
      dispatch(logout()) //delete from store
    } catch (error) {
      console.log("Failed to logout", error)
    }
  }
  return (
    <div className='inline-block px-6 py-2 duration-300 hover:bg-blue-100 rounded-full' onClick={handleLogout}>logoutbtn</div>
  )
}

export default Logoutbtn