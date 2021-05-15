import React from "react";
import cn from "classnames";
import { useButton } from "@react-aria/button";
import styles from "./button.module.css";

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onPress?: () => void;
  type: "button" | "submit" | "reset";
  theme: string;
}

const _Button: React.FC<ButtonProps> = (props) => {
  const { onPress, children, type, theme = "default", ...rest } = props;

  const buttonRef = React.useRef(null);

  const { buttonProps } = useButton(
    {
      onPress,
      type,
    },
    buttonRef
  );
  return (
    <button
      {...buttonProps}
      ref={buttonRef}
      className={cn(styles.base, {
        [styles.reset]: theme === "reset",
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export { _Button as Button, ButtonProps };
