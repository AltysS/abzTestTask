import { memo } from "react";
import styles from "./Main.module.scss";
import backgroundImage from "../../images/mainLogo/main__logo.png";
import Button from "../Button/Button";
import Card from "../Card/Card";
import PostRequestForm from "../Forms/PostRequestForm/PostRequestForm";
import SuccessRegistration from "../SuccessRegistration/SuccessRegistration";
import stylesContainer from "../../App.module.scss";
import classNames from "classnames";

const Main = (props) => {
  const {
    wrapper,
    about,
    backgroundWrapper,
    workingWithGetReq,
    cardsWrapper,
    workingWithPostReq,
    workingWithPostReqTitle,
    mainBackground,
  } = styles;
  const {
    users,
    loading,
    handleShowUsers,
    btnDisabled,
    updateUsers,
    userAdded,
  } = props;
  return (
    <main className={mainBackground}>
      <section>
        <div
          className={classNames(stylesContainer.container, wrapper)}
          style={{ backgroundImage: `url(${backgroundImage}` }}
        >
          <div className={about}>
            <h2>Test assignment for front-end developer</h2>
            <p>
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
          </div>
          <Button color={"#F4E041"} text="Sign up" />
        </div>
      </section>
      <section>
        <div
          className={classNames(backgroundWrapper, stylesContainer.container)}
        >
          <h2 className={workingWithGetReq}>Working with GET request</h2>
          <div className={cardsWrapper}>
            {loading ? (
              users.map((user) => {
                return <Card users={user} key={user.id} />;
              })
            ) : (
              <h2>Loading</h2>
            )}
          </div>
          <Button
            btnDisabled={btnDisabled}
            text="Show More"
            handleClick={handleShowUsers}
            btnVisible={!btnDisabled}
          />
        </div>
      </section>
      <section className={workingWithPostReq}>
        {userAdded ? (
          <SuccessRegistration />
        ) : (
          <>
            <h2 className={workingWithPostReqTitle}>
              Working with POST request
            </h2>
            <PostRequestForm updateUsers={updateUsers} />
          </>
        )}

        {/* <h2 className={workingWithPostReqTitle}>Working with POST request</h2>
        <PostRequestForm updateUsers={updateUsers} /> */}
      </section>
    </main>
  );
};

export default memo(Main);
