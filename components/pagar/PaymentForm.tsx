"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface PaymentFormProps {
    idDocumento: number;
    idSocio: number;
}

export function PaymentForm({ idDocumento, idSocio }: PaymentFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/documento_pago/${idDocumento}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_estado: 2,
                    fecha_pago: new Date(),
                }),
            });

            if (!res.ok) {
                throw new Error("Error procesando pago");
            }

            router.push(`/estado_cuenta/${idSocio}/recibo/${idDocumento}`);
        } catch (error) {
            console.error(error);
            alert("Hubo un error al procesar el pago. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full">
            <div className="flex items-center gap-2 mb-6 text-blue-800">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <h3 className="font-medium">Datos de Tarjeta</h3>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                <Input
                    label="Número de Tarjeta"
                    placeholder="1234 5678 9012 3456"
                    className="mb-4"
                />

                <Input
                    label="Nombre del Titular"
                    placeholder="NOMBRE COMPLETO"
                    className="mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Fecha de Expiración"
                        placeholder="MM/AA"
                    />
                    <Input
                        label="CVV"
                        placeholder="123"
                    />
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="active:scale-95 transition-transform w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50"
                    >
                        {loading ? (
                            <span>Procesando...</span>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Procesar Pago
                            </>
                        )}
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-400 mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    <span className="text-xs">Pago Seguro SSL</span>
                </div>
            </form>
        </Card>
    );
}
