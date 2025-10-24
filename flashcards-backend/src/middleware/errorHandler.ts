import type { Request, Response, NextFunction } from 'express'

function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found' })
}

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error(err)
  if (res.headersSent) return
  res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' })
}

module.exports = { notFound, errorHandler }
