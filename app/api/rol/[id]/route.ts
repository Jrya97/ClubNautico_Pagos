import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const rol = await prisma.rol.findUnique({
            where: { id_rol: id },
        });

        if (!rol) {
            return NextResponse.json({ error: "Rol not found" }, { status: 404 });
        }

        return NextResponse.json(rol);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching rol" },
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
        const updatedRol = await prisma.rol.update({
            where: { id_rol: id },
            data: data,
        });
        return NextResponse.json(updatedRol);
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating rol" },
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
        await prisma.rol.delete({
            where: { id_rol: id },
        });
        return NextResponse.json({ message: "Rol deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting rol" },
            { status: 500 }
        );
    }
}
