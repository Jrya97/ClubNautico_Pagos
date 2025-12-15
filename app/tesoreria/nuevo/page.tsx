"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NuevoPagoPage() {
    const router = useRouter();
    const [socios, setSocios] = useState<any[]>([]);
    const [rubros, setRubros] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        id_socio: "",
        periodo: new Date().getFullYear(),
        mes: new Date().getMonth() + 1,
        observaciones: "",
    });

    const [items, setItems] = useState<any[]>([
        { id_rubro: "", monto: 0, cantidad: 1 }
    ]);

    useEffect(() => {
        fetch("/api/socio")
            .then((res) => res.json())
            .then((data) => setSocios(data))
            .catch((err) => console.error("Error fetching socios:", err));

        fetch("/api/rubro")
            .then((res) => res.json())
            .then((data) => setRubros(data))
            .catch((err) => console.error("Error fetching rubros:", err));
    }, []);

    const handleItemChange = (index: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[index][field] = value;

        if (field === "id_rubro") {
            const selectedRubro = rubros.find(r => r.id_rubro.toString() === value);
            if (selectedRubro) {
                newItems[index].monto = Number(selectedRubro.monto_base);
            }
        }

        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id_rubro: "", monto: 0, cantidad: 1 }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + (Number(item.monto) * Number(item.cantidad)), 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.id_socio) {
            setError("Debe seleccionar un socio");
            setLoading(false);
            return;
        }

        if (items.some(i => !i.id_rubro)) {
            setError("Todos los ítems deben tener un rubro seleccionado");
            setLoading(false);
            return;
        }

        try {
            const total = calculateTotal();
            const payload = {
                id_socio: Number(formData.id_socio),
                periodo: Number(formData.periodo),
                mes: Number(formData.mes),
                total: total,
                subtotal: total,
                id_estado: 1,
                fecha_emision: new Date(),
                observaciones: formData.observaciones,
                detalle_consumo: {
                    create: items.map(item => ({
                        id_rubro: Number(item.id_rubro),
                        id_socio: Number(formData.id_socio),
                        monto: Number(item.monto),
                        cantidad: Number(item.cantidad),
                        fecha_consumo: new Date()
                    }))
                }
            };

            const res = await fetch("/api/documento_pago", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al crear documento");
            }

            router.push("/tesoreria");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
            <div className="max-w-5xl w-full">
                <div className="mb-8 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al Panel
                    </button>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Registrar Nuevo Pago
                    </h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                        <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Detalles del Documento</p>
                        <h2 className="text-white text-xl font-semibold mt-1">Información General</h2>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r shadow-sm flex items-start">
                                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="font-bold">Error</p>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Socio</label>
                                    <div className="relative">
                                        <select
                                            className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50 transition-colors hover:bg-white"
                                            value={formData.id_socio}
                                            onChange={(e) => setFormData({ ...formData, id_socio: e.target.value })}
                                            required
                                        >
                                            <option value="">Seleccione un socio...</option>
                                            {socios.map(s => (
                                                <option key={s.id_socio} value={s.id_socio}>
                                                    {s.persona.nombres} {s.persona.apellidos}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Periodo</label>
                                    <input
                                        type="number"
                                        className="block w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-50"
                                        value={formData.periodo}
                                        onChange={(e) => setFormData({ ...formData, periodo: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mes</label>
                                    <select
                                        className="block w-full pl-3 pr-10 py-3 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50"
                                        value={formData.mes}
                                        onChange={(e) => setFormData({ ...formData, mes: Number(e.target.value) })}
                                        required
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                            <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('es-ES', { month: 'long' })}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Conceptos de Pago</h3>
                                        <p className="text-sm text-gray-500">Agregue los rubros que conformarán este documento.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Agregar Rubro
                                    </button>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Concepto / Rubro</th>
                                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Precio Unit.</th>
                                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-32">Cantidad</th>
                                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Subtotal</th>
                                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-20"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {items.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <select
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
                                                            value={item.id_rubro}
                                                            onChange={(e) => handleItemChange(index, "id_rubro", e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Seleccione rubro...</option>
                                                            {rubros.map(r => (
                                                                <option key={r.id_rubro} value={r.id_rubro}>
                                                                    {r.concepto}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="relative rounded-md shadow-sm">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <span className="text-gray-500 sm:text-sm">S/</span>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                className="block w-full pl-8 pr-12 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md text-right py-2"
                                                                value={item.monto}
                                                                onChange={(e) => handleItemChange(index, "monto", Number(e.target.value))}
                                                                required
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md text-right py-2"
                                                            value={item.cantidad}
                                                            onChange={(e) => handleItemChange(index, "cantidad", Number(e.target.value))}
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                                                        S/ {(Number(item.monto) * Number(item.cantidad)).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(index)}
                                                            className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                                                            disabled={items.length === 1}
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td colSpan={3} className="px-6 py-4 text-right text-sm font-bold text-gray-500 uppercase">Total Estimado</td>
                                                <td className="px-6 py-4 text-right text-xl font-bold text-blue-600">
                                                    S/ {calculateTotal().toFixed(2)}
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="pt-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Comentarios / Observaciones</label>
                                <textarea
                                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-4 bg-gray-50"
                                    rows={3}
                                    placeholder="Agregue notas adicionales sobre este pago..."
                                    value={formData.observaciones}
                                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-8 px-4 sm:px-0">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                >
                                    Cancelar Operación
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </span>
                                    ) : (
                                        "Generar Documento de Pago"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
