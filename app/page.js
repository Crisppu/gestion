'use client'
import { selectCounter, setCounter } from "@/redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const selector = useSelector(selectCounter);
  const dispatch = useDispatch();
  const updateValue = () =>{
    dispatch(setCounter({counter:selector+1}))
  }
  return (

      <main className="h-screen bg-red-500 dark:bg-black">
        <h1 className="text-red-500"> soy el home</h1>
        <h2>{selector}</h2>
        <button onClick={updateValue}> cambiar modo dark</button>
    </main>
  );
}
