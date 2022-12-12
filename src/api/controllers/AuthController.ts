import { AxiosError } from 'axios';
import type { Request, Response } from 'express';
import config from '../../constants/config';
import AuthService from '../services/AuthService';
import Controller from './Controller';

class AuthController extends Controller {
  private authService: AuthService = new AuthService();

  /**
   * OAuth2 authentication
   * @param req Express request
   * @param res Express response
   */
  public async oauth(req: Request, res: Response): Promise<Response> {
    const { channel_link, user_id } = req.query;

    try {
      let oauth = 'https://mc-auth.com/oauth2/authorize';
      oauth += `?client_id=${config.mcauth.clientId}`;
      oauth += `&redirect_uri=${config.mcauth.redirectUri}`;
      oauth += '&response_type=code';
      oauth += '&scope=profile';
      oauth += `&state=${JSON.stringify({ channel_link, user_id })}`;
      
      return res.json({ oauth_url: oauth });
    } catch (e: unknown) {
      this.logger.error(e);
      return res.status(500).json({ message: 'Error while resolving request.' });
    }
  }

  /**
   * OAuth2 authentication callback
   * @param req Express request
   * @param res Express response
   */
  public async callback(req: Request, res: Response): Promise<Response | void> {
    const { code } = req.query;
    if (!code) return res.json({ message: 'Did not receive any identification code.' });

    try {
      const data = await this.authService.IdentifyCode({
        clientId: config.mcauth.clientId,
        clientSecret: config.mcauth.clientSecret,
        redirectUri: config.mcauth.redirectUri,
        code: code.toString()
      });
  
      return res.redirect(data.state.channel_link);
    } catch (e: unknown) {
      this.logger.error(e);

      if (e instanceof AxiosError) {
        if (e.response?.status === 400) return res.status(400).json({ message: 'Error while resolving oauth2. Possible invalid code.' });
      }

      return res.status(500).json({ message: 'Error while resolving request' });
    }
  }
}

export default AuthController;
