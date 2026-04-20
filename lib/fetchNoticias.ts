import { unstable_cache } from 'next/cache'
import Parser from 'rss-parser'

export interface NoticiaRSS {
  titulo: string
  extracto: string
  fecha: string
  url: string
  fuente: string
  categoria: string
}

// Fuentes RSS de medios jurídicos españoles
const FEEDS = [
  {
    url: 'https://noticias.juridicas.com/rss/',
    fuente: 'Noticias Jurídicas',
    categoria: 'Actualidad Jurídica',
  },
  {
    url: 'https://www.elderecho.com/feed',
    fuente: 'El Derecho',
    categoria: 'Derecho',
  },
  {
    url: 'https://www.economistjurist.es/feed/',
    fuente: 'Economist & Jurist',
    categoria: 'Derecho',
  },
]

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'FGAbogados/1.0' },
})

function formatFecha(dateStr: string | undefined): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

const MAX_ITEMS = 12

async function _fetchNoticias(): Promise<NoticiaRSS[]> {
  const results: NoticiaRSS[] = []

  await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url)
        for (const item of parsed.items.slice(0, Math.ceil(MAX_ITEMS / FEEDS.length) + 2)) {
          results.push({
            titulo: item.title ?? '',
            extracto: stripHtml(item.contentSnippet ?? item.content ?? item.summary ?? '').slice(0, 200),
            fecha: formatFecha(item.pubDate ?? item.isoDate),
            url: item.link ?? '',
            fuente: feed.fuente,
            categoria: item.categories?.[0] ?? feed.categoria,
          })
        }
      } catch {
        // Si un feed falla, el resto sigue funcionando
      }
    })
  )

  return results
    .filter((n) => n.titulo && n.url)
    .sort((a, b) => {
      const da = new Date(a.fecha).getTime() || 0
      const db = new Date(b.fecha).getTime() || 0
      return db - da
    })
    .slice(0, MAX_ITEMS)
}

const _fetchNoticiasCache = unstable_cache(
  _fetchNoticias,
  ['noticias-rss'],
  { revalidate: 3600 }
)

export async function fetchNoticias(limit = MAX_ITEMS): Promise<NoticiaRSS[]> {
  const items = await _fetchNoticiasCache()
  return items.slice(0, limit)
}
