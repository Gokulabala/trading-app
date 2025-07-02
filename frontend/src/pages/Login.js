import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      values
    );

    const token = response.data.token;
    localStorage.setItem("authToken", token);

    login({ email: values.email }); // Optional: Set user in context
    alert("Login successful!");

    navigate("/dashboard"); // ✅ Navigate to dashboard
  } catch (error) {
    setErrors({ email: "Invalid email or password" });
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              {errors.email && touched.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
            </div>
            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              {errors.password && touched.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
