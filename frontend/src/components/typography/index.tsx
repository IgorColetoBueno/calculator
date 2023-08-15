import { ClassAttributes, PropsWithChildren, createElement } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

interface TypographyProps extends ClassAttributes<HTMLElement> {
  tag?: keyof HTMLElementTagNameMap;
  className?: string;
}

const typographyStyle = tv({
  base: "text-white font-medium font-normal",
  variants: {
    variant: {
      base: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      '2xl': "text-2xl",
      '3xl': "text-3xl",
      '4xl': "text-4xl",
      '5xl': "text-5xl",
      '6xl': "text-6xl",
      '7xl': "text-7xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      black: "text-gray-900",
      secondary: "text-gray-300",
      danger: "text-red-500",
      success: "text-green-500",
    },
  },
});

type Props = PropsWithChildren<TypographyProps> & VariantProps<typeof typographyStyle>;

const Typography = ({
  variant,
  weight,
  color,
  className: finalClassName,
  tag = "span",
  ...rest
}: Props) => {
  return createElement(tag, {
    ...rest,
    className: twMerge(
      finalClassName,
      typographyStyle({ color, variant, weight })
    ),
  });
};

export default Typography;
