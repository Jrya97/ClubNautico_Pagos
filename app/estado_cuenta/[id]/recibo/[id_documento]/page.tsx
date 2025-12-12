import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { PaymentReceipt } from "@/components/receipt/PaymentReceipt";

interface PageProps {
    params: Promise<{
        id: string;
        id_documento: string;
    }>;
}

export default async function ReceiptPage({ params }: PageProps) {
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
            detalle_consumo: true,
        },
    });

    if (!documento) {
        return notFound();
    }

    if (documento.id_socio !== idSocio) {
        return notFound();
    }

    const nombreCompleto = `${socio.persona.nombres} ${socio.persona.apellidos}`;

    const items = documento.detalle_consumo.map((detalle) => ({
        descripcion: detalle.descripcion || "Servicio General",
        cantidad: detalle.cantidad,
        precioUnit: Number(detalle.monto) / detalle.cantidad,
        importe: Number(detalle.monto),
    }));

    if (items.length === 0) {
        items.push({
            descripcion: `Cuota Período ${documento.mes}-${documento.periodo}`,
            cantidad: 1,
            precioUnit: Number(documento.total),
            importe: Number(documento.total)
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar userName={nombreCompleto} />

            <PaymentReceipt
                reciboNo={`Rec-${documento.id_documento.toString().padStart(6, '0')}`}
                fecha={new Date(documento.fecha_pago || documento.fecha_emision).toLocaleDateString("es-PE")}

                socio={{
                    nombre: nombreCompleto,
                    dni: socio.persona.dni,
                    numero: `SOC-${socio.id_socio.toString().padStart(5, '0')}`,
                    email: socio.persona.correo || "No registrado"
                }}
                items={items}
                subtotal={Number(documento.subtotal)}
                igv={Number(documento.igv)}
                total={Number(documento.total)}
                metodoPago="Tarjeta de Crédito"
                estado={documento.id_estado === 2 ? "Pagado" : "Pendiente"}
                idSocio={idSocio}
            />
        </div>
    );
}
