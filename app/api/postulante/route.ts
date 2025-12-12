import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const postulantes = await prisma.postulante.findMany();
        return NextResponse.json(postulantes);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching postulantes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newPostulante = await prisma.postulante.create({
            data: data,
        });
        return NextResponse.json(newPostulante, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating postulante" },
            { status: 500 }
        );
    }
}
