import React from 'react'
import '../index.css'
import profile from '../assets/profile.png'

function Profile() {
  return (
    <div>
        <div className="profile">
            <img src={profile} alt="" className='profile-icon'/>
        </div>
    </div>
  )
}

export default Profile