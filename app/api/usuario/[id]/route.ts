import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const usuario = await prisma.usuario.findUnique({
            where: { id_usuario: id },
        });

        if (!usuario) {
            return NextResponse.json({ error: "Usuario not found" }, { status: 404 });
        }

        return NextResponse.json(usuario);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching usuario" },
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
        const updatedUsuario = await prisma.usuario.update({
            where: { id_usuario: id },
            data: data,
        });
        return NextResponse.json(updatedUsuario);
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating usuario" },
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
        await prisma.usuario.delete({
            where: { id_usuario: id },
        });
        return NextResponse.json({ message: "Usuario deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting usuario" },
            { status: 500 }
        );
    }
}
