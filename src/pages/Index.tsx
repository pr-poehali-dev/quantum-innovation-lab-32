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
import { PhoneIcon, MapPinIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

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

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 1 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 3 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 3 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 2 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 4 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 4 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 3 * containerWidth,
            behavior: "smooth",
          })
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
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 4)
        } else {
          targetSection = Math.max(currentSection - 1, 0)
        }

        scrollContainer.scrollTo({
          left: targetSection * containerWidth,
          behavior: "smooth",
        })
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
        <section id="home" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center px-0 leading-5">
              <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl">
                <span className="font-open-sans-custom not-italic">Защитим.</span>{" "}
                <span className="font-serif italic">Утеплим.</span>{" "}
                <span className="font-open-sans-custom not-italic">Украсим.</span>
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide text-xl">
                Бронирование PPF-плёнкой, шумоизоляция и тонировка в Казани.{" "}
                <span className="font-serif italic">Честные цены</span> и гарантия на все работы
              </p>

              <div className="flex justify-center gap-4">
                <ShinyButton className="px-8 py-3 text-base" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })}>Записаться</ShinyButton>
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
                  <span className="text-white text-2xl font-bold">5 лет</span>
                  <span>Опыт работы</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <Feature />
          </div>
        </section>

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
              <h2 className="text-2xl font-bold text-white text-center mb-6 font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">Наши работы</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-white/5 backdrop-blur-sm group">
                  <img
                    src="https://cdn.poehali.dev/projects/427027fb-3fff-4e1f-9e86-024da97128f6/files/7b5dcaab-98fd-4ace-806a-9228a8d27edc.jpg"
                    alt="Нанесение PPF плёнки на капот"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-3">
                    <p className="text-white text-sm font-open-sans-custom font-medium">Бронирование PPF</p>
                    <p className="text-gray-400 text-xs font-open-sans-custom mt-1">Нанесение плёнки на капот и зоны риска</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-white/5 backdrop-blur-sm group">
                  <img
                    src="https://cdn.poehali.dev/projects/427027fb-3fff-4e1f-9e86-024da97128f6/files/cb51d858-1dd6-4e45-9bf7-8546b66587ab.jpg"
                    alt="Установка шумоизоляции"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-3">
                    <p className="text-white text-sm font-open-sans-custom font-medium">Шумоизоляция</p>
                    <p className="text-gray-400 text-xs font-open-sans-custom mt-1">Профессиональная установка в дверные панели</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-white/5 backdrop-blur-sm group">
                  <img
                    src="https://cdn.poehali.dev/projects/427027fb-3fff-4e1f-9e86-024da97128f6/files/06530b30-2ade-4524-843e-e17db5dd2827.jpg"
                    alt="Готовый результат PPF"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-3">
                    <p className="text-white text-sm font-open-sans-custom font-medium">Готовый результат</p>
                    <p className="text-gray-400 text-xs font-open-sans-custom mt-1">Прозрачная PPF — незаметна, но надёжна</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Отзывы */}
            <div className="mt-10 mb-4">
              <h2 className="text-2xl font-bold text-white text-center mb-6 font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">Отзывы клиентов</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Алексей К.", text: "Поставили PPF на капот и бамперы. Работа аккуратная, плёнка незаметна. Очень доволен результатом!", service: "Бронирование PPF" },
                  { name: "Марина Р.", text: "Делали шумоизоляцию — разница колоссальная! Теперь в машине тихо, как в студии. Рекомендую студию Стиль всем!", service: "Шумоизоляция" },
                  { name: "Дмитрий Т.", text: "Установили видеорегистратор и камеру заднего вида. Быстро, чисто, без лишних проводов. Мастера знают своё дело.", service: "Установка оборудования" },
                ].map((review, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src="https://cdn.poehali.dev/projects/427027fb-3fff-4e1f-9e86-024da97128f6/files/0139bdf0-a370-4793-903f-d7360fd1912b.jpg"
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
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

        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20"
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

          <div className="relative z-10 mx-auto w-full max-w-5xl mt-[5vh]">
            <ContactCard
              title="Записаться на услугу"
              description="Оставьте заявку — перезвоним в течение 30 минут и ответим на все вопросы. Работаем в Казани, ул. Архангельская 2к1."
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
                  className: "col-span-2",
                },
              ]}
            >
              <form action="" className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Ваше имя
                  </Label>
                  <Input
                    type="text"
                    placeholder="Как к вам обращаться?"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Телефон
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Интересующая услуга
                  </Label>
                  <Textarea
                    placeholder="Например: PPF на капот и бамперы, шумоизоляция дверей..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
                  type="button"
                >
                  Отправить заявку
                </Button>
              </form>
            </ContactCard>
          </div>
        </section>
      </div>
    </main>
  )
}