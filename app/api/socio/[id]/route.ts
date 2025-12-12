import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        const socio = await prisma.socio.findUnique({
            where: { id_socio: id },
        });

        if (!socio) {
            return NextResponse.json({ error: "Socio not found" }, { status: 404 });
        }

        return NextResponse.json(socio);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching socio" },
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
        const updatedSocio = await prisma.socio.update({
            where: { id_socio: id },
            data: data,
        });
        return NextResponse.json(updatedSocio);
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating socio" },
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
        await prisma.socio.delete({
            where: { id_socio: id },
        });
        return NextResponse.json({ message: "Socio deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting socio" },
            { status: 500 }
        );
    }
}
