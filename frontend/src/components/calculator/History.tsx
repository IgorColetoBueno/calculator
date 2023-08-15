import { calcAtom, calcHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import Typography from "../typography";
import { History } from "@/model/history";
import { MouseEventHandler } from "react";

interface CalculatorHistoryProps {}

const CalculatorHistory = ({}: CalculatorHistoryProps) => {
  const [history] = useAtom(calcHistoryAtom);
  const [_, setCalc] = useAtom(calcAtom);

  const setCurrentCalc = (item: History) => () => {
    setCalc({ calc: item.calc, result: item.result });
  };

  return (
    <div className="bg-gray-800 space-y-2 min-w-[200px] p-4 rounded-t-lg">
      <Typography tag="p" variant="xl">
        History
      </Typography>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li
            onClick={setCurrentCalc(item)}
            key={`history-${item.id! + index}`}
            className="bg-gray-700 hover:bg-gray-600 cursor-pointer flex flex-col p-2 rounded-lg"
          >
            <Typography variant="lg">{item.calc}</Typography>
            <Typography variant="base" color="secondary">
              {item.result}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalculatorHistory;
