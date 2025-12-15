import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const documentos = await prisma.documento_pago.findMany({
            include: {
                socio: {
                    include: {
                        persona: true
                    }
                },
                cfg_estado_documento: true,
                detalle_consumo: {
                    include: {
                        rubro: true
                    }
                }
            },
            orderBy: {
                id_documento: 'desc'
            }
        });
        return NextResponse.json(documentos);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching documentos de pago" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const estadoPendiente = await prisma.cfg_estado_documento.findFirst({
            where: { nombre: "Pendiente" }
        });

        const idEstado = estadoPendiente ? estadoPendiente.id_estado : 1;

        const existing = await prisma.documento_pago.findFirst({
            where: {
                id_socio: Number(data.id_socio),
                periodo: Number(data.periodo),
                mes: Number(data.mes)
            }
        });

        if (existing) {
            return NextResponse.json(
                { error: `Ya existe un documento para el Socio en el periodo ${data.periodo}-${data.mes}` },
                { status: 400 }
            );
        }

        const payload = { ...data, id_estado: idEstado };

        const newDocumento = await prisma.documento_pago.create({
            data: payload,
        });
        return NextResponse.json(newDocumento, { status: 201 });
    } catch (error: any) {
        console.error("Error creating documento_pago:", JSON.stringify(error, null, 2));
        return NextResponse.json(
            { error: error.message || "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}
