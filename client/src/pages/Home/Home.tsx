/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import {
  Container,
  FormWrapper,
  Logo,
  TextContent,
  Heading,
  Paragraph,
  SocialIconsContainer,
  SocialIcon,
  KayakAnimationContainer,
  ErrorMessage,
} from "./Home.styles";
import CustomToast from "../../components/CustomToast/CustomToast";
import { useDispatch } from "react-redux";
import { setView } from "../../redux/slices/viewSlice";
import { Views } from "../../constants/views";

const Home: React.FC = () => {
  const { login, register, user, error, isRegistered, resetRegistration } =
    useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false); // State for showing toast

  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    await login(data.email, data.password);
  };

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    await register(data);
  };

  useEffect(() => {
    if (user?.role?.name) {
      navigate(`/dashboard/${user.role.name}`);
      dispatch(setView(Views.CALENDAR));
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isRegistered) {
      setShowToast(true); // Show toast
      resetRegistration(); // Reset the registration state
      setIsLogin(true); // Toggle back to the login form
    }
  }, [isRegistered, resetRegistration]);

  return (
    <Container>
      <Logo>Eagle Paddle</Logo>

      {/* Kayak Animation */}
      <KayakAnimationContainer>
        <svg
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10,50 C50,10 150,10 190,50 C150,90 50,90 10,50 Z"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray="300"
            strokeDashoffset="300"
            className="kayak-path"
          />
        </svg>
      </KayakAnimationContainer>

      {showToast && (
        <CustomToast
          heading="Registracija Uspešna"
          text="Vaš nalog je kreiran. Molimo vas da se prijavite nakon što admin odobri."
          buttonName="Zatvori"
          onButtonClick={() => setShowToast(false)} // Close toast
        />
      )}

      <FormWrapper>
        {isLogin ? (
          <>
            <LoginForm
              onSubmit={handleLogin}
              onToggleRegister={() => setIsLogin(false)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        ) : (
          <>
            <RegisterForm
              onSubmit={handleRegister}
              onToggleLogin={() => setIsLogin(true)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        )}
      </FormWrapper>

      <TextContent>
        <Heading>Dobrodošli nazad!</Heading>
        <Paragraph>
          Pratite svoj napredak, ostvarite ciljeve i ostanite ispred u svetu
          kajakaštva. Zaronite u svoje statistike, analizirajte rezultate i
          veslajte prema uspehu!
        </Paragraph>
      </TextContent>

      {/* Social Icons */}
      <SocialIconsContainer>
        <SocialIcon
          href="https://facebook.com"
          target="_blank"
          aria-label="Facebook"
        >
          <FaFacebook />
        </SocialIcon>
        <SocialIcon
          href="https://instagram.com"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com"
          target="_blank"
          aria-label="Twitter"
        >
          <FaTwitter />
        </SocialIcon>
        <SocialIcon
          href="https://yourwebsite.com"
          target="_blank"
          aria-label="Website"
        >
          <FaGlobe />
        </SocialIcon>
      </SocialIconsContainer>
    </Container>
  );
};

export default Home;
