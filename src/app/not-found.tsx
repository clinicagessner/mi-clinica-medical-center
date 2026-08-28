import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// Este not-found vive fuera de [locale] y renderiza su propio <html>/<body>.
// Se usa cuando el layout de [locale] llama notFound() (p. ej. rutas de bots como
// /.env o /wp-login.php que saltan el middleware): ahí el not-found interno no está
// disponible y, sin este archivo, Next intentaba servir pages/500.html y fallaba con 500.
export const metadata: Metadata = {
  title: "Página no encontrada | Clínica Hispana Houston",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="antialiased">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Página no encontrada
            </h2>
            <p className="text-muted-foreground mb-2">
              La página que buscas no existe o fue movida.
            </p>
            <p className="text-muted-foreground mb-6">
              The page you are looking for does not exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold"
            >
              Volver al inicio / Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
