import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "medium",
  type = "button",
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.button, styles[variant], styles[size], {
        [styles.disabled]: disabled,
      })}
      type={type}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
