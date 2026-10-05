import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG } from "@/lib/constants";

function fmt(date: string, locale: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale === "en" ? "en-US" : "es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Caja de revisión médica (§12 B2). Sin nombre y credenciales de un médico
 * responsable, el contenido lo firma el "equipo médico de la clínica" (§9).
 * Las fechas van en `<time datetime>` para que las lean las máquinas.
 */
export function MedicalReview({
  published,
  reviewed,
  locale,
}: {
  published?: string;
  reviewed: string;
  locale: string;
}) {
  const isEn = locale === "en";
  return (
    <aside className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" weight="duotone" aria-hidden="true" />
        <div className="text-sm text-foreground/80">
          <p className="font-semibold text-foreground">{isEn ? "Medical review" : "Revisión médica"}</p>
          <p className="mt-1">
            {isEn
              ? `Written and reviewed by the medical team at ${SITE_CONFIG.name}.`
              : `Redactado y revisado por el equipo médico de ${SITE_CONFIG.name}.`}
          </p>
          <p className="mt-2 text-xs text-foreground/70">
            {published && (
              <>
                {isEn ? "Published:" : "Publicado:"} <time dateTime={published}>{fmt(published, locale)}</time>
                {" · "}
              </>
            )}
            {isEn ? "Last reviewed:" : "Última revisión:"} <time dateTime={reviewed}>{fmt(reviewed, locale)}</time>
          </p>
        </div>
      </div>
    </aside>
  );
}
