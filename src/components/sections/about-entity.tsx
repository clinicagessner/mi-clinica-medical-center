import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

// Bloque de definición de la entidad ("¿Qué es…?", §12 B1): un párrafo de
// hechos verificables (qué es, dónde está, horario, pago, idiomas, servicios,
// contacto) con enlaces a los servicios clave. Es el texto que un motor de IA
// puede citar tal cual: sin adjetivos y en HTML renderizado en servidor.
export async function AboutEntity() {
  const t = await getTranslations("aboutEntity");
  const locale = await getLocale();
  const prefix = locale === "es" ? "" : `/${locale}`;
  const link = (slug: string) => {
    const LinkTo = (chunks: React.ReactNode) => (
      <Link href={`${prefix}/services/${slug}`} className="text-primary font-medium underline underline-offset-2 hover:no-underline">
        {chunks}
      </Link>
    );
    return LinkTo;
  };

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.rich("text", {
              chronic: link("condiciones-cronicas"),
              gyn: link("ginecologia"),
              lab: link("examenes-sangre"),
              i693: link("examenes-inmigracion"),
              dot: link("examen-dot"),
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
