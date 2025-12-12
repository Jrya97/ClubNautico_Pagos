import { LoginForm } from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
