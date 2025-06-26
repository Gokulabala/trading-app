import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Make the API call to register the user
      await axios.post("http://localhost:5000/api/register", {
        email: values.email,
        password: values.password,
      });

      // Redirect to the Login page after successful registration
      alert("Registration successful! Redirecting to Login...");
      navigate("/login"); // Redirect to /login
    } catch (error) {
      setErrors({ email: "User already exists" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
