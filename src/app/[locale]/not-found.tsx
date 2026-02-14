import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { House, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  const t = await getTranslations("errors");
  return {
    title: t("notFoundTitle"),
    description: t("notFoundDescription"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MagnifyingGlass className="size-10 text-primary" weight="bold" />
        </div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          {t("notFoundTitle")}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t("notFoundDescription")}
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <House className="size-5 mr-2" weight="fill" />
            {t("backHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
