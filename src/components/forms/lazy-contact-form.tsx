"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Formulario de contacto diferido (§12 B4): react-hook-form, zod y el envío
// solo se descargan cuando el visitante se acerca al formulario (400 px antes),
// no al cargar la página.
const ContactForm = dynamic(() => import("./contact-form").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <div className="min-h-[560px]" aria-hidden="true" />,
});

export function LazyContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return <div ref={ref}>{visible ? <ContactForm /> : <div className="min-h-[560px]" aria-hidden="true" />}</div>;
}
