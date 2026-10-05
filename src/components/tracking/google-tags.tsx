"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * GA4 y Google Ads (un solo gtag.js) y Meta Pixel se cargan con la PRIMERA
 * interacción del visitante (toque, clic, tecla o scroll), no al cargar la
 * página. Receta de la red (Airline y Corazón y Vida): en móvil sumaban
 * segundos de bloqueo del hilo principal (TBT 4,4 s en la home de Gessner).
 *
 * Coste asumido: quien entra y sale sin tocar ni desplazar nada no se mide.
 * Las conversiones sí: para llamar, escribir o enviar el formulario hay que
 * tocar la página, y ese toque ya dispara la carga. `dataLayer` y `gtag`
 * existen desde el montaje, así que lo que se encole antes se envía al cargar.
 *
 * GTM sigue con `lazyOnload` (tras window.load): sus disparadores tienen que
 * estar escuchando antes del primer toque. CallRail también se queda en
 * `lazyOnload` (layout): cambia el número visible y, si llegara tarde, la
 * llamada de un visitante de Ads iría al número sin rastrear.
 */

const INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll", "wheel"] as const;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

type TagsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Fbq;
  _fbq?: Fbq;
  __tagsLoaded?: boolean;
  __gtagConfigured?: boolean;
};

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadTags(w: TagsWindow, ids: string[], pixelId: string | undefined) {
  if (w.__tagsLoaded) return;
  w.__tagsLoaded = true;

  // Los `config` van aquí y no al montar: GTM (lazyOnload) procesa los
  // comandos `config` que ve en dataLayer y descarga gtag.js por su cuenta, así
  // que encolarlos antes anulaba la espera a la interacción.
  if (w.gtag && !w.__gtagConfigured) {
    w.__gtagConfigured = true;
    w.gtag("js", new Date());
    for (const id of ids) w.gtag("config", id);
  }
  if (ids[0]) loadScript(`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`);

  if (pixelId && !w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", pixelId);
    fbq("track", "PageView");
  }
}

type Props = {
  gaId: string;
  adsId: string;
  pixelId: string;
  gtmId: string;
};

export function GoogleTags({ gaId, adsId, pixelId, gtmId }: Props) {
  useEffect(() => {
    const w = window as TagsWindow;
    // gtag.js se carga con el ID de GA4 (responde 200); Ads va por su `config`.
    const ids = [gaId, adsId].filter(Boolean);
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function gtag() {
        // gtag.js espera el objeto `arguments`, no un array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
    }
    if (w.__tagsLoaded) return;

    const onFirstInteraction = () => {
      for (const e of INTERACTION_EVENTS) window.removeEventListener(e, onFirstInteraction);
      loadTags(w, ids, pixelId);
    };
    for (const e of INTERACTION_EVENTS) {
      window.addEventListener(e, onFirstInteraction, { once: true, passive: true });
    }
    return () => {
      for (const e of INTERACTION_EVENTS) window.removeEventListener(e, onFirstInteraction);
    };
  }, [gaId, adsId, pixelId]);

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
      </Script>
      <Script id="gtm-src" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} />
    </>
  );
}
