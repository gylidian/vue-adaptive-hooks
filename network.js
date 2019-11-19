import { useState, useEffect } from "vue-hooks";

let unsupported;

const useNetworkStatus = () => {
    // 检查浏览器是否支持 Navigator.connection
    if ("connection" in navigator && "effectiveType" in navigator.connection) {
        unsupported = false;
    } else {
        unsupported = true;
    }

    const initialNetworkStatus = !unsupported
        ? {
              effectiveConnectionType: navigator.connection.effectiveType
          }
        : {
              unsupported
          };

    const [networkStatus, setNetworkStatus] = useState(initialNetworkStatus);

    useEffect(() => {
        if (!unsupported) {
            const navigatorConnection = navigator.connection;
            const updateECTStatus = () => {
                setNetworkStatus({
                    effectiveConnectionType: navigatorConnection.effectiveType
                });
            };
            navigatorConnection.addEventListener("change", updateECTStatus); // navigatorConnection.onchange（有值代表网络状态变更）
            return () => {
                navigatorConnection.removeEventListener(
                    "change",
                    updateECTStatus
                );
            };
        }
    }, []);

    return { ...networkStatus, setNetworkStatus };
};

export { useNetworkStatus };
