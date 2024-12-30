/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import {
  FormWrapper,
  Heading,
  SubHeading,
  Form,
  InputGroup,
  Icon,
  Input,
  EyeIcon,
  ErrorMessage,
  Button,
  ToggleButton,
} from "./loginForm.style"; // Reuse styles from login

// Yup schema for validation
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Ime je obavezno"),
  lastName: yup.string().required("Prezime je obavezno"),
  email: yup.string().email("Pogrešan email").required("Email je obavezan"),
  password: yup
    .string()
    .min(6, "Lozinka mora imati najmanje 6 karaktera")
    .required("Lozinka je obavezna"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Lozinke moraju biti iste")
    .required("Potvrda lozinke je obavezna"),
});

interface RegisterFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  onToggleLogin?: () => void; // Optional callback for toggling to login
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onToggleLogin,
}) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <FormWrapper>
      <Heading>Registracija</Heading>
      <SubHeading>Napravite novi nalog da biste počeli.</SubHeading>
      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <InputGroup>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            name="firstName"
            placeholder="Ime"
            onChange={handleChange}
            value={form.firstName}
          />
        </InputGroup>
        {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}

        {/* Last Name */}
        <InputGroup>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            name="lastName"
            placeholder="Prezime"
            onChange={handleChange}
            value={form.lastName}
          />
        </InputGroup>
        {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

        {/* Email */}
        <InputGroup>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
        </InputGroup>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        {/* Password */}
        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Lozinka"
            onChange={handleChange}
            value={form.password}
          />
          <EyeIcon onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputGroup>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        {/* Confirm Password */}
        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="Potvrda lozinke"
            onChange={handleChange}
            value={form.confirmPassword}
          />
          <EyeIcon
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputGroup>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}

        <Button type="submit">Registrujte se</Button>
      </Form>

      {/* Toggle to Login */}
      <ToggleButton
        onClick={(e) => {
          e.preventDefault();
          if (onToggleLogin) onToggleLogin();
        }}
        href="#"
      >
        Već imate nalog? Prijavite se
      </ToggleButton>
    </FormWrapper>
  );
};

export default RegisterForm;
