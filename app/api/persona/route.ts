import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const personas = await prisma.persona.findMany();
        return NextResponse.json(personas);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching personas" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newPersona = await prisma.persona.create({
            data: data,
        });
        return NextResponse.json(newPersona, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creando persona" },
            { status: 500 }
        );
    }
}
