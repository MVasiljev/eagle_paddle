import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";

// Yup schema for validation
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleValidation = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors: Record<string, string> = {};
      (validationErrors as yup.ValidationError).inner.forEach((err) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await handleValidation();
    if (isValid) {
      onSubmit({ email, password });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="input-group">
        <FaEnvelope className="icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* Password Input */}
      <div className="input-group">
        <FaLock className="icon" />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <div
          className="eye-icon"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <button type="submit" className="btn">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
