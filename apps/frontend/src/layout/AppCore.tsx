import { useStudioStore } from "@/modules/surveys/states/studio";
import { Outlet } from "react-router-dom";
import { Navbar } from ".";

export const AppCore = () => {
    const studioModeIsActive = useStudioStore((state) => state.studioModeIsActive);
    return (
        <div
            className="flex bg-intg-black"
            style={{
                backgroundImage: "radial-gradient(rgba(28, 15, 89, 0.30) 50%, rgba(5, 5, 5, 0.30))",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            {!studioModeIsActive && <Navbar />}
            <div className="custom-scrollbar h-screen flex-1 overflow-y-auto overflow-x-hidden">
                <Outlet />
            </div>
        </div>
    );
};
