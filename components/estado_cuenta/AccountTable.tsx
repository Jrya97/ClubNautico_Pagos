import { Button } from "../ui/Button";

interface Pago {
    id: number;
    periodo: string; // "Dic-2025"
    fechaEmision: string; // "01/12/2025"
    total: number;
    estado: "Pendiente" | "Pagado";
}

interface AccountTableProps {
    pagos: Pago[];
}

export function AccountTable({ pagos }: AccountTableProps) {
    const formatCurrency = (val: number) => `S/ ${val.toFixed(2)}`;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-blue-900 text-white text-sm">
                        <tr>
                            <th className="px-6 py-4 font-medium">Periodo</th>
                            <th className="px-6 py-4 font-medium">Fecha Emisión</th>
                            <th className="px-6 py-4 font-medium">Total (S/.)</th>
                            <th className="px-6 py-4 font-medium">Estado</th>
                            <th className="px-6 py-4 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-sm">
                        {pagos.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-8 text-center text-gray-400"
                                >
                                    No hay registros de pagos.
                                </td>
                            </tr>
                        ) : (
                            pagos.map((pago, index) => (
                                <tr
                                    key={pago.id}
                                    className={`border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors cursor-default`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {pago.periodo}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {pago.fechaEmision}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {formatCurrency(pago.total)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${pago.estado === "Pendiente"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            {pago.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {pago.estado === "Pendiente" ? (
                                            <Button className="w-auto px-6 py-1.5 text-xs bg-blue-800 hover:bg-blue-900 shadow-none">
                                                PAGAR
                                            </Button>
                                        ) : (
                                            <button className="text-blue-700 px-4 py-1.5 rounded border border-blue-700 text-xs hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <line x1="16" y1="13" x2="8" y2="13" />
                                                    <line x1="16" y1="17" x2="8" y2="17" />
                                                    <polyline points="10 9 9 9 8 9" />
                                                </svg>
                                                Ver Recibo
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
