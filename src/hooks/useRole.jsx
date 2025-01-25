import { useContext } from 'react'

//import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../Provider/AuthProvider'
import useAxiosPublic from './useAxiosPublic'

const useRole = () => {
  const axiosPublic = useAxiosPublic()
  const { user, loading } = useContext(AuthContext)
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/role/${user?.email}`)
      return data.role
    },
  })
  //console.log(role)
  return [role, isLoading]
}

export default useRole
