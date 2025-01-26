import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://newserver-estates.vercel.app",
});

const useAxiosNormal = () => {
  return { axiosPublic };
};

export default useAxiosNormal;
