import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md shadow-blue-500/30 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
