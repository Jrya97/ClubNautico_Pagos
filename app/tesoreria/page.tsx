"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

export default function TesoreriaPage() {
    const [pagos, setPagos] = React.useState<any[]>([]);
    const [socios, setSocios] = React.useState<any[]>([]);
    const [filterSocio, setFilterSocio] = React.useState("");
    const [selectedPago, setSelectedPago] = React.useState<any | null>(null);

    React.useEffect(() => {
        fetch("/api/socio")
            .then((res) => res.json())
            .then((data) => setSocios(data))
            .catch((err) => console.error("Error fetching socios:", err));

        fetch("/api/documento_pago")
            .then((res) => res.json())
            .then((data) => setPagos(data))
            .catch((err) => console.error("Error fetching pagos:", err));
    }, []);

    const filteredPagos = filterSocio
        ? pagos.filter((p) => p.id_socio.toString() === filterSocio)
        : pagos;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tesorería</h1>
                        <span className="text-sm text-gray-500">Panel de Administración</span>
                    </div>
                    <a
                        href="/tesoreria/nuevo"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nuevo Documento
                    </a>
                </div>
                <div className="flex justify-end px-4 sm:px-6 lg:px-8 pb-4">
                    <button
                        onClick={async () => {
                            await fetch("/api/auth/logout", { method: "POST" });
                            window.location.href = "/";
                        }}
                        className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 border-l-4 border-blue-500">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Pagos Pendientes</h2>
                        <div className="mt-4 text-3xl font-bold text-blue-600">
                            {pagos.filter(p => p.cfg_estado_documento?.nombre === 'Pendiente').length}
                        </div>
                    </Card>
                    <Card className="p-6 border-l-4 border-green-500">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Ingresos del Mes</h2>
                        <div className="mt-4 text-3xl font-bold text-green-600">
                            S/ {pagos
                                .filter(p => new Date(p.fecha_emision).getMonth() === new Date().getMonth())
                                .reduce((acc, curr) => acc + Number(curr.total), 0).toFixed(2)}
                        </div>
                    </Card>
                    <Card className="p-6 border-l-4 border-purple-500">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Documentos</h2>
                        <div className="mt-4 text-3xl font-bold text-purple-600">{pagos.length}</div>
                    </Card>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Listado de Pagos</h3>
                        <div className="flex items-center gap-2">
                            <label htmlFor="socioFilter" className="text-sm font-medium text-gray-700">Filtrar por Socio:</label>
                            <select
                                id="socioFilter"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={filterSocio}
                                onChange={(e) => setFilterSocio(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {socios.map((s) => (
                                    <option key={s.id_socio} value={s.id_socio}>
                                        {s.persona.nombres} {s.persona.apellidos}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Socio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPagos.map((p) => (
                                    <tr key={p.id_documento} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{p.id_documento}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {p.socio?.persona?.nombres} {p.socio?.persona?.apellidos}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.periodo} - {p.mes}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S/ {Number(p.total).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${p.cfg_estado_documento?.nombre === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {p.cfg_estado_documento?.nombre || 'Desconocido'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => setSelectedPago(p)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Ver Detalles
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPagos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No se encontraron documentos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedPago && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Detalle del Documento #{selectedPago.id_documento}
                                </h3>
                                <button
                                    onClick={() => setSelectedPago(null)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Socio</p>
                                        <p className="font-medium">{selectedPago.socio?.persona?.nombres} {selectedPago.socio?.persona?.apellidos}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Estado</p>
                                        <p className="font-medium">{selectedPago.cfg_estado_documento?.nombre}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha Emisión</p>
                                        <p>{new Date(selectedPago.fecha_emision).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Periodo</p>
                                        <p>{selectedPago.periodo} - {selectedPago.mes}</p>
                                    </div>
                                </div>

                                <h4 className="font-medium text-gray-900 mb-3 border-b pb-1">Detalle de Consumo</h4>
                                <table className="min-w-full divide-y divide-gray-200 mb-4">
                                    <thead>
                                        <tr>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                                            <th className="text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedPago.detalle_consumo?.map((d: any) => (
                                            <tr key={d.id_detalle}>
                                                <td className="py-2 text-sm text-gray-900">
                                                    {d.rubro?.concepto || d.descripcion}
                                                </td>
                                                <td className="py-2 text-sm text-gray-900 text-right">
                                                    S/ {Number(d.monto).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t border-gray-200 font-semibold">
                                            <td className="py-2 text-sm text-gray-900 text-right">Total</td>
                                            <td className="py-2 text-sm text-gray-900 text-right">
                                                S/ {Number(selectedPago.total).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>

                                {selectedPago.observaciones && (
                                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Observaciones:</strong> {selectedPago.observaciones}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    onClick={() => setSelectedPago(null)}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
