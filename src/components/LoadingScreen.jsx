import { useTranslation } from '../i18n/useTranslation'
import NubilaLogo from './NubilaLogo'

function PulseCard({ className = '' }) {
  return (
    <div className={`animate-pulse bg-white/40 dark:bg-slate-800/40 rounded-2xl ${className}`} />
  )
}

export default function LoadingScreen() {
  const { t } = useTranslation()

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-[50vh] gap-8 w-full select-none py-12">
      {/* Sleek Minimalist Nubila Brand Loader */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl animate-pulse">
          <NubilaLogo size={42} showText={false} />
        </div>
        <div className="text-center">
          <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 justify-center">
            <span className="lowercase font-bold">nubila</span>
            <span className="font-light text-xs text-white/70 tracking-widest uppercase">forecast</span>
          </h2>
          <p className="text-white/70 text-xs mt-1">
            {t('loading.weather')}
          </p>
        </div>
      </div>

      {/* Skeleton Wireframe */}
      <div className="w-full max-w-3xl px-4 flex flex-col gap-4">
        <PulseCard className="h-44" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <PulseCard className="h-20" />
          <PulseCard className="h-20" />
          <PulseCard className="h-20" />
          <PulseCard className="h-20" />
        </div>
        <PulseCard className="h-32" />
      </div>
    </div>
  )
}
