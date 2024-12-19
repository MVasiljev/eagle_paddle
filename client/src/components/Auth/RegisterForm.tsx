import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";

// Yup schema for validation
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface RegisterFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form input
      await registerSchema.validate(form, { abortEarly: false });
      setErrors({});

      // Remove confirmPassword before sending to the backend
      const { confirmPassword, ...dataToSubmit } = form;
      onSubmit(dataToSubmit); // Only send relevant data
    } catch (validationErrors) {
      const newErrors: Record<string, string> = {};
      (validationErrors as yup.ValidationError).inner.forEach((err) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name */}
      <div className="input-group">
        <FaUser className="icon" />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={form.firstName}
          className="input"
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div className="input-group">
        <FaUser className="icon" />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={form.lastName}
          className="input"
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>

      {/* Email */}
      <div className="input-group">
        <FaEnvelope className="icon" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="input"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="input-group">
        <FaLock className="icon" />
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="input"
        />
        <div
          className="eye-icon"
          onClick={() => setPasswordVisible(!passwordVisible)}
          style={{ cursor: "pointer" }}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="input-group">
        <FaLock className="icon" />
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={form.confirmPassword}
          className="input"
        />
        <div
          className="eye-icon"
          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={{ cursor: "pointer" }}
        >
          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>

      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
