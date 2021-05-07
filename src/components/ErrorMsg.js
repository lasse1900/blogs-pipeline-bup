import React from 'react'

const ErrorMsg = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }
  return (
    <div className='error'>
      {errorMessage}
    </div>
  )
}

export default ErrorMsg