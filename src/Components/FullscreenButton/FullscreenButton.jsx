import { useEffect, useState } from "react";
import "./FullscreenButton.css";

function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error("Kunde inte växla helskärm:", error);
        }
    };

    return (
        <button
            className="fullscreen-button"
            onClick={toggleFullscreen}
            title={
                isFullscreen
                    ? "Stäng av helskärm"
                    : "Spela i helskärm"
            }
        >
            {isFullscreen ? "🗗" : "🗖"}
        </button>
    );
}

export default FullscreenButton;