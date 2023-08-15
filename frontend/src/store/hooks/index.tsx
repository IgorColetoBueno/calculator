import { useAtom } from "jotai";
import { calcAtom, calcHistoryAtom, calcInMemoryAtom } from "..";
import { useCallback } from "react";
import Mexp from "math-expression-evaluator";

const mexp = new Mexp();
// const memoryOperators = ["M-", "M+", "MC", "MR"];
// const mathOperators = ["+", "-", "÷", "%", "√"];
const operatorsThatMustGetTheResultOnStart = ["+", "-", "÷", "x", "^"];
export const useCalculator = () => {
  const [currentCalc, setCurrentCalc] = useAtom(calcAtom);
  const [history, setHistory] = useAtom(calcHistoryAtom);
  const [inMemory, setInMemory] = useAtom(calcInMemoryAtom);

  const onDigitSet = useCallback(
    (digit: string) => {
      const currentCalcIsNan = isNaN(+currentCalc.calc);

      switch (digit) {
        case "M+":
          if (currentCalcIsNan) {
            break;
          }

          setInMemory((inMemory ?? 0) + +currentCalc.calc);
          setCurrentCalc({ ...currentCalc, calc: "" });
          break;
        case "M-":
          if (currentCalcIsNan) {
            break;
          }

          setInMemory((inMemory ?? 0) - +currentCalc.calc);
          setCurrentCalc({ ...currentCalc, calc: "" });
          break;
        case "MC":
          setInMemory(null);
          break;
        case "MR":
          if (inMemory === null) {
            setCurrentCalc({ ...currentCalc, calc: "0" });
            break;
          }

          setCurrentCalc({ ...currentCalc, calc: inMemory.toString() });
          break;
        case "%":
          debugger;
          const match = currentCalc.calc.match(/(\d+(\.\d+)?)\s*$/);

          if (!match) {
            return;
          }

          const lastNumber: string = match[1];
          const lastChar: string =
            currentCalc.calc[currentCalc.calc.length - 1];

          if (!/\d/.test(lastChar)) {
            return;
          }

          const dividedLastNumber: string = (
            parseFloat(lastNumber) / 100
          ).toString();
          const outputString: string = currentCalc.calc.replace(
            lastNumber,
            dividedLastNumber
          );

          setCurrentCalc({ ...currentCalc, calc: outputString });

          break;
        case "C":
          setCurrentCalc({ calc: "", result: 0 });
          break;
        case "=":
          const formattedInput = currentCalc.calc
            .replaceAll("x", "*")
            .replaceAll("÷", "/")
            .replace(/√(\d+(\.\d+)?)/g, "root($1)");

          var lexed = mexp.lex(formattedInput, []);
          var postfixed = mexp.toPostfix(lexed);
          var result = mexp.postfixEval(postfixed, {});
          setCurrentCalc({ result, calc: "" });
          setHistory([...history, { result, calc: currentCalc.calc }]);
          break;

        default:
          if (
            operatorsThatMustGetTheResultOnStart.includes(digit) &&
            currentCalc.calc === "" &&
            currentCalc.result > 0
          ) {
            setCurrentCalc({
              ...currentCalc,
              calc: currentCalc.calc + currentCalc.result + digit,
            });
          } else {
            setCurrentCalc({ ...currentCalc, calc: currentCalc.calc + digit });
          }
      }
    },
    [currentCalc]
  );

  return { onDigitSet };
};
