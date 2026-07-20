import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Clock, Gift, MessageCircle, Heart } from "lucide-react";
import heroAnimals from "@/assets/hero-animals.png";
import babyGiraffe from "@/assets/baby-giraffe.png";
import safariPanorama from "@/assets/safari-panorama.png";
import leaves from "@/assets/leaves-decoration.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Baby Shower · Mayra & Carlos · 15 Ago 2026" },
      {
        name: "description",
        content:
          "Invitación al Baby Shower de Mayra & Carlos. Sábado 15 de agosto de 2026, 3:00 PM en Carrillo, Querétaro.",
      },
    ],
  }),
  component: Invitation,
});

const EVENT_DATE = new Date("2026-08-15T15:00:00-06:00");
const MAPS_URL =
  "https://www.google.com/maps?q=20.614242553710938,-100.43255615234375&z=17&hl=es";
const AMAZON_URL =
  "https://www.amazon.com.mx/baby-reg/mayra-morales-carlos-guzmn-octubre-2026-santiagodequeretaro/3V4CE7B8JUB5M";
const LIVERPOOL_URL = "https://mesaderegalos.liverpool.com.mx/milistaderegalos/52016285";
const WHATSAPP_URL =
  "https://wa.me/524427482672?text=Hola%20Mayra%20y%20Carlos,%20confirmo%20mi%20asistencia%20a%20su%20Baby%20Shower.";

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-sage/90 px-3 py-3 text-cream shadow-[0_8px_20px_-10px_oklch(0.55_0.055_145_/0.6)] min-w-[62px]">
      <span className="font-display text-3xl font-semibold leading-none tabular-nums sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/85 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function SectionDivider() {
  return (
    <div aria-hidden className="pointer-events-none relative -my-10 h-24 sm:h-28">
      <img
        src={leaves}
        alt=""
        className="leaf-anim absolute left-[-40px] top-0 h-32 w-32 opacity-60 sm:h-40 sm:w-40"
      />
      <img
        src={leaves}
        alt=""
        className="leaf-anim absolute right-[-40px] bottom-0 h-32 w-32 -scale-x-100 opacity-60 sm:h-40 sm:w-40"
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
}

