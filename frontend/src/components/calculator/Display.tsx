import { useAtom } from "jotai";
import Typography from "../typography";
import { calcAtom } from "@/store";

const CalculatorDisplay = () => {
  const [currentCalc] = useAtom(calcAtom);

  return (
    <div className="bg-gray-800 min-h-[120px] flex p-5 flex-1 justify-end items-end gap-3 rounded-t-lg flex-col">
      <Typography variant="3xl">{currentCalc.calc}</Typography>
      <Typography variant="xl" color="secondary">
        {currentCalc.result.toLocaleString('en-US')}
      </Typography>
    </div>
  );
};

export default CalculatorDisplay;
