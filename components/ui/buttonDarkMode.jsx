import { selectDarkMode, setMode } from "@/redux/features/darkModeSlice";
import { useDispatch, useSelector} from "react-redux";

export default function ButtonDarkMode() {
    const dispatch = useDispatch();
    const modeSelector = useSelector(selectDarkMode);

    return (
        <div className={`w-20 h-10 ${modeSelector}`}>
            <label onClick={() => dispatch(setMode())} className={`flex items-center w-full h-10 border-gray-300 bg-gray-200 dark:border-slate-700 dark:bg-slate-600 rounded-3xl cursor-pointer border-4 border-solid transition-colors duration-500`}>
                <span className={`${modeSelector === 'light' ? `before:bg-white before:content-['☀️'] before:translate-x-0` : `before:bg-black before:content-['🌑'] before:translate-x-8`}  before:flex before:items-center before:justify-center before:top-3 before:left-3 before:w-7 before:h-7 before:rounded-full  before:transition before:duration-500 p-2`}></span>
            </label>
        </div>
    )
}
