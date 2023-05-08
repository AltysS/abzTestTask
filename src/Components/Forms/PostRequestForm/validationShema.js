import * as Yup from "yup";

const validationShema = Yup.object().shape({
  name: Yup.string()
    .min(2, "user name, should be more than 2 characters")
    .max(60, "user name, should be less than 60 characters")
    .required("Name is required"),
  email: Yup.string()
    .email()
    .min(2, "Email has to be more than 2 digts")
    .max(100, "Email has to be less than 100 digts")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please, type correct Email"
    )
    .required("Email is required"),
  phone: Yup.string()
    .required()
    .matches(
      /^[\+]{0,1}380([0-9]{9})$/,
      "number should start with +380 and contains 13 characters"
    ),
  picked: Yup.string().required("Position is required"),
  image: Yup.mixed()
    .test("Image width", "Image width has to be more than 70 px", (value) => {
      return value && value.imageWidth >= 70;
    })
    .test("Image height", "Image height has to be more than 70 px", (value) => {
      return value && value.imageHeight >= 70;
    })
    .test("Image type", "Image type has to be jpg or jpeg", (value) => {
      return (
        value && JSON.stringify(value.format) === JSON.stringify("image/jpeg")
      );
    })
    .test("size", "size has to be not more than 5 mb", (value) => {
      return value && value.size <= 5000000;
    })
    .required("This field is required"),
});

export default validationShema;
