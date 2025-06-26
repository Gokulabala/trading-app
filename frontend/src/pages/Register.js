import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
 
const Register = () => {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
 
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
 
  // Handle form submission
  const handleSubmit = (values) => {
    // Simulate user registration
    const mockUser = { email: values.email }; // Mock user data
    login(mockUser); // Automatically log in the user after registration
  };
 
  return (
<div>
<h1>Register</h1>
<Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }} // Initial form values
        validationSchema={validationSchema} // Form validation
        onSubmit={handleSubmit} // Form submission handler
>
        {({ errors, touched }) => (
<Form>
<div>
<label>Email</label>
<Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
</div>
<div>
<label>Password</label>
<Field name="password" type="password" />
              {errors.password && touched.password ? (
<div>{errors.password}</div>
              ) : null}
</div>
<div>
<label>Confirm Password</label>
<Field name="confirmPassword" type="password" />
              {errors.confirmPassword && touched.confirmPassword ? (
<div>{errors.confirmPassword}</div>
              ) : null}
</div>
<button type="submit">Register</button>
</Form>
        )}
</Formik>
</div>
  );
};
 
export default Register;