import * as Network from "expo-network";
import { useEffect } from "react";
import { Alert } from "react-native";

export function useNetworkAlert() {
    useEffect(() => {
        let lastStatus: boolean | null = null;

        const checkConnection = async () => {
            const state = await Network.getNetworkStateAsync();
            const isConnected = !!state.isConnected;

            // Solo dispara la alerta cuando pasa de conectado → desconectado
            if (lastStatus === true && isConnected === false) {
                Alert.alert("Sin conexión", "El dispositivo perdió la conexión a internet.");
            }

            lastStatus = isConnected;
        };

        // Primera verificación
        checkConnection();

        // Escucha cambios de red
        const interval = setInterval(checkConnection, 2000);

        return () => clearInterval(interval);
    }, []);
}
