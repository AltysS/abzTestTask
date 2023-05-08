import SuccessImage from "../../images/Success-image/Success-image";
import styles from "./SuccessRegistration.module.scss";

const SuccessRegistration = () => {
  const { wrapper, Successtitle } = styles;
  return (
    <div className={wrapper}>
      <h2 className={Successtitle}>User successfully registered</h2>
      <SuccessImage />
    </div>
  );
};

export default SuccessRegistration;
