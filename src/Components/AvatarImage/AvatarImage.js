import React, { memo, useState, useEffect } from "react";
import EmptyAvatar from "../../images/EmptyAvatar/EmptyAvatar";

const AvatarImage = (props) => {
  const { url } = props;
  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            setImageExists(false);
          }
        })
        .catch((error) => {
          setImageExists(false);
        });
    }
  }, [url]);

  return (
    <>{imageExists ? <img src={url} alt="user-avatar" /> : <EmptyAvatar />}</>
  );
};

export default memo(AvatarImage);
