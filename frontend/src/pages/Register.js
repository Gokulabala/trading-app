import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

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
      await axios.post("http://localhost:5000/api/auth/register", {
        email: values.email,
        password: values.password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 409) {
        setErrors({ email: "User already exists" });
      } else {
        setErrors({ email: "Something went wrong. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
