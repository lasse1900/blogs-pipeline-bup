import React from 'react'
import '../index.css'

const Notification = ({ notification }) => {

  if(notification.error) {
    return (
      <div className='true'>
        {notification.message}
      </div>
    )
  } else if (!notification.error){
    return (
      <div className='false'>
        {notification.message}
      </div>
    )
  }

}

export default Notification