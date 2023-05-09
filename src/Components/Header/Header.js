import HeaderLogo from "../../images/HeaderLogo/HeaderLogo";
import Button from "../Button/Button";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { memo } from "react";
import stylesContainer from "../../App.module.scss";

const Header = () => {
  const { container, companyName, companyLogoWrapper, btnWrapper } = styles;
  return (
    <header className={classNames(container, stylesContainer.container)}>
      <div className={companyLogoWrapper}>
        <HeaderLogo />
        <h2 className={companyName}>TESTTASK</h2>
      </div>
      <div className={btnWrapper}>
        <Button text="Users" color="#F4E041" btnVisible={true} />
        <Button text="Sign Up" color="#F4E041" btnVisible={true} />
      </div>
    </header>
  );
};

export default memo(Header);
