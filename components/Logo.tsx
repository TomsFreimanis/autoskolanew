import React from "react";

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className = "" }) => {
  return (
    <img
      src="/assets/images/logo.png"
      alt="Rīgas Autoskola"
      className={className}
      draggable={false}
    />
  );
};
