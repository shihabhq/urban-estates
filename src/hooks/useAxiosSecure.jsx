import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "https://newserver-estates.vercel.app",
});

const useAxiosSecure = () => {
  return { axiosSecure };
};

export default useAxiosSecure;
