import { useQuery } from "@tanstack/react-query";


import useAxiosPublic from "./useAxiosPublic";

const usePackege = () => {
    const axiosPublic = useAxiosPublic();
   
    const {  data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async() => {
            const res = await axiosPublic.get('/package');
            console.log(res.data)
            return res.data;
        }
    })

    return [packages]
};

export default usePackege;