import { Dispatch, SetStateAction } from "react";

type FCState<T> = [T, Dispatch<SetStateAction<T>>];