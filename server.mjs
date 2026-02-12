import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = __dirname
const port = Number(process.env.PORT || 4173)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.ts': 'text/plain; charset=utf-8',
  '.tsx': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

function safeResolve(urlPath) {
  const cleanPath = path.normalize(urlPath).replace(/^\/+/, '')
  const resolved = path.resolve(rootDir, cleanPath)
  if (!resolved.startsWith(rootDir)) return null
  return resolved
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = req.url || '/'
    const pathname = requestUrl.split('?')[0]
    const filePath = pathname === '/' ? path.resolve(rootDir, 'index.html') : safeResolve(pathname)

    if (!filePath) {
      res.writeHead(403)
      res.end('Forbidden')
      return
    }

    try {
      const data = await readFile(filePath)
      const ext = path.extname(filePath)
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
      res.writeHead(200)
      res.end(data)
      return
    } catch {
      const fallback = await readFile(path.resolve(rootDir, 'index.html'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.writeHead(200)
      res.end(fallback)
      return
    }
  } catch {
    res.writeHead(500)
    res.end('Internal server error')
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`)
})
