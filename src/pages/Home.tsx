import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'

type NavItem = { label: string; href: string }

const navItems: NavItem[] = [
  { label: 'Home', href: '#/' },
  { label: 'Product', href: '#/product' },
  { label: 'FAQ', href: '#/faq' },
  { label: 'Blog', href: '#/blog' },
  { label: 'About Us', href: '#/about' }
]

function StarRow({ filled }: { filled: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          viewBox="0 0 24 24"
          className={clsx(
            'h-5 w-5',
            idx < filled ? 'text-[#FFC728]' : 'text-black/20'
          )}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.7L12 16.9 5.8 20.4l1.6-6.7-5.2-4.6 6.9-.6L12 2.2z" />
        </svg>
      ))}
    </div>
  )
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[18px] text-[--color-ink]">
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[--color-primary] text-white">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 010 1.4l-7.2 7.2a1 1 0 01-1.4 0L3.3 9.1a1 1 0 011.4-1.4l3.1 3.1 6.5-6.5a1 1 0 011.4 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="leading-[30px]">{children}</span>
    </li>
  )
}

function EmailPillForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  return (
    <form
      className="relative mt-6 w-full max-w-[410px]"
      onSubmit={(e) => {
        e.preventDefault()
        setStatus('success')
        window.setTimeout(() => setStatus('idle'), 2000)
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Enter your email here
      </label>
      <input
        id="newsletter-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email here"
        className="h-[60px] w-full rounded-[70px] border-2 border-white/35 bg-transparent px-5 pr-16 text-[18px] text-white placeholder:text-white/45 outline-none focus:ring-2 focus:ring-[color:color-mix(in_oklab,var(--color-primary),transparent_50%)]"
        inputMode="email"
        autoComplete="email"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 inline-flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full bg-[--color-primary] transition-colors duration-150 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)]"
        aria-label="Submit email"
      >
        <img src="./assets/icons/arrow-right.svg" alt="" className="h-6 w-6" />
      </button>
      <div
        aria-live="polite"
        className={clsx(
          'mt-3 text-sm text-white/70 transition-opacity',
          status === 'success' ? 'opacity-100' : 'opacity-0'
        )}
      >
        Thanks — we’ll reach out soon.
      </div>
    </form>
  )
}

