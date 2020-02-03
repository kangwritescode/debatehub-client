import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [data, setData] = useState([])

  useEffect(() => {
    async function getUsers () {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        )
        setData(responseData.users)
      } catch (err) {}
    }
    getUsers()
  }, [])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
