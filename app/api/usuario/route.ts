import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const usuarios = await prisma.usuario.findMany();
        return NextResponse.json(usuarios);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching usuarios" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newUsuario = await prisma.usuario.create({
            data: data,
        });
        return NextResponse.json(newUsuario, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating usuario" },
            { status: 500 }
        );
    }
}
