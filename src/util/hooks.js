import { useState, useEffect } from 'react';

export const useDeviceDetect = () => {
    const [isMobile, setMobile] = useState(false);
    useEffect(() => {
        const userAgent = window.navigator === 'undefined' ? '' : window.userAgent;
        const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
        setMobile(mobile);
    }, []);
    return isMobile
};