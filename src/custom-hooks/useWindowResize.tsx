import { useState, useEffect } from "react";

interface WindowResizeState {
    currentWidth: number;
    setCurrentWidth: Function;
}

const useWindowResize = (): WindowResizeState => {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    const handleResize = (): void => setCurrentWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return { currentWidth, setCurrentWidth};
};

export default useWindowResize;
