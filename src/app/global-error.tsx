"use client";

// Último recurso para errores que escapan del layout de [locale].
// Debe renderizar <html>/<body> porque reemplaza al root layout.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <div>
            <h1>Algo salió mal / Something went wrong</h1>
            {error.digest && <p style={{ opacity: 0.6 }}>Ref: {error.digest}</p>}
            <button
              onClick={reset}
              style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", cursor: "pointer" }}
            >
              Intentar de nuevo / Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
