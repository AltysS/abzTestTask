const postNewUser = async (token, data) => {
  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("email", data.email);
  formdata.append("phone", data.phone);
  formdata.append("photo", data.photo);
  formdata.append("position_id", data.position_id);

  const postUser = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/users",
    {
      method: "POST",
      body: formdata,
      headers: { Token: token },
    }
  ).then((res) => res.json());
  return postUser;
};

export default postNewUser;
