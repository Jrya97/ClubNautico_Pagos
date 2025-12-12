import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white rounded-xl shadow-xl w-full max-w-md p-8 ${className}`}>
            {children}
        </div>
    );
}
