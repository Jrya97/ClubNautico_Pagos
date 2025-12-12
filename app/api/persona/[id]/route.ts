import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const persona = await prisma.persona.findUnique({
            where: { id_persona: id },
        });

        if (!persona) {
            return NextResponse.json({ error: "Persona no encontrada" }, { status: 404 });
        }

        return NextResponse.json(persona);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching persona" },
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
        const updatedPersona = await prisma.persona.update({
            where: { id_persona: id },
            data: data,
        });
        return NextResponse.json(updatedPersona);
    } catch (error) {
        return NextResponse.json(
            { error: "Error actualizando persona" },
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
        await prisma.persona.delete({
            where: { id_persona: id },
        });
        return NextResponse.json({ message: "Persona eliminada exitosamente" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error eliminando persona" },
            { status: 500 }
        );
    }
}
