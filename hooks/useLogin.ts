import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResult {
    success: boolean;
    error?: string;
}

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (username: string, password: string): Promise<LoginResult> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar sesión");
            }

            router.push(`/estado_cuenta/${data.id_socio}`);
            return { success: true };
        } catch (err: any) {
            const errorMessage = err.message || "Ocurrió un error inesperado";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
