import useApiClient from "@/hooks/useAxios";
import { History } from "@/model/history";
import { useAtom } from "jotai";
import Mexp from "math-expression-evaluator";
import { useCallback, useEffect } from "react";
import { calcAtom, calcHistoryAtom, calcInMemoryAtom } from "..";
import { useAuthSession } from "./auth";

const mexp = new Mexp();
const operatorsThatMustGetTheResultOnStart = ["+", "-", "÷", "x", "^"];
const CALC_ERROR = "An error ocurred";

export const useCalculator = () => {
  const [currentCalc, setCurrentCalc] = useAtom(calcAtom);
  const [history, setHistory] = useAtom(calcHistoryAtom);
  const [inMemory, setInMemory] = useAtom(calcInMemoryAtom);
  const { user } = useAuthSession();
  const { axios } = useApiClient();

  const onDigitSet = useCallback(
    (digit: string) => {
      try {
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
            addToHistory({ result, calc: currentCalc.calc });
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
              setCurrentCalc({
                ...currentCalc,
                calc: currentCalc.calc + digit,
              });
            }
        }
      } catch (error) {
        setCurrentCalc({ calc: CALC_ERROR, result: 0 });
        setTimeout(() => onDigitSet("C"), 1500);
      }
    },
    [currentCalc]
  );

  const fetchHistory = useCallback(async () => {
    try {
      const historyResponse = await axios.get<History[]>("history");
      setHistory(historyResponse.data);
    } catch (error) {}
  }, []);

  const addToHistory = useCallback(
    async (history: History) => {
      // try add but without throw error if it occur
      try {
        // dont do the save if is not logged in
        if (!user) {
          return;
        }
        await axios.post("history/new", history);
      } catch (error) {}
    },
    [user]
  );

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  return { onDigitSet };
};
