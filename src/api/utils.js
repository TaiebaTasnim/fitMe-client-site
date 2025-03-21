/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import useAxiosPublic from '../hooks/useAxiosPublic'
//import useAxiosPublic from '../hooks/useAxiosPublic'
// Upload image and return image url

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data.data.display_url
}

export const saveUser = async user => {
      const axiosPublic = useAxiosPublic(); 
  await axiosPublic.post(`/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
  })
}
