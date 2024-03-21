import ButtonDarkMode from "@/components/ui/buttonDarkMode";

export default function NavBar() {
    return (
        <div className="flex">
            <div className="flex justify-center items-center p-1">
                <span className="text-xl">Enrique</span>
            </div>
            <ButtonDarkMode></ButtonDarkMode>
        </div>
    )
}
