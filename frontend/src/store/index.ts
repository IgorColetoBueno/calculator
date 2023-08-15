import { History } from "@/model/history";
import { User } from "@/model/user";
import { atom } from "jotai";

const INITIAL_STATE: History = { calc: "", result: 0 };

export const calcAtom = atom<History>(INITIAL_STATE);
export const calcInMemoryAtom = atom<number | null>(null);
export const calcHistoryAtom = atom<History[]>([]);
export const userAtom = atom<User | null>(null);

