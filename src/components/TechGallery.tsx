import ToolLogo from '@/components/ToolLogo'
import type { Tool } from '@/data/tools'

type TechGalleryProps = {
  tools: Tool[]
}

export default function TechGallery({ tools }: TechGalleryProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {tools.map((tool) => (
        <li key={tool.logo}>
          <GalleryCard tool={tool} />
        </li>
      ))}
    </ul>
  )
}

function GalleryCard({ tool }: { tool: Tool }) {
  const image = (
    <div className="logo-tile">
      <ToolLogo logo={tool.logo} name={tool.name} />
    </div>
  )

  if (tool.url) {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noreferrer"
        className="group block outline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        aria-label={tool.name}
      >
        {image}
      </a>
    )
  }

  return image
}
