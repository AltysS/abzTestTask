import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import getRegistrationToken from "../../../Functions/getRegToken";
import initialValues from "./initialValues";
import styles from "./PostRequestForm.module.scss";
import validationShema from "./validationShema";
import postNewUser from "../../../Functions/postNewUser";
// import getUsers from "../../../Functions/getUsers";
import Button from "../../Button/Button";

const PostRequestForm = (props) => {
  const { updateUsers } = props;
  const [radioBtn, setRadioBtn] = useState();
  const [loading, setIsLoading] = useState(false);
  const [newImageSrc, setNewImageSrc] = useState(null);
  const [err, setErr] = useState(null);
  const {
    inputElement,
    inputLabel,
    formControlImage,
    formControlPath,
    rootForm,
    fromControl,
    radioWrapper,
    errorMsg,
    errorServerMsg,
  } = styles;

  useEffect(() => {
    const getRadioBtn = async () => {
      const radioBtnData = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
      ).then((res) => res.json());
      setRadioBtn(radioBtnData.positions);
    };
    try {
      getRadioBtn();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(true);
    }
  }, []);
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          try {
            const {
              name,
              email,
              phone,
              picked: position_id,
              image: { fileImg },
            } = values;
            const userObj = {
              name,
              email,
              phone,
              position_id,
              photo: fileImg,
            };
            const token = await getRegistrationToken();
            const postUser = await postNewUser(token.token, userObj);
            if (postUser.success) {
              await updateUsers(true);
              resetForm();
            } else {
              setErr(postUser.message);
            }
          } catch (err) {
            console.log(err);
          }
        }}
        validationSchema={validationShema}
      >
        {(props) => {
          return (
            <Form className={rootForm}>
              <div className={fromControl}>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={(e) => {
                    props.setFieldValue("name", e.target.value);
                    setErr(null);
                  }}
                  style={
                    props.errors.fullName && props.touched.fullName
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {props.errors.name && props.touched.name ? (
                  <span className={errorMsg}>{props.errors.name}</span>
                ) : null}
              </div>
              <div className={fromControl}>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  onChange={(e) => {
                    props.setFieldValue("email", e.target.value);
                    setErr(null);
                  }}
                  style={
                    props.errors.email && props.touched.email
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {props.errors.email && props.touched.email ? (
                  <span className={errorMsg}>{props.errors.email}</span>
                ) : null}
              </div>
              <div className={fromControl}>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={(e) => {
                    props.setFieldValue("phone", e.target.value);
                    setErr(null);
                  }}
                  style={
                    props.errors.phone && props.touched.phone
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {props.errors.phone && props.touched.phone ? (
                  <span className={errorMsg}>{props.errors.phone}</span>
                ) : null}
              </div>
              <div className={fromControl}>
                <label className={radioWrapper}>
                  Select your position
                  {loading && radioBtn ? (
                    radioBtn.map((el) => {
                      return (
                        <label key={el.id}>
                          <input
                            type="radio"
                            name="picked"
                            value={el.id}
                            id={el.id}
                            onChange={(e) => {
                              props.setFieldValue("picked", e.target.value);
                              setErr(null);
                            }}
                          />
                          {el.name}
                        </label>
                      );
                    })
                  ) : (
                    <h2>Loading...</h2>
                  )}
                  {props.errors.picked && props.touched.picked ? (
                    <span className={errorMsg}>{props.errors.picked}</span>
                  ) : null}
                </label>
              </div>
              <div className={formControlImage}>
                <label
                  onClick={() => (props.touched.image = true)}
                  className={inputLabel}
                  style={
                    props.errors.image && props.touched.image
                      ? { border: "1px solid red" }
                      : null
                  }
                >
                  Upload
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className={inputElement}
                    onChange={(e) => {
                      setErr(null);
                      const file = e.target.files[0];
                      const imageProps = {
                        picture: e.target.value,
                        imageWidth: "",
                        imageHeight: "",
                        size: e.target.files[0].size,
                        fileImg: file,
                      };
                      let reader = new FileReader();
                      reader.onload = function (theFile) {
                        let image = new Image();
                        image.onload = function () {
                          imageProps.imageWidth = this.width;
                          imageProps.imageHeight = this.height;
                          imageProps.format = file.type;
                          props.setFieldValue("path", file.name);
                          props.setFieldValue("image", imageProps);
                          setNewImageSrc(reader.result);
                        };
                        image.src = theFile.target.result;
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {props.errors.image && props.touched.image ? (
                    <span className={errorMsg}>{props.errors.image}</span>
                  ) : null}
                </label>
                <p
                  className={formControlPath}
                  style={
                    props.errors.image && props.touched.image
                      ? { border: "1px solid red" }
                      : null
                  }
                >
                  {props.values.path ? props.values.path : "Upload your photo"}
                </p>
              </div>
              {err && (
                <div className={errorServerMsg}>
                  <p>{err}</p>
                </div>
              )}
              <Button
                text="Sign up"
                btnDisabled={props.isValid && err === null ? false : true}
                btnVisible={true}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default PostRequestForm;
