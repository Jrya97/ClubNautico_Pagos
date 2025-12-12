import { Navbar } from "@/components/layout/Navbar";
import { SummaryCards } from "@/components/estado_cuenta/SummaryCards";
import { AccountTable } from "@/components/estado_cuenta/AccountTable";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EstadoCuentaPage({ params }: PageProps) {
    const { id: idParam } = await params;
    const idSocio = parseInt(idParam);

    if (isNaN(idSocio)) {
        return notFound();
    }
    const socio = await prisma.socio.findUnique({
        where: { id_socio: idSocio },
        include: {
            persona: true,
        },
    });

    if (!socio) {
        return notFound();
    }

    const nombreCompleto = `${socio.persona.nombres} ${socio.persona.apellidos}`;

    const documentos = await prisma.documento_pago.findMany({
        where: { id_socio: idSocio },
        orderBy: {
            fecha_emision: "desc",
        },
    });


    const totalPendiente = documentos
        .filter((doc) => doc.id_estado === 1)
        .reduce((sum, doc) => sum + Number(doc.total), 0);

    const totalPagado = documentos
        .filter((doc) => doc.id_estado === 2)
        .reduce((sum, doc) => sum + Number(doc.total), 0);

    const totalGeneral = totalPendiente + totalPagado;

    const pagos = documentos.map((doc) => ({
        id: doc.id_documento,
        periodo: `${getMonthName(doc.mes)}-${doc.periodo}`,
        fechaEmision: new Date(doc.fecha_emision).toLocaleDateString("es-PE"),
        total: Number(doc.total),
        estado: (doc.id_estado === 1 ? "Pendiente" : "Pagado") as
            | "Pendiente"
            | "Pagado",
    }));

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar userName={nombreCompleto} />

            <main className="max-w-7xl mx-auto px-8 py-8">
                <h2 className="text-xl font-bold text-blue-900 mb-1">
                    Estado de Cuenta
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                    Gestione sus pagos y consulte su historial
                </p>

                <AccountTable pagos={pagos} />

                <div className="mt-8">
                    <SummaryCards
                        totalPendiente={totalPendiente}
                        totalPagado={totalPagado}
                        totalGeneral={totalGeneral}
                    />
                </div>
            </main>
        </div>
    );
}

function getMonthName(month: number): string {
    const months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];
    return months[month - 1] || "";
}
