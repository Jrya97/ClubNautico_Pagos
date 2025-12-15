import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const rubros = await prisma.rubro.findMany({
            orderBy: {
                concepto: 'asc'
            }
        });
        return NextResponse.json(rubros);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching rubros" },
            { status: 500 }
        );
    }
}
