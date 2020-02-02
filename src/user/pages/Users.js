import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    async function getUsers () {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/users')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setData(responseData.users)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(err.message)
      }
    }
    getUsers()
  }, [])

  function errorHandler () {
    setError(null)
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && data && <UsersList items={data} />}
    </React.Fragment>
  )
}

export default Users
