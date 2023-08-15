import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const buttonStyles = tv({
  base: "font-medium tracking-wider shadow-lg rounded-lg active:opacity-80",
  variants: {
    color: {
      primary: "bg-blue-500 shadow-blue-500/50 text-white",
      secondary: "bg-purple-500 shadow-purple-500/50 text-white",
      danger: "bg-red-500 shadow-red-500/50 text-white",
      success: "bg-green-500 shadow-green-500/50 text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

type Props = ButtonProps & VariantProps<typeof buttonStyles>;

const Button = ({ className, children, size, color, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={twMerge(className, buttonStyles({ color, size }))}
    >
      {children}
    </button>
  );
};

export default Button;
