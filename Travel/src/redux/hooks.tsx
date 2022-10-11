import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
    useDispatch as useAppDispatch
} from "react-redux";
import { Rootstate ,AppDispatch} from "./store";

export const useSelector: TypedUseSelectorHook<Rootstate> = useReduxSelector;
export const useDispatch = () => useAppDispatch<AppDispatch>()
