import useAxiosSecure from "./useAxiosSecure";

const useApplicationsApi = () => {
  const instance = useAxiosSecure();
  const myApplicationsPromise = (email) => {
    return instance
      .get(`/applications?email=${email}`)
      .then((res) => console.log(res.data));
  };
  return { myApplicationsPromise };
};

export default useApplicationsApi;
