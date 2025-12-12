import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Usuario y contraseña son obligatorios" },
                { status: 400 }
            );
        }

        const user = await prisma.usuario.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Credencial de usuario es inválida" },
                { status: 401 }
            );
        }

        if (user.password_hash !== password) {
            return NextResponse.json(
                { error: "Credencial de contraseña es inválida" },
                { status: 401 }
            );
        }

        if (!user.activo) {
            return NextResponse.json(
                { error: "Usuario inactivo" },
                { status: 403 }
            );
        }

        const socio = await prisma.socio.findFirst({
            where: { id_usuario: user.id_usuario }
        });

        if (!socio) {
            return NextResponse.json(
                { error: "El usuario no está asociado a un socio activo" },
                { status: 403 }
            );
        }

        const response = NextResponse.json({
            success: true,
            id_socio: socio.id_socio,
            user: {
                id: user.id_usuario,
                username: user.username,
            },
        });

        response.cookies.set("auth_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
