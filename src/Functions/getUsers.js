const getUsers = async () => {
  return await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
  ).then((res) => res.json());
};

export default getUsers;