function Invitation() {
  const t = useCountdown(EVENT_DATE);
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative mx-auto max-w-[520px] overflow-hidden font-body text-foreground">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center px-6 pt-14 pb-8 text-center"
      >
        <div className="animate-[rise-in_1s_ease-out_both]">
          <h1 className="font-display text-6xl font-light uppercase tracking-[0.35em] text-sage-deep sm:text-7xl">
            Baby
          </h1>
          <p className="-mt-3 font-script text-5xl text-sage sm:text-6xl">Shower</p>
        </div>
        <div className="mt-4 flex items-center gap-3 opacity-80 animate-[rise-in_1.2s_ease-out_both]">
          <span className="h-px w-10 bg-sage/50" />
          <p className="font-display text-2xl italic text-cocoa sm:text-3xl">
            Mayra <span className="text-sage">&</span> Carlos
          </p>
          <span className="h-px w-10 bg-sage/50" />
        </div>

        <div className="relative mt-6 w-full float-anim">
          <img
            src={heroAnimals}
            alt="Animales safari acuarela"
            width={1408}
            height={912}
            className="mx-auto w-full max-w-[460px] drop-shadow-[0_20px_40px_oklch(0.55_0.055_145_/0.25)]"
          />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="reveal px-6 py-10 text-center">
        <div className="paper-card mx-auto rounded-[28px] px-6 py-8">
          <p className="font-display text-2xl italic text-sage-deep">Sólo faltan</p>
          <div className="mt-5 flex justify-center gap-2 sm:gap-3">
            <CountBox value={t.d} label="Días" />
            <CountBox value={t.h} label="Hrs" />
            <CountBox value={t.m} label="Min" />
            <CountBox value={t.s} label="Seg" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Para celebrar juntos el
            <br />
            <span className="font-display text-lg text-cocoa">
              sábado 15 de agosto de 2026
            </span>
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* DATE & TIME */}
      <section className="reveal px-6 py-8">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-sage-deep">
          Guarda la fecha
        </p>
        <h2 className="mt-2 text-center font-display text-3xl text-cocoa">
          Acompáñanos a celebrar
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="paper-card rounded-2xl p-5 text-center">
            <Calendar className="mx-auto h-7 w-7 text-sage-deep" strokeWidth={1.5} />
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-sage-deep">
              Fecha
            </p>
            <p className="mt-2 font-display text-xl leading-tight text-cocoa">
              Sábado
              <br />
              15 de agosto
              <br />
              <span className="text-base text-muted-foreground">2026</span>
            </p>
          </div>
          <div className="paper-card rounded-2xl p-5 text-center">
            <Clock className="mx-auto h-7 w-7 text-sage-deep" strokeWidth={1.5} />
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-sage-deep">
              Hora
            </p>
            <p className="mt-2 font-display text-xl leading-tight text-cocoa">
              3:00 PM
              <br />
              <span className="text-base text-muted-foreground">
                En punto
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="reveal px-6 py-10 text-center">
        <div className="paper-card relative overflow-hidden rounded-[28px] px-6 py-8">
          <img
            src={leaves}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 opacity-40 leaf-anim"
          />
          <MapPin className="mx-auto h-8 w-8 text-sage-deep" strokeWidth={1.5} />
          <h3 className="mt-3 font-display text-2xl text-cocoa">Ubicación</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            3ra Privada 20 de Noviembre #5
            <br />
            Carrillo, Querétaro
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-[0_10px_25px_-10px_oklch(0.55_0.055_145_/0.55)] transition hover:-translate-y-0.5 hover:bg-sage-deep"
          >
            <MapPin className="h-4 w-4" /> Ver ubicación
          </a>
        </div>
      </section>

      <SectionDivider />

      {/* SPECIAL MESSAGE */}
      <section className="reveal px-6 py-10 text-center">
        <div className="float-anim mx-auto w-full max-w-[260px]">
          <img
            src={babyGiraffe}
            alt="Jirafita bebé acuarela"
            width={900}
            height={900}
            className="mx-auto w-full drop-shadow-[0_18px_35px_oklch(0.55_0.055_145_/0.2)]"
          />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.35em] text-sage-deep">
          Nuestra bebé
        </p>
        <h3 className="mt-2 font-display text-3xl leading-tight text-cocoa">
          Una pequeña aventurera
          <br /> está en camino
        </h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Con mucha ilusión esperamos la llegada de nuestra pequeña princesa y
          queremos compartir este momento tan especial contigo.
        </p>
      </section>

      {/* GIFT REGISTRIES */}
      <section className="reveal px-6 py-10">
        <div className="text-center">
          <Gift className="mx-auto h-7 w-7 text-sage-deep" strokeWidth={1.5} />
          <h3 className="mt-2 font-display text-3xl text-cocoa">Mesa de regalos</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            El mejor regalo será tu presencia, pero si deseas consentir a nuestra
            bebé, aquí te dejamos nuestras mesas de regalos.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              name: "Liverpool",
              sub: "Mesa de regalos",
              detail: "Evento #52016285",
              url: LIVERPOOL_URL,
            },
            {
              name: "Amazon",
              sub: "Mesa de regalos",
              detail: "Baby Registry",
              url: AMAZON_URL,
            },
          ].map((r) => (
            <div
              key={r.name}
              className="paper-card group flex flex-col items-center rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_oklch(0.55_0.055_145_/0.5)]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-sage-soft text-sage-deep">
                <Gift className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h4 className="mt-4 font-display text-2xl text-cocoa">{r.name}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{r.sub}</p>
              <p className="text-xs text-sage-deep">{r.detail}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-sage/50 bg-cream px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-sage-deep transition group-hover:bg-sage group-hover:text-cream"
              >
                Ir a mesa
              </a>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* RSVP */}
      <section className="reveal px-6 py-10 text-center">
        <div className="paper-card mx-auto rounded-[28px] px-6 py-10">
          <Heart className="mx-auto h-7 w-7 text-sage-deep" strokeWidth={1.5} />
          <h3 className="mt-3 font-display text-3xl text-cocoa">
            Confirma tu asistencia
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Nos encantará compartir este momento contigo. Confirma antes del
            <span className="text-cocoa"> 1 de agosto de 2026</span>.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-anim mt-7 inline-flex items-center gap-2 rounded-full bg-sage-deep px-8 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-cream transition hover:-translate-y-0.5 hover:bg-sage"
          >
            <MessageCircle className="h-4 w-4" /> Confirmar por WhatsApp
          </a>
          <p className="mt-4 text-xs text-muted-foreground">442 748 2672</p>
        </div>
      </section>

      {/* FINAL */}
      <section className="reveal relative px-6 pt-8 pb-16 text-center">
        <div className="float-anim">
          <img
            src={safariPanorama}
            alt="Animales safari acuarela reunidos"
            width={1600}
            height={1008}
            className="mx-auto w-full drop-shadow-[0_25px_45px_oklch(0.55_0.055_145_/0.25)]"
          />
        </div>
        <h3 className="mt-4 font-script text-5xl text-sage-deep sm:text-6xl">
          ¡Te esperamos!
        </h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Gracias por acompañarnos en este momento tan especial. Con cariño,
        </p>
        <p className="mt-2 font-display text-xl italic text-cocoa">
          Mayra & Carlos
        </p>
      </section>
    </main>
  );
}
