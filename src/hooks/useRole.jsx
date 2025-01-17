import { useContext } from 'react'

import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../Provider/AuthProvider'

const useRole = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useContext(AuthContext)
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`)
      return data.role
    },
  })
  console.log(role)
  return [role, isLoading]
}

export default useRole
