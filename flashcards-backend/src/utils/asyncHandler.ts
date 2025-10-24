import type { Request, Response, NextFunction } from 'express'

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function handler(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
module.exports = { asyncHandler }
