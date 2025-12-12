"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function LoginForm() {
    return (
        <Card className="text-center">
            <div className="flex justify-center mb-6">
                <div className="bg-blue-700  p-3 rounded-full shadow-lg shadow-blue-500/40">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <circle cx="12" cy="5" r="3" />
                        <line x1="12" y1="22" x2="12" y2="8" />
                        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                    </svg>
                </div>
            </div>

            <h1 className="text-blue-700 font-medium text-lg mb-1">
                Club Náutico Atenas
            </h1>
            <h2 className="text-blue-800 text-sm mb-8 font-light">
                Sistema de Gestión de Socios
            </h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <Input
                    label="Usuario"
                    placeholder="Ingrese su usuario"
                    type="text"
                    className="mb-2"
                />
                <Input
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    type="password"
                    className="mb-6"
                />

                <Button type="submit" className="active:scale-95 transition-transform">Ingresar</Button>

                <div className="mt-6">
                    <a
                        href="#"
                        className="text-blue-400 text-sm hover:text-blue-600 transition-colors font-light"
                    >
                        ¿Olvidó su contraseña?
                    </a>
                </div>
            </form>
        </Card>
    );
}
