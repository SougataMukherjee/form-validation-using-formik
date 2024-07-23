import { useState } from "react";
import { isEmailValid } from "./FormValidation";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function App() {
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(5, "Minimum 5 characters")
        .max(25, "Maximum 25 characters")
        .required("Email is required")
        .matches(
          /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "email is not valid"
        ),
      // .test('email', 'email is invalid', async (value) => {
      //   return isEmailValid(value);
      // })
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      //async await is better than then catch
      try {
        const res = await apiRequest(values);
        if (res.data && res.data.responseObject) {
          console.log(` Form submited `);
        } else {
          setOpen(true);
        }
      } catch (err) {
        setOpen(false);
        console.log("err", err);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} //{(e)=>formik.handleBlur(e)}
          className="email"
          type="email"
          name="email"
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        )}
      </div>
      <button type="submit">submit</button>
    </form>
  );
}
