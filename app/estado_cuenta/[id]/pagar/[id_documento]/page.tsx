import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { PaymentForm } from "@/components/pagar/PaymentForm";
import { PaymentSummary } from "@/components/pagar/PaymentSummary";

interface PageProps {
    params: Promise<{
        id: string;
        id_documento: string;
    }>;
}

export default async function PaymentPage({ params }: PageProps) {
    const { id: idSocioParam, id_documento: idDocParam } = await params;
    const idSocio = parseInt(idSocioParam);
    const idDocumento = parseInt(idDocParam);

    if (isNaN(idSocio) || isNaN(idDocumento)) {
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

    const documento = await prisma.documento_pago.findUnique({
        where: { id_documento: idDocumento },
        include: {
            detalle_consumo: {
                include: {
                    rubro: true,
                }
            }
        },
    });

    if (!documento) {
        return notFound();
    }

    if (documento.id_socio !== idSocio) {
        return notFound();
    }

    const nombreCompleto = `${socio.persona.nombres} ${socio.persona.apellidos}`;
    const periodo = `${getMonthName(documento.mes)}-${documento.periodo}`;

    const detalles = documento.detalle_consumo.map((detalle) => ({
        concepto: detalle.descripcion || "Concepto General",
        monto: Number(detalle.monto),
    }));

    if (detalles.length === 0) {
        detalles.push({
            concepto: "Servicios del periodo",
            monto: Number(documento.total)
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar userName={nombreCompleto} />

            <div className="bg-blue-900 py-4 px-8 text-white flex justify-between items-center shadow-lg">
                <div>
                    <div className="flex items-center gap-2">
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
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <h2 className="font-bold text-lg">Pasarela de Pago Segura</h2>
                    </div>

                </div>
                <div className="text-sm bg-blue-800 px-4 py-1.5 rounded flex items-center gap-2">
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Conexión Segura
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-8 py-8">
                <Link
                    href={`/estado_cuenta/${idSocio}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors text-sm"
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
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Volver al Estado de Cuenta
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <PaymentForm idDocumento={idDocumento} idSocio={idSocio} />
                    </div>
                    <div>
                        <PaymentSummary
                            periodo={periodo}
                            fechaEmision={new Date(documento.fecha_emision).toLocaleDateString("es-PE")}
                            estado={documento.id_estado === 1 ? "Pendiente" :
                                documento.id_estado === 2 ? "Pagado" : documento.id_estado === 3 ? "Anulado" : "Parcial"}
                            detalles={detalles}
                            total={Number(documento.total)}
                        />
                    </div>
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
