"use client";
import { useCalculator } from "@/store/hooks";
import CalculatorDisplay from "./Display";
import CalculatorTile from "./Tile";
import CalculatorHistory from "./History";

interface CalculatorProps {}

const Calculator = ({}: CalculatorProps) => {
  const { onDigitSet } = useCalculator();
  return (
    <div className="max-w-2xl mx-auto flex justify-center flex-wrap gap-5">
      <CalculatorHistory />
      <div className="gap-1 flex flex-col">
        <CalculatorDisplay />
        <div className="grid grid-rows-5 grid-cols-5 grid-flow-col gap-1">
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="√" />
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="M-" />
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="MR" />
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="M+" />
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="MC" />
          {/* col 2 */}
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="^" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="7" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="4" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="1" />
          <CalculatorTile
            onClick={onDigitSet}
            className="col-span-2"
            color="secondary"
            symbol="0"
          />
          {/* col 3 */}
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="%" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="8" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="5" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="2" />
          {/* col 4 */}
          <CalculatorTile onClick={onDigitSet} color="tertiary" symbol="C" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="9" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="6" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="3" />
          <CalculatorTile onClick={onDigitSet} color="secondary" symbol="." />
          {/* col 5 */}
          <CalculatorTile onClick={onDigitSet} color="primary" symbol="÷" />
          <CalculatorTile onClick={onDigitSet} color="primary" symbol="x" />
          <CalculatorTile onClick={onDigitSet} color="primary" symbol="-" />
          <CalculatorTile onClick={onDigitSet} color="primary" symbol="+" />
          <CalculatorTile onClick={onDigitSet} color="primary" symbol="=" />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
