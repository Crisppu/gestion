'use client'
import Image from "next/image";
import RootLayout from "./layout";
import { useState } from "react";

export default function Home() {
  const [first, setFirst] = useState('luz')
  const prueba = () =>{
    setFirst('dark')
  }
  console.log(first)
  return (
    <RootLayout  text={first}>
      <main className="bg-red-300 dark:bg-black">
        <h1> soy el home</h1>
        <button onClick={()=>prueba()}> cambiar modo dark</button>
      </main>
    </RootLayout>
  );
}
