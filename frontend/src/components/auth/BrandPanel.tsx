import { branding } from '../../config/branding'

export function BrandPanel() {
  return (
    <div
      className="relative hidden h-screen w-[52%] shrink-0 bg-cover bg-center lg:block"
      style={{ backgroundImage: `url(${branding.backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute left-8 top-8 rounded-md bg-white/85 px-3 py-2 shadow-lg backdrop-blur-sm">
        <img src={branding.logoUrl} alt="Res Roma logo" className="h-10 w-auto sm:h-12" />
      </div>

      <div className="absolute inset-x-8 bottom-12 max-w-md rounded-lg bg-white/10 p-5 text-white backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-white/80">Res Roma</p>
        <p
          className="mt-2 text-3xl font-light italic tracking-[0.06em] text-white/95"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Re-Imagined, Student Living
        </p>
      </div>
    </div>
  )
}
