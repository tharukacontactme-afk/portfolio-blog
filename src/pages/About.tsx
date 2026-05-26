import { profile } from '@/data/profile'
import { BrandGallery } from '@/components/BrandGallery'
import { driverProgramBrands, driverProgramsHeading } from '@/data/brands'

export default function About() {
  return (
    <div className="main-panel">
      <h1 className="font-serif text-4xl text-ink sm:text-5xl">About me</h1>

      <div className="mt-6 flow-root space-y-4 text-base leading-relaxed text-ink-muted">
        <img
          src={profile.avatar}
          alt={profile.avatarAlt}
          width={480}
          height={600}
          className="mx-auto mb-5 aspect-[4/5] w-full max-w-[240px] object-cover object-top sm:float-left sm:mb-4 sm:mr-6 sm:w-56 sm:max-w-[38%] md:w-64 lg:mr-8 lg:w-72"
        />

        {profile.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="driver-programs-heading">
        <h2
          id="driver-programs-heading"
          className="font-serif text-2xl text-ink sm:text-3xl"
        >
          {driverProgramsHeading}
        </h2>
        <BrandGallery brands={driverProgramBrands} />
      </section>
    </div>
  )
}
