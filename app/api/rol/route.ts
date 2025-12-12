import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const roles = await prisma.rol.findMany();
        return NextResponse.json(roles);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching roles" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newRol = await prisma.rol.create({
            data: data,
        });
        return NextResponse.json(newRol, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creando rol" },
            { status: 500 }
        );
    }
}
