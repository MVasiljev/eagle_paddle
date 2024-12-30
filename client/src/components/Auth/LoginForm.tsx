/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
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
  CheckboxGroup,
  Checkbox,
  CheckboxLabel,
  ForgotPasswordLink,
  ToggleButton,
} from "./loginForm.style";

// Yup schema for validation
const loginSchema = yup.object().shape({
  email: yup.string().email("Pogrešan email").required("Email je obavezan"),
  password: yup.string().required("Lozinka je obavezna"),
});

interface LoginFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onToggleRegister?: () => void; // Optional callback for toggling to register
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onToggleRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
      onSubmit({ email, password, rememberMe });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <FormWrapper>
      <Heading>Prijavite se</Heading>
      <SubHeading>
        Dobrodošli! Molimo vas da se prijavite na svoj nalog.
      </SubHeading>
      <Form onSubmit={handleSubmit}>
        {/* Email Input */}
        <InputGroup>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        {/* Password Input */}
        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeIcon onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputGroup>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        {/* Remember Me Checkbox */}
        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <CheckboxLabel htmlFor="rememberMe">Zapamti me</CheckboxLabel>
        </CheckboxGroup>

        <Button type="submit">Prijavi se</Button>
      </Form>

      <ForgotPasswordLink href="/forgot-password">
        Zaboravili ste lozinku?
      </ForgotPasswordLink>
      <ToggleButton
        onClick={(e) => {
          e.preventDefault();
          if (onToggleRegister) onToggleRegister();
        }}
        href="#"
      >
        Nemate nalog? Registrujte se
      </ToggleButton>
    </FormWrapper>
  );
};

export default LoginForm;
