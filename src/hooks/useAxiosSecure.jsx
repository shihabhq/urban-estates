import axios from "axios";
import React, { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContexts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://newserver-estates.vercel.app",
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://newserver-estates.vercel.app",
    withCredentials: true,
  });
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          logOut()
            .then(() => toast.error("logged out user as you are unauthorized"))
            .catch((e) => toast.error("something went wrong"));

          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [axiosSecure.interceptors.response, logOut, navigate]);

  return { axiosSecure };
};

export default useAxiosSecure;