export default function HomePage() {
  const pricing = useMemo(
    () => [
      {
        name: 'Free',
        price: '0',
        description: 'Have a go and test your superpowers',
        features: ['2 Users', '2 Files', 'Public Share & Comments', 'Chat Support', 'New income apps'],
        cta: 'Signup for free',
        emphasized: false
      },
      {
        name: 'Pro',
        price: '8',
        description: 'Experiment the power of infinite possibilities',
        features: ['4 Users', 'All apps', 'Unlimited editable exports', 'Folders and collaboration', 'All incoming apps'],
        cta: 'Go to pro',
        emphasized: true
      },
      {
        name: 'Business',
        price: '16',
        description: 'Unveil new superpowers and join the Design League',
        features: ['All the features of pro plan', 'Account success Manager', 'Single Sign-On (SSO)', 'Co-conception program', 'Collaboration-Soon'],
        cta: 'Go to business',
        emphasized: false
      }
    ],
    []
  )

  const [demoEmail, setDemoEmail] = useState('')
  const [demoMessage, setDemoMessage] = useState('')
  const [demoErrors, setDemoErrors] = useState<Record<string, string>>({})
  const [demoSubmitting, setDemoSubmitting] = useState(false)
  const [demoResult, setDemoResult] = useState<'idle' | 'success'>('idle')

  const validate = (field: 'email' | 'message', value: string) => {
    if (field === 'email') {
      if (!value.trim()) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email.'
      return ''
    }
    if (!value.trim()) return 'Message is required.'
    if (value.trim().length < 10) return 'Message is too short.'
    return ''
  }

  return (
    <div className="min-h-dvh bg-white text-[--color-ink]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="absolute left-[-360px] top-[-280px] h-[634px] w-[634px] rounded-full bg-[#FFD6D6] blur-[220px]" />
        <div className="absolute right-[-260px] top-[-60px] h-[634px] w-[634px] rounded-full bg-[--color-primary] blur-[220px] opacity-60" />
      </div>

      <header className="pt-10">
        <Container className="flex items-center justify-between gap-8">
          <div className="text-[50px] font-semibold leading-[30px] tracking-[-0.02em] text-[--color-primary]">
            Biccas
          </div>

          <nav className="hidden items-center gap-12 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={clsx(
                  'text-[16px] font-medium transition-colors duration-150',
                  item.label === 'Home'
                    ? 'text-[--color-ink]'
                    : 'text-[--color-muted] hover:text-[--color-ink]'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 sm:flex">
            <a className="text-[16px] font-medium text-[--color-muted] hover:text-[--color-ink] transition-colors duration-150" href="#/login">
              Login
            </a>
            <Button variant="primary" className="h-10 w-20 rounded-[10px] px-0 text-[16px]">
              Sign Up
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <section className="pt-20">
          <Container className="grid items-center gap-12 lg:grid-cols-[555px_1fr]">
            <div>
              <h1 className="text-balance text-[64px] font-bold leading-[72px] tracking-[-0.02em] text-[--color-ink] sm:text-[80px] sm:leading-[90px]">
                We’re here to Increase your Productivity
              </h1>
              <div className="mt-5 h-7 w-[480px] max-w-full">
                <svg viewBox="0 0 479 26" className="h-full w-full">
                  <path
                    d="M4 13C126 5 305 4 475 22"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="mt-8 max-w-[461px] text-[18px] font-medium leading-[30px] text-[--color-ink]/80">
                Let's make your work more organize and easily using the Taskio Dashboard
                with many of the latest features in managing work every day.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-10">
                <Button size="lg" variant="primary">
                  Try free trial
                </Button>

                <a
                  href="#/demo"
                  className="group inline-flex items-center gap-[14px] text-[18px] font-medium text-[--color-ink] transition-colors duration-150 hover:text-[color-mix(in_oklab,var(--color-ink),black_10%)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-colors duration-150 group-hover:bg-black/10">
                    <img src="./assets/icons/play.svg" alt="" className="h-6 w-6" />
                  </span>
                  View Demo
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src="./assets/images/hero-illustration.png"
                alt="Product screenshot preview"
                className="w-full max-w-[702px] h-auto"
                loading="eager"
              />
            </div>
          </Container>
        </section>

        <section className="pt-24">
          <Container>
            <p className="text-center text-[18px] font-medium text-[--color-ink]/70">
              More than 25,000 teams use Collabs
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-[18px] font-semibold text-black/30">
              <span>Unsplash</span>
              <span>Notion</span>
              <span>INTERCOM</span>
              <span>descript</span>
              <span>grammarly</span>
            </div>
          </Container>
        </section>

        <section className="mt-24 bg-[--color-soft] py-24">
          <Container className="grid gap-14 lg:grid-cols-[644px_1fr]">
            <div>
              <h2 className="text-balance text-[42px] font-semibold leading-[52px] text-[--color-ink] sm:text-[50px] sm:leading-[60px]">
                How we support our pratner all over the world
              </h2>
              <p className="mt-8 max-w-[644px] text-[16px] font-medium leading-[30px] text-[--color-muted]">
                SaaS become a common delivery model for many business application, including
                office software, messaging software, payroll processing software, DBMS software,
                management software
              </p>

              <div className="mt-14 flex flex-wrap gap-20">
                <div>
                  <StarRow filled={5} />
                  <div className="mt-4 text-[18px] font-semibold text-[--color-ink]">
                    4.9 <span className="text-[--color-muted]">/ 5 rating</span>
                  </div>
                  <div className="mt-4 text-[18px] font-semibold text-black/30">databricks</div>
                </div>
                <div>
                  <StarRow filled={4} />
                  <div className="mt-4 text-[18px] font-semibold text-[--color-ink]">
                    4.8 <span className="text-[--color-muted]">/ 5 rating</span>
                  </div>
                  <div className="mt-4 text-[18px] font-semibold text-black/30">Chainalysis</div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {[
                {
                  title: 'Publishing',
                  body: 'Plan, collaborate, and publishing your content that drives meaningful engagement and growth for your barnd'
                },
                {
                  title: 'Analytics',
                  body: 'Analyze your performance and create goegeous report'
                },
                {
                  title: 'Engagement',
                  body: 'Quiuckly navigate you anda engage with your audience'
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-6">
                  <div className="shadow-soft grid h-[60px] w-[60px] place-items-center rounded-[10px] bg-white">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[--color-primary]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v6m0 8v6M4 12h6m8 0h6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[20px] font-semibold text-[--color-ink]">{item.title}</div>
                    <div className="mt-3 text-[16px] font-medium leading-[28px] text-[--color-muted]">
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[--color-dark] py-24 text-white">
          <Container>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="max-w-[420px] text-balance text-[42px] font-semibold leading-[52px] sm:text-[50px] sm:leading-[60px]">
                Our Features you cab get
              </h2>
              <p className="max-w-[460px] text-[18px] font-medium leading-[30px] text-white/70">
                We offer a variety of interesting features that you can help increase your productivity at
                work and manage your projrct esaly
              </p>
              <Button size="lg" variant="primary" className="h-[62px] rounded-[40px]">
                Get Started
              </Button>
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-3">
              {[
                {
                  title: 'Collboration Teams',
                  body: 'Here you can handle projects together with team virtually',
                  accent: 'bg-white/95'
                },
                {
                  title: 'Cloud Storage',
                  body: 'No nedd to worry about storage because we provide storage up to 2 TB',
                  accent: 'bg-white/95'
                },
                {
                  title: 'Daily Analytics',
                  body: 'We always provide useful informatin to make it easier for you every day',
                  accent: 'bg-white/95'
                }
              ].map((card, idx) => (
                <div key={card.title}>
                  <div className={clsx('rounded-[20px] p-6', card.accent)}>
                    <div className="aspect-[370/270] w-full rounded-[14px] bg-[--color-soft]">
                      <div className="h-full w-full rounded-[14px] bg-[linear-gradient(135deg,rgba(84,189,149,.20),rgba(17,24,39,.05))]" />
                    </div>
                  </div>
                  <div className="mt-8 text-[30px] font-semibold leading-[36px] text-white">
                    {card.title}
                  </div>
                  <div className="mt-4 text-[18px] font-medium leading-[30px] text-white/70">
                    {card.body}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container className="grid gap-16 lg:grid-cols-[520px_1fr]">
            <div>
              <h2 className="text-balance text-[42px] font-semibold leading-[52px] text-[--color-ink] sm:text-[50px] sm:leading-[60px]">
                What Benefit Will You Get
              </h2>
              <ul className="mt-10 space-y-5">
                <CheckItem>Free Consulting With Experet Saving Money</CheckItem>
                <CheckItem>Online Banking</CheckItem>
                <CheckItem>Investment Report Every Month</CheckItem>
                <CheckItem>Saving Money For The Future</CheckItem>
                <CheckItem>Online Transection</CheckItem>
              </ul>
            </div>

            <div className="rounded-[20px] bg-[--color-soft] p-10 shadow-soft">
              <div className="aspect-[612/380] w-full rounded-[16px] bg-white">
                <div className="h-full w-full rounded-[16px] bg-[linear-gradient(135deg,rgba(84,189,149,.22),rgba(17,24,39,.06))]" />
              </div>
              <p className="mt-10 text-[16px] font-medium leading-[28px] text-[--color-muted]">
                Build dashboards, manage tasks, and collaborate with your team in a single, clean workspace.
              </p>
            </div>
          </Container>
        </section>

        <section className="pb-28">
          <Container>
            <div className="text-center">
              <h2 className="text-balance text-[42px] font-semibold leading-[52px] text-[--color-ink] sm:text-[50px] sm:leading-[60px]">
                Choose Plan That's Right For You
              </h2>
              <p className="mx-auto mt-5 max-w-[520px] text-[18px] font-medium leading-[30px] text-[--color-muted]">
                Choose plan that works best for you, feel free to contact us
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={clsx(
                    'rounded-[20px] border p-8 transition-colors duration-150',
                    plan.emphasized
                      ? 'border-[--color-primary] bg-[--color-primary] text-white shadow-soft'
                      : 'border-[--color-line] bg-white text-[--color-ink]'
                  )}
                >
                  <div className="text-[30px] font-semibold">{plan.name}</div>
                  <div
                    className={clsx(
                      'mt-3 text-[16px] font-medium leading-[28px]',
                      plan.emphasized ? 'text-white/80' : 'text-[--color-muted]'
                    )}
                  >
                    {plan.description}
                  </div>

                  <div className="mt-10 flex items-end gap-2">
                    <span className="text-[18px] font-semibold opacity-70">$</span>
                    <span className="text-[50px] font-semibold leading-none">
                      {plan.price}
                    </span>
                    <span className={clsx('mb-1 text-[16px] font-medium', plan.emphasized ? 'text-white/70' : 'text-[--color-muted]')}>
                      /month
                    </span>
                  </div>

                  <div
                    className={clsx(
                      'mt-10 rounded-[16px] p-6',
                      plan.emphasized ? 'bg-white/10' : 'bg-[--color-soft]'
                    )}
                  >
                    <ul className="space-y-4 text-[16px] font-medium">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span
                            className={clsx(
                              'mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full',
                              plan.emphasized ? 'bg-white text-[--color-primary]' : 'bg-[--color-primary] text-white'
                            )}
                          >
                            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M16.7 5.3a1 1 0 010 1.4l-7.2 7.2a1 1 0 01-1.4 0L3.3 9.1a1 1 0 011.4-1.4l3.1 3.1 6.5-6.5a1 1 0 011.4 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className={clsx(plan.emphasized ? 'text-white' : 'text-[--color-ink]')}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.emphasized ? 'secondary' : 'primary'}
                      size="lg"
                      className={clsx('mt-10 w-full', plan.emphasized && 'bg-white text-[--color-primary] hover:bg-white/90')}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[--color-dark] py-24 text-white">
          <Container className="grid gap-12 lg:grid-cols-[466px_1fr]">
            <div>
              <h2 className="text-balance text-[42px] font-semibold leading-[52px] sm:text-[50px] sm:leading-[60px]">
                People are Saying About DoWhith
              </h2>
              <p className="mt-8 text-[18px] font-medium leading-[30px] text-white/70">
                Everything you need to accept to payment and grow your money of manage anywhere on planet
              </p>

              <div className="mt-10 text-[56px] font-black text-white/20">“</div>
              <p className="mt-6 text-[18px] font-medium leading-[30px] text-white/70">
                I am very helped by this E-wallet application, my days are very easy to use this application
                and its very helpful in my life, even I can pay a short time
              </p>
              <div className="mt-8 text-[18px] font-semibold text-white/70">_ Aria Zinarrio</div>

              <div className="mt-10 flex items-center gap-5">
                {[
                  { src: './assets/images/avatar-1.png', alt: 'Customer avatar 1' },
                  { src: './assets/images/avatar-2.png', alt: 'Customer avatar 2' },
                  { src: './assets/images/avatar-3.png', alt: 'Customer avatar 3' },
                  { src: './assets/images/avatar-4.png', alt: 'Customer avatar 4' }
                ].map((a) => (
                  <img
                    key={a.src}
                    src={a.src}
                    alt={a.alt}
                    loading="lazy"
                    className="h-[66px] w-[66px] rounded-full object-cover"
                  />
                ))}

                <a
                  href="#/video"
                  className="ml-2 inline-flex h-[66px] w-[66px] items-center justify-center rounded-full border-2 border-white transition-colors duration-150 hover:bg-white/10"
                  aria-label="Play testimonial video"
                >
                  <img src="./assets/icons/play-triangle.svg" alt="" className="h-6 w-6" />
                </a>
              </div>

              <div className="mt-16">
                <div className="text-[50px] font-semibold leading-[30px] text-[--color-primary]">
                  Biccas
                </div>
                <div className="mt-6 text-[18px] font-medium text-white/70">
                  Get started noew try our product
                </div>
                <EmailPillForm />
              </div>
            </div>

            <div className="rounded-[20px] bg-[--color-darkCard] p-10">
              <div className="flex flex-col items-center">
                <div className="grid h-[86px] w-[86px] place-items-center rounded-[18px] bg-white/5">
                  <div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-[--color-primary]">
                    <span className="text-2xl font-semibold text-[--color-dark]">$</span>
                  </div>
                </div>
                <div className="mt-6 text-[30px] font-medium">Get Started</div>
              </div>

              <form
                className="mt-10 space-y-10"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const emailError = validate('email', demoEmail)
                  const messageError = validate('message', demoMessage)
                  const nextErrors: Record<string, string> = {}
                  if (emailError) nextErrors.email = emailError
                  if (messageError) nextErrors.message = messageError
                  setDemoErrors(nextErrors)
                  if (Object.keys(nextErrors).length) return

                  setDemoSubmitting(true)
                  setDemoResult('idle')
                  await new Promise((r) => setTimeout(r, 800))
                  setDemoSubmitting(false)
                  setDemoResult('success')
                }}
              >
                <TextField
                  label="Email"
                  placeholder="Enter your email"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  onBlur={(e) => setDemoErrors((prev) => ({ ...prev, email: validate('email', e.target.value) }))}
                  error={demoErrors.email}
                  inputMode="email"
                  autoComplete="email"
                />

                <label className="block text-white">
                  <span className="block text-[18px] font-medium">Message</span>
                  <textarea
                    value={demoMessage}
                    onChange={(e) => setDemoMessage(e.target.value)}
                    onBlur={(e) => setDemoErrors((prev) => ({ ...prev, message: validate('message', e.target.value) }))}
                    placeholder="What are you say ?"
                    className={clsx(
                      'mt-3 h-[70px] w-full resize-none rounded-[10px] bg-white px-6 py-[22px] text-[16px] text-[--color-ink] outline-none',
                      'placeholder:text-black/35',
                      'focus:ring-2 focus:ring-[color:color-mix(in_oklab,var(--color-primary),transparent_50%)]',
                      demoErrors.message && 'ring-2 ring-red-500/70'
                    )}
                  />
                  {demoErrors.message ? (
                    <span className="mt-2 block text-sm text-red-300">{demoErrors.message}</span>
                  ) : null}
                </label>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={demoSubmitting}
                  className="w-full"
                >
                  Request Demo
                </Button>

                <div className="text-right text-[14px] font-medium text-white/70">
                  or <span className="text-white">Start Free Trial</span>
                </div>

                <div
                  aria-live="polite"
                  className={clsx(
                    'text-sm text-white/75 transition-opacity',
                    demoResult === 'success' ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  Request sent — we’ll reach out shortly.
                </div>
              </form>
            </div>
          </Container>
        </section>

        <footer className="bg-[--color-dark] py-14 text-white">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
              <div className="max-w-[410px]">
                <div className="text-[50px] font-semibold leading-[30px] text-[--color-primary]">
                  Biccas
                </div>
                <div className="mt-6 text-[18px] font-medium text-white/70">
                  Get started noew try our product
                </div>
                <EmailPillForm />
              </div>

              <div className="grid gap-10 sm:grid-cols-3">
                {[
                  { title: 'Support', links: ['Help centre', 'Account information', 'About', 'Contact us'] },
                  { title: 'Help And Solution', links: ['Talk to support', 'Support docs', 'System status', 'Covid response'] },
                  { title: 'Product', links: ['Update', 'Security', 'Beta test', 'Pricing product'] }
                ].map((col) => (
                  <div key={col.title}>
                    <div className="text-[20px] font-semibold">{col.title}</div>
                    <ul className="mt-6 space-y-3 text-[18px] font-medium text-white/70">
                      {col.links.map((l) => (
                        <li key={l}>
                          <a href="#/" className="hover:text-white transition-colors duration-150">
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[18px] font-medium text-white/70">
                © 2026 Biccas. Copyright and rights reserved
              </div>
              <div className="flex items-center gap-4 text-[18px] font-medium text-white/70">
                <a className="hover:text-white transition-colors duration-150" href="#/terms">
                  Terms and Condtions
                </a>
                <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
                <a className="hover:text-white transition-colors duration-150" href="#/privacy">
                  Privacy Policy
                </a>
              </div>
            </div>
          </Container>
        </footer>
      </main>
    </div>
  )
}
