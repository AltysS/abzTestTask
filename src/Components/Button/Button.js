import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
const Button = (props) => {
  const { headerBtn } = styles;
  const { text, btnDisabled, handleClick, btnVisible } = props;
  return (
    <button
      className={headerBtn}
      style={{
        display: btnVisible ? "inline-block" : "none",
      }}
      disabled={btnDisabled ? true : false}
      type="submit"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default memo(Button);

Button.propTypes = {
  text: PropTypes.string,
  btnDisabled: PropTypes.bool,
  color: PropTypes.string,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  name: "test",
  color: "blue",
  btnDisabled: false,
  handleClick: () => {},
};
