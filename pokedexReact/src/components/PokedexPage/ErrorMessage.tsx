import React from "react";
import AlertImg from "../../img/Alert.png";
import PokeNotImg from "../../img/PokeNot.png";
import "../../styles/nomalStyles/pokeCard.css";

type ErrorMessageProps = {
  title: string;
  message: string;
  imageSrc?: "alert" | "pokenot";
  secondaryMessage?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  imageSrc,
  secondaryMessage,
}) => {
  const imageMap = {
    alert: AlertImg,
    pokenot: PokeNotImg,
  };

  const resolvedImageSrc = imageSrc ? imageMap[imageSrc] : undefined;

  return (
    <div className="error_c">
      {resolvedImageSrc && (
        <img className="error_img" src={resolvedImageSrc} alt={title} />
      )}
      <p className="error_msg">{message}</p>
      {secondaryMessage && (
        <p className="error_msg">{secondaryMessage}</p>
      )}
    </div>
  );
};
