import type { NextFunction, Request, Response } from 'express';
import config from '../../constants/config';

const GlobalMiddleware = {
  /**
   * Check if valid api is sent in header
   * @param req Express request
   * @param res Express response
   * @param next Express next function
   */
  requiredApiKey: (req: Request, res: Response, next: NextFunction): void | Response => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.status(400).json({ message: 'Could not process request with missing authorizaton header!' });

    const apiKey = authorizationHeader.split(' ')[1];
    if (apiKey !== config.apiKey) return res.status(400).json({ message: 'Could not process request with invalid authorization key!' });

    next();
  }
};

export default GlobalMiddleware;
