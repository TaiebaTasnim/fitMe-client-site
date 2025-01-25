import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fit-me-server-site.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;