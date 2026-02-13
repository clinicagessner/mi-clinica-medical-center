import type { Metadata } from "next";
import Link from "next/link";
import { House, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página No Encontrada",
  description: "La página que buscas no existe o ha sido movida.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MagnifyingGlass className="size-10 text-primary" weight="bold" />
        </div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground mb-6">
          La página que buscas no existe o ha sido movida. Te invitamos a
          regresar al inicio.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <House className="size-5 mr-2" weight="fill" />
            Volver al Inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
