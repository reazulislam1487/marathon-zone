export const myApplicationsPromise = (email) => {
  return fetch(`/applications?email=${email}`, {
    credentials: "include",
  }).then((res) => res.json());
};
