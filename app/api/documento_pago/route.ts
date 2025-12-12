import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const documentos = await prisma.documento_pago.findMany();
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
        const newDocumento = await prisma.documento_pago.create({
            data: data,
        });
        return NextResponse.json(newDocumento, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creando documento de pago" },
            { status: 500 }
        );
    }
}
