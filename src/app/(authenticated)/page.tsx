import Link from "next/link"
import Image from "next/image"

const modules = [
  {
    href: `/drive`,
    label: `Dysk`,
    description: `Przeglądaj, przesyłaj i zarządzaj swoimi plikami w chmurze.`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M5 17h14M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
        <rect x="3" y="7" width="18" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: `from-blue-500/20 to-cyan-500/10`,
    accent: `border-blue-500/30 hover:border-blue-400/60`,
    iconColor: `text-blue-400`,
    badge: `Pliki`,
  },
  {
    href: `/map`,
    label: `Mapa`,
    description: `Eksploruj lokalizacje, trasy i geograficzne dane w czasie rzeczywistym.`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    gradient: `from-emerald-500/20 to-teal-500/10`,
    accent: `border-emerald-500/30 hover:border-emerald-400/60`,
    iconColor: `text-emerald-400`,
    badge: `Geo`,
  },
  {
    href: `/spotlight`,
    label: `Spotlight`,
    description: `Eksploruj i udostępniaj najciekawsze treści i wydarzenia.`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    gradient: `from-purple-500/20 to-pink-500/10`,
    accent: `border-purple-500/30 hover:border-purple-400/60`,
    iconColor: `text-purple-400`,
    badge: `Społeczność`,
  },
]

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="w-[600px] h-[300px] rounded-full bg-blue-600/10 blur-3xl mt-10" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/80 border border-gray-700/60 text-xs text-gray-400 mb-6 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Wszystkie systemy działają
          </div>

          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-gray-50 via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight mb-4">
            Witaj z powrotem
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Twój osobisty panel. Wybierz moduł, aby kontynuować pracę.
          </p>
        </div>
      </section>

      {/* Module cards */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-6">Moduły</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className={`
                group relative flex flex-col gap-4 p-6 rounded-2xl
                bg-gradient-to-br ${mod.gradient}
                border ${mod.accent}
                bg-gray-900/60 backdrop-blur
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30
              `}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gray-800/80 ${mod.iconColor} transition-transform duration-300 group-hover:-translate-y-0.5`}>
                  {mod.icon}
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800/70 text-gray-400 border border-gray-700/40">
                  {mod.badge}
                </span>
              </div>

              {/* Text */}
              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-1">{mod.label}</h2>
                <p className="text-sm text-gray-400 leading-relaxed">{mod.description}</p>
              </div>

              {/* Arrow */}
              <div className={`flex items-center gap-1 text-sm font-medium ${mod.iconColor} mt-auto opacity-70 group-hover:opacity-100 transition-opacity`}>
                Otwórz
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
