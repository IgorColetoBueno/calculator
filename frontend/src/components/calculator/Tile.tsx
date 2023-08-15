import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";
import Typography from "../typography";

interface CalculatorTileProps {
  symbol: string;
  className?: string;
  onClick: (symbol: string) => void
}

const tileStyles = tv({
  base: "focus:opacity-90 p-4 border-1 border-gray-800",
  variants: {
    color: {
      primary: "bg-orange-500",
      secondary: "bg-gray-500",
      tertiary: "bg-gray-700",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

type Props = CalculatorTileProps & VariantProps<typeof tileStyles>;

const CalculatorTile = ({ color, symbol, className, onClick }: Props) => {
  return (
    <button onClick={() => onClick(symbol)} className={twMerge(tileStyles({ color }), className)}>
      <Typography weight="bold" tag="span" variant="2xl">
        {symbol}
      </Typography>
    </button>
  );
};

export default CalculatorTile;
