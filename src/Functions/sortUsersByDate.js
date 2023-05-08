const sortUsersByDate = (arr) => {
  const usersArr = arr.sort((a, b) => {
    return a.registration_timestamp - b.registration_timestamp;
  });
  return usersArr.reverse();
};

export default sortUsersByDate;
