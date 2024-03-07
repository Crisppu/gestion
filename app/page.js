'use client'
import Image from "next/image";
import RootLayout from "./layout";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [first, setFirst] = useState('luz')
  const prueba = () =>{
    setFirst('dark')
  }
  const darkMode = useSelector((state) => state.darkModeReducer.mode);
  console.log(darkMode)
  return (
    <RootLayout  text={first}>
      <main className="bg-red-300 dark:bg-black">
        <h1> soy el home</h1>
        <button onClick={()=>prueba()}> cambiar modo dark</button>
      </main>
    </RootLayout>
  );
}
