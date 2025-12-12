interface Detalle {
    concepto: string;
    monto: number;
}

interface PaymentSummaryProps {
    periodo: string;
    fechaEmision: string;
    estado: string;
    detalles: Detalle[];
    total: number;
}

export function PaymentSummary({
    periodo,
    fechaEmision,
    estado,
    detalles,
    total,
}: PaymentSummaryProps) {
    const formatCurrency = (val: number) => `S/ ${val.toFixed(2)}`;

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-blue-900 font-bold mb-6">Resumen del Pago</h3>

                <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Periodo:</span>
                        <span className="font-medium text-gray-900">{periodo}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Fecha de Emisión:</span>
                        <span className="font-medium text-gray-900">{fechaEmision}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Estado:</span>
                        <span className="text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded text-xs">{estado}</span>
                    </div>
                </div>

                <div className="mt-8 bg-blue-50/50 p-4 rounded-lg">
                    <h4 className="text-blue-900 font-bold text-sm mb-4">Detalle de Cobro</h4>
                    <div className="space-y-3 mb-4">
                        {detalles.map((detalle, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-600">
                                <span>{detalle.concepto}</span>
                                <span>{formatCurrency(detalle.monto)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total a Pagar</span>
                        <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
                    </div>
                </div>

                <div className="mt-6 bg-green-50 border border-green-100 p-3 rounded flex items-start gap-3">
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
                        className="text-green-600 mt-0.5"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <p className="text-xs text-green-700 leading-snug">
                        Sus datos están protegidos con encriptación SSL de 256 bits
                    </p>
                </div>
            </div>
        </div>
    );
}
