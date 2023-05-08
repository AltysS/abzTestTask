import React, { memo } from "react";
import AvatarImage from "../AvatarImage/AvatarImage";
import styles from "./Card.module.scss";

const Card = (props) => {
  const { users: user } = props;
  const { cardWrapper, aboutPerson } = styles;
  return (
    <div className={cardWrapper}>
      <div className="image-wrapper">
        <AvatarImage url={user.photo} />
      </div>
      <p>{user.name}</p>
      <div className={aboutPerson}>
        <p>{user.position}</p>
        <a
          className={styles.email}
          data-html="true"
          data-tip
          data-for="userEmail"
          href={`mailto: ${user.email}`}
        >
          {user.email}
        </a>
        <a href={`tel: ${user.phone}`}>{user.phone}</a>
      </div>
    </div>
  );
};

export default memo(Card);
