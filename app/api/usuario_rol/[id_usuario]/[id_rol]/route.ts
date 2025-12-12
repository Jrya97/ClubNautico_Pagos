import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id_usuario: string; id_rol: string }> }
) {
    try {
        const { id_usuario: idUsuarioParam, id_rol: idRolParam } = await params;
        const id_usuario = parseInt(idUsuarioParam);
        const id_rol = parseInt(idRolParam);
        const usuarioRol = await prisma.usuario_rol.findUnique({
            where: {
                id_usuario_id_rol: {
                    id_usuario: id_usuario,
                    id_rol: id_rol,
                },
            },
        });

        if (!usuarioRol) {
            return NextResponse.json(
                { error: "Usuario_rol entry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(usuarioRol);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching usuario_rol entry" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id_usuario: string; id_rol: string }> }
) {
    try {
        const { id_usuario: idUsuarioParam, id_rol: idRolParam } = await params;
        const id_usuario = parseInt(idUsuarioParam);
        const id_rol = parseInt(idRolParam);
        await prisma.usuario_rol.delete({
            where: {
                id_usuario_id_rol: {
                    id_usuario: id_usuario,
                    id_rol: id_rol,
                },
            },
        });
        return NextResponse.json({
            message: "Usuario_rol entry deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting usuario_rol entry" },
            { status: 500 }
        );
    }
}
