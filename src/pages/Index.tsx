import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { FloatingNavbar } from "@/components/FloatingNavbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { BentoPricing } from "@/components/ui/bento-pricing"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PhoneIcon, MapPinIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const SEND_LEAD_URL = "https://functions.poehali.dev/e460fab0-ca2f-40dc-bb8e-bf3284e48a5e"

const workPhotos = [
  {
    url: "https://cdn.poehali.dev/files/eab87446-7896-41fd-a983-8e909a50b723.jpg",
    title: "Подготовка к бронированию",
    desc: "Нанесение PPF на переднюю часть",
  },
  {
    url: "https://cdn.poehali.dev/files/33245dad-c821-4a51-96a3-8a4fcd5898ef.jpg",
    title: "Бронирование фар",
    desc: "PPF-плёнка на фары — защита от сколов",
  },
  {
    url: "https://cdn.poehali.dev/files/a20b58d5-d5fd-41b8-86a4-52425ace3aa8.jpg",
    title: "Бронирование задней оптики",
    desc: "Защита задних фонарей полиуретановой плёнкой",
  },
  {
    url: "https://cdn.poehali.dev/files/c9dd430e-9caf-412e-8095-7fa690ac09e3.jpg",
    title: "Оклейка кузова",
    desc: "Бронирование двери — без пузырей и следов",
  },
  {
    url: "https://cdn.poehali.dev/files/718e1196-f3fe-4a63-a78a-c18d6afeffb5.jpg",
    title: "Полный кузов PPF",
    desc: "Полное бронирование автомобиля в студии",
  },
]

function WorksCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? workPhotos.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === workPhotos.length - 1 ? 0 : c + 1))

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-white/5 backdrop-blur-sm">
        <img
          key={current}
          src={workPhotos[current].url}
          alt={workPhotos[current].title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white font-open-sans-custom font-semibold">{workPhotos[current].title}</p>
          <p className="text-gray-300 text-sm font-open-sans-custom">{workPhotos[current].desc}</p>
        </div>
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {workPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === current ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formService, setFormService] = useState("")
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")

  const handleSubmit = async () => {
    if (!formPhone.trim()) return
    setFormStatus("loading")
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, service: formService }),
      })
      if (res.ok) {
        setFormStatus("ok")
        setFormName("")
        setFormPhone("")
        setFormService("")
      } else {
        setFormStatus("error")
      }
    } catch {
      setFormStatus("error")
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const containerWidth = scrollContainer.offsetWidth
      const currentSection = Math.round(currentScroll / containerWidth)

      if (currentSection === 2 && pricingSectionRef.current) {
        const pricingSection = pricingSectionRef.current
        const isAtTop = pricingSection.scrollTop === 0
        const isAtBottom = pricingSection.scrollTop + pricingSection.clientHeight >= pricingSection.scrollHeight - 1
        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return
        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 1 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
      }

      if (currentSection === 3 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1
        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return
        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 2 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 4 * containerWidth, behavior: "smooth" })
          return
        }
      }

      if (currentSection === 4 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1
        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return
        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          return
        }
      }

      e.preventDefault()
      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) targetSection = Math.min(currentSection + 1, 4)
        else targetSection = Math.max(currentSection - 1, 0)
        scrollContainer.scrollTo({ left: targetSection * containerWidth, behavior: "smooth" })
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/50" />
      <FloatingNavbar />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero */}
        <section id="home" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center px-0 leading-5">
              <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl">
                <span className="font-open-sans-custom not-italic">Бронирование.</span>{" "}
                <span className="font-serif italic">Стиль.</span>{" "}
                <span className="font-open-sans-custom not-italic">Шумоизоляция.</span>
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide text-xl">
                Защитим кузов PPF-плёнкой, сделаем салон тише и комфортнее.{" "}
                <span className="font-serif italic">Казань</span> — ул. Архангельская 2к1
              </p>

              <div className="flex justify-center gap-4">
                <ShinyButton
                  className="px-8 py-3 text-base"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })}
                >
                  Записаться
                </ShinyButton>
              </div>

              <div className="mt-10 flex justify-center gap-8 text-gray-300 font-open-sans-custom text-sm">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-2xl font-bold">PPF</span>
                  <span>Полиуретановая плёнка</span>
                </div>
                <div className="w-px bg-white/20" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-2xl font-bold">−50%</span>
                  <span>Снижение шума</span>
                </div>
                <div className="w-px bg-white/20" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-2xl font-bold">Гарантия</span>
                  <span>На все работы</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="features" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <Feature />
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          ref={pricingSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                Услуги и цены
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Честные цены без скрытых доплат. Гарантия на все выполненные работы.
              </p>
            </div>
            <BentoPricing />
          </div>
        </section>

        {/* About + Works + Reviews */}
        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                О студии
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                г. Казань, ул. Архангельская 2к1 — работаем с любовью к автомобилям.
              </p>
            </div>
            <AboutQuote />

            {/* Фото работ */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-white text-center mb-6 font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                Наши работы
              </h2>
              <div className="max-w-2xl mx-auto">
                <WorksCarousel />
              </div>
            </div>

            {/* Отзывы */}
            <div className="mt-10 mb-4">
              <h2 className="text-2xl font-bold text-white text-center mb-6 font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                Отзывы клиентов
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Алексей К.", text: "Поставили PPF на капот и бамперы. Работа аккуратная, плёнка незаметна. Очень доволен результатом!", service: "Бронирование PPF" },
                  { name: "Марина Р.", text: "Делали шумоизоляцию — разница колоссальная! Теперь в машине тихо, как в студии. Рекомендую студию Стиль всем!", service: "Шумоизоляция" },
                  { name: "Дмитрий Т.", text: "Установили видеорегистратор и камеру заднего вида. Быстро, чисто, без лишних проводов. Мастера знают своё дело.", service: "Установка оборудования" },
                ].map((review, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold font-open-sans-custom">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm font-open-sans-custom font-semibold">{review.name}</p>
                        <p className="text-gray-400 text-xs font-open-sans-custom">{review.service}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm font-open-sans-custom leading-relaxed">"{review.text}"</p>
                    <div className="flex gap-0.5 mt-3">
                      {[...Array(5)].map((_, s) => <span key={s} className="text-white text-xs">★</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl mt-[2vh]">
            <ContactCard
              title="Записаться на услугу"
              description="Оставьте заявку — перезвоним в течение 30 минут и ответим на все вопросы."
              contactInfo={[
                {
                  icon: PhoneIcon,
                  label: "Телефон",
                  value: "+7 (908) 333-10-49",
                },
                {
                  icon: MapPinIcon,
                  label: "Адрес",
                  value: "г. Казань, Архангельская 2к1",
                },
              ]}
            >
              {formStatus === "ok" ? (
                <div className="w-full flex flex-col items-center justify-center h-full gap-4 py-8">
                  <span className="text-4xl">✅</span>
                  <p className="text-white font-open-sans-custom text-center text-lg font-semibold">Заявка принята!</p>
                  <p className="text-gray-300 font-open-sans-custom text-center text-sm">Перезвоним в течение 30 минут.</p>
                  <Button
                    className="bg-white/10 text-white border border-white/20 hover:bg-white/20 font-open-sans-custom"
                    onClick={() => setFormStatus("idle")}
                  >
                    Отправить ещё
                  </Button>
                </div>
              ) : (
                <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                  <div className="flex flex-col gap-2">
                    <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                      Ваше имя
                    </Label>
                    <Input
                      type="text"
                      placeholder="Как к вам обращаться?"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                      Телефон <span className="text-gray-400 text-xs">(обязательно)</span>
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                      Интересующая услуга
                    </Label>
                    <Textarea
                      placeholder="Например: PPF на капот и бамперы, шумоизоляция дверей..."
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  {formStatus === "error" && (
                    <p className="text-red-400 text-xs font-open-sans-custom">Ошибка отправки. Позвоните нам напрямую.</p>
                  )}
                  <Button
                    className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom"
                    type="submit"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? "Отправляем..." : "Отправить заявку"}
                  </Button>
                </form>
              )}
            </ContactCard>

            {/* Карта */}
            <div className="mt-6 rounded-lg overflow-hidden border-2 border-white/10">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=49.158460%2C55.779540&z=16&pt=49.158460%2C55.779540,pm2rdm~&text=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%202%D0%BA1"
                width="100%"
                height="280"
                frameBorder="0"
                title="Студия Стиль на карте"
                className="w-full"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
