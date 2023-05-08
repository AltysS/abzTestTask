const getRegistrationToken = async () => {
  const token = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/token"
  ).then((res) => res.json());
  return token;
};

export default getRegistrationToken;
