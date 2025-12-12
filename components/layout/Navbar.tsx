import Link from "next/link";

interface NavbarProps {
    userName?: string;
}

export function Navbar({ userName = "Usuario" }: NavbarProps) {
    return (
        <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
                <div className="text-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="5" r="3" />
                        <line x1="12" y1="22" x2="12" y2="8" />
                        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                    </svg>
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight">Club Náutico Atenas</h1>
                    <p className="text-xs text-blue-200">Portal de Socios</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>{userName}</span>
                </div>
                <Link href="/" className="hover:bg-blue-800 p-2 rounded-full transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </Link>
            </div>
        </nav>
    );
}
