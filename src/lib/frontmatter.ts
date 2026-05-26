type FrontmatterValue = string | string[]

function parseYamlBlock(block: string): Record<string, FrontmatterValue> {
  const data: Record<string, FrontmatterValue> = {}
  let currentKey: string | null = null
  let listItems: string[] | null = null

  const flushList = () => {
    if (currentKey && listItems) {
      data[currentKey] = listItems
      listItems = null
      currentKey = null
    }
  }

  for (const line of block.split('\n')) {
    const listMatch = line.match(/^\s+-\s+(.+)$/)
    if (listMatch) {
      listItems ??= []
      listItems.push(listMatch[1].trim())
      continue
    }

    const keyMatch = line.match(/^([\w-]+):\s*(.*)$/)
    if (!keyMatch) continue

    flushList()
    currentKey = keyMatch[1]
    const value = keyMatch[2].trim()

    if (!value) {
      listItems = []
      continue
    }

    data[currentKey] = value
    currentKey = null
  }

  flushList()
  return data
}

export function parseFrontmatter(raw: string): {
  data: Record<string, FrontmatterValue>
  content: string
} {
  const normalized = raw.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) {
    throw new Error('Missing frontmatter opening delimiter.')
  }

  const end = normalized.indexOf('\n---\n', 4)
  if (end === -1) {
    throw new Error('Missing frontmatter closing delimiter.')
  }

  return {
    data: parseYamlBlock(normalized.slice(4, end)),
    content: normalized.slice(end + 5).trim(),
  }
}
