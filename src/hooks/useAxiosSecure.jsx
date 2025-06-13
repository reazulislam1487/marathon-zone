import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth"; //

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => { 
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Optional: Eject interceptor on cleanup to avoid duplication
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
