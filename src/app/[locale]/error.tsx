"use client";

import { useEffect } from "react";
import { WarningCircle, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="size-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <WarningCircle className="size-10 text-red-600" weight="fill" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Algo salió mal
        </h2>
        <p className="text-muted-foreground mb-6">
          Lo sentimos, ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
        <Button onClick={reset} size="lg">
          <ArrowCounterClockwise className="size-5 mr-2" />
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
