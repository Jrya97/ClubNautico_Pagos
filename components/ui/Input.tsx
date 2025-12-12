import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium text-blue-500 text-left">
                {label}
            </label>
            <input
                className={`w-full px-4 py-2 border border-gray-100 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300 ${className}`}
                {...props}
            />
        </div>
    );
}
