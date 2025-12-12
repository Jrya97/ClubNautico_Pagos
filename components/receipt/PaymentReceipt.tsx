"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

interface Detalle {
    descripcion: string;
    cantidad: number;
    precioUnit: number;
    importe: number;
}

interface PaymentReceiptProps {
    reciboNo: string;
    fecha: string;
    socio: {
        nombre: string;
        dni: string;
        numero: string;
        email: string;
    };
    items: Detalle[];
    subtotal: number;
    igv: number;
    total: number;
    metodoPago: string;
    estado: string;
    idSocio: number;
}

export function PaymentReceipt({
    reciboNo,
    fecha,
    socio,
    items,
    subtotal,
    igv,
    total,
    metodoPago,
    estado,
    idSocio,
}: PaymentReceiptProps) {
    const formatCurrency = (val: number) => `S/ ${val.toFixed(2)}`;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-3xl mx-auto bg-gray-50 min-h-screen py-8 print:bg-white print:p-0">
            <style jsx global>{`
                @media print {
                    @page { margin: 0; }
                    body { background: white; }
                    .no-print { display: none !important; }
                }
            `}</style>

            <div className="bg-white border border-green-400 rounded-lg p-6 mb-8 text-center shadow-sm mx-4 no-print">
                <div className="flex justify-center mb-2">
                    <div className="h-12 w-12 rounded-full border-2 border-green-500 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-green-600 font-medium text-lg mb-1">
                    ¡Pago Procesado Exitosamente!
                </h2>
                <p className="text-green-600 text-sm">
                    Su pago ha sido registrado correctamente
                </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4 print:shadow-none print:mx-0 print:border print:border-gray-200">
                <div className="bg-blue-900 text-white p-8 flex justify-between items-start print:bg-white print:text-black">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white print:text-blue-900"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <div>
                                <h1 className="text-xl font-bold leading-none">
                                    Club Náutico Atenas
                                </h1>
                                <p className="text-blue-300 text-xs mt-1 print:text-gray-600">
                                    Marina & Yacht Club
                                </p>
                            </div>
                        </div>
                        <div className="text-xs text-blue-200 space-y-1 print:text-gray-600">
                            <p>Av. Marina Club 123, Callao</p>
                            <p>Tel: (01) 123-4567</p>
                            <p>RUC: 20123456789</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-white text-blue-900 px-4 py-2 rounded text-center mb-2 print:border print:border-gray-300">
                            <p className="text-xs font-bold uppercase">Recibo</p>
                            <p className="text-sm font-mono">{reciboNo}</p>
                        </div>
                        <p className="text-xs text-blue-200 print:text-gray-600">Fecha: {fecha}</p>
                    </div>
                </div>

                <div className="p-8 border-b border-gray-100 bg-gray-50/30 print:bg-white">
                    <h3 className="text-sm font-bold text-gray-700 mb-4">
                        Datos del Socio
                    </h3>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Nombre:</p>
                            <p className="font-medium text-gray-800">{socio.nombre}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Nº de Socio:</p>
                            <p className="font-medium text-gray-800">{socio.numero}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">DNI:</p>
                            <p className="font-medium text-gray-800">{socio.dni}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Email:</p>
                            <p className="font-medium text-gray-800">{socio.email}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <h3 className="text-sm font-bold text-gray-700 mb-4">
                        Detalle de Items
                    </h3>
                    <table className="w-full text-sm mb-8">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-bold text-gray-600">
                                    Descripción
                                </th>
                                <th className="text-right py-2 font-bold text-gray-600">
                                    Cantidad
                                </th>
                                <th className="text-right py-2 font-bold text-gray-600">
                                    Precio Unit.
                                </th>
                                <th className="text-right py-2 font-bold text-gray-600">
                                    Importe
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-50">
                                    <td className="py-4 text-gray-800">
                                        <p className="font-medium">{item.descripcion}</p>
                                    </td>
                                    <td className="py-4 text-right text-gray-600">
                                        {item.cantidad}
                                    </td>
                                    <td className="py-4 text-right text-gray-600">
                                        {formatCurrency(item.precioUnit)}
                                    </td>
                                    <td className="py-4 text-right text-gray-800 font-medium">
                                        {formatCurrency(item.importe)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end mb-8">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal:</span>
                                <span className="text-gray-800 font-medium">
                                    {formatCurrency(subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
                                <span className="text-gray-500">IGV (18%):</span>
                                <span className="text-gray-800 font-medium">
                                    {formatCurrency(igv)}
                                </span>
                            </div>
                            <div className="flex justify-between text-base pt-1">
                                <span className="text-blue-900 font-bold">Total:</span>
                                <span className="text-blue-900 font-bold">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center text-xs print:bg-white print:border print:border-gray-100">
                        <div>
                            <p className="text-gray-500 mb-1">Método de Pago:</p>
                            <p className="font-medium text-gray-800">{metodoPago}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Estado:</p>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium print:bg-transparent print:text-black print:border print:border-black">
                                {estado}
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-6">
                        Gracias por su preferencia. Este comprobante es válido como
                        constancia de pago.
                    </p>
                </div>
            </div>

            <div className="flex gap-4 mt-8 mx-4 max-w-3xl no-print">
                <Button
                    onClick={handlePrint}
                    className="w-[60%] bg-blue-50 text-blue-900 border border-blue-900 hover:bg-white hover:text-blue-900 flex items-center justify-center gap-2"
                >
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Descargar / Imprimir Recibo
                </Button>
                <Link href={`/estado_cuenta/${idSocio}`} className="w-[40%]">
                    <Button className="w-full bg-blue-900 hover:bg-blue-800 flex items-center justify-center gap-2">
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
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Volver al Inicio
                    </Button>
                </Link>
            </div>
        </div>
    );
}
