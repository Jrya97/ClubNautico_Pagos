import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const socios = await prisma.socio.findMany();
        return NextResponse.json(socios);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching socios" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newSocio = await prisma.socio.create({
            data: data,
        });
        return NextResponse.json(newSocio, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creando socio" },
            { status: 500 }
        );
    }
}
