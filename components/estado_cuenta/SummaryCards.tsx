interface SummaryCardsProps {
    totalPendiente: number;
    totalPagado: number;
    totalGeneral: number;
}

export function SummaryCards({
    totalPendiente,
    totalPagado,
    totalGeneral,
}: SummaryCardsProps) {
    const formatCurrency = (val: number) => `S/ ${val.toFixed(2)}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                    Total Pendiente
                </h3>
                <p className="text-red-500 text-xl font-bold">
                    {formatCurrency(totalPendiente)}
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                    Total Pagado
                </h3>
                <p className="text-green-500 text-xl font-bold">
                    {formatCurrency(totalPagado)}
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                    Total General
                </h3>
                <p className="text-blue-600 text-xl font-bold">
                    {formatCurrency(totalGeneral)}
                </p>
            </div>
        </div>
    );
}
