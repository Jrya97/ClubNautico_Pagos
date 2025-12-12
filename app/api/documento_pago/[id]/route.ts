import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const documento = await prisma.documento_pago.findUnique({
            where: { id_documento: id },
        });

        if (!documento) {
            return NextResponse.json(
                { error: "Documento de pago not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(documento);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching documento de pago" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const data = await request.json();
        const updatedDocumento = await prisma.documento_pago.update({
            where: { id_documento: id },
            data: data,
        });
        return NextResponse.json(updatedDocumento);
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating documento de pago" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        await prisma.documento_pago.delete({
            where: { id_documento: id },
        });
        return NextResponse.json({
            message: "Documento de pago deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting documento de pago" },
            { status: 500 }
        );
    }
}
