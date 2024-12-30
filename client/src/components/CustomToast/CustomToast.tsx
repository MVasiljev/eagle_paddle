/** @jsxImportSource @emotion/react */
import React from "react";
import {
  ToastContainer,
  ToastHeading,
  ToastText,
  ToastButton,
} from "./customToast.style";

interface CustomToastProps {
  heading: string;
  text: string;
  buttonName: string;
  onButtonClick: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  heading,
  text,
  buttonName,
  onButtonClick,
}) => {
  return (
    <ToastContainer>
      <ToastHeading>{heading}</ToastHeading>
      <ToastText>{text}</ToastText>
      <ToastButton onClick={onButtonClick}>{buttonName}</ToastButton>
    </ToastContainer>
  );
};

export default CustomToast;
