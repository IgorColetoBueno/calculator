import { History } from "@/model/history";
import { atom } from "jotai";

const INITIAL_STATE: History = { calc: "", result: 0 };

export const calcAtom = atom<History>(INITIAL_STATE);
export const calcInMemoryAtom = atom<number | null>(null);
export const calcHistoryAtom = atom<History[]>([]);

