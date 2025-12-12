import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const usuarioRoles = await prisma.usuario_rol.findMany();
        return NextResponse.json(usuarioRoles);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching usuario_rol" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newUsuarioRol = await prisma.usuario_rol.create({
            data: data,
        });
        return NextResponse.json(newUsuarioRol, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creando usuario_rol" },
            { status: 500 }
        );
    }
}
