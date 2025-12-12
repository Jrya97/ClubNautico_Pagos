import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const postulante = await prisma.postulante.findUnique({
            where: { id_postulante: id },
        });

        if (!postulante) {
            return NextResponse.json(
                { error: "Postulante no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(postulante);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching postulante" },
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
        const updatedPostulante = await prisma.postulante.update({
            where: { id_postulante: id },
            data: data,
        });
        return NextResponse.json(updatedPostulante);
    } catch (error) {
        return NextResponse.json(
            { error: "Error actualizando postulante" },
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
        await prisma.postulante.delete({
            where: { id_postulante: id },
        });
        return NextResponse.json({ message: "Postulante eliminado exitosamente" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error eliminando postulante" },
            { status: 500 }
        );
    }
}
