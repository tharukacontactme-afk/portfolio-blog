import PageHeader from '@/components/PageHeader'
import TechGallery from '@/components/TechGallery'
import { tools } from '@/data/tools'

export default function Tools() {
  return (
    <div className="main-panel mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Stack"
        title="Technologies and Tools"
        description="Languages, platforms, and tools I use across development, automation, and delivery."
      />

      <TechGallery tools={tools} />
    </div>
  )
}
