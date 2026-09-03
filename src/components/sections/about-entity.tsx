import { getTranslations } from "next-intl/server";

// Bloque de definición de la entidad: un solo párrafo con hechos verificables
// (qué es, dónde está, horario, condiciones, idiomas, servicios, contacto).
// Es el texto que un motor de IA puede citar tal cual, por eso va sin
// adjetivos y en HTML plano renderizado en servidor.
export async function AboutEntity() {
  const t = await getTranslations("aboutEntity");

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("text")}
          </p>
        </div>
      </div>
    </section>
  );
}
