'use client'
import ButtonDarkMode from "@/components/ui/buttonDarkMode";

export default function NavBar() {
    return (
        <div className="flex justify-end  h-20 pr-2 shrink-0 items-center  bg-green-400  md:h-[100px]">
            <div className="flex justify-center items-center p-1">
                <span className="text-xl">Enrique</span>
            </div>
            <ButtonDarkMode></ButtonDarkMode>
        </div>
    )
}
