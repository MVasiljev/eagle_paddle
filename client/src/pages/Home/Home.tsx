import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const { login, register, user, error } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  useEffect(() => {
    if (user?.role?.name) {
      navigate(`/dashboard/${user.role.name}`);
    }
  }, [user, navigate]);

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    await register(data);
  };

  return (
    <div className="home-container">
      <div className="left-side">
        <h2>Welcome to Eagle Paddle</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
          mauris vitae risus consequat elementum.
        </p>
      </div>
      <div className="right-side">
        <div className="form-container">
          <h1>{isLogin ? "Log In" : "Register"}</h1>
          {error && <p className="error-message">{error}</p>}
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <RegisterForm onSubmit={handleRegister} />
          )}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
