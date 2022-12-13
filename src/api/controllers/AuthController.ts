import { AxiosError } from 'axios';
import type { Request, Response } from 'express';
import config from '../../constants/config';
import Snowflake from '../../utils/Snowflake';
import OAuthService from '../services/OAuthService';
import UserService from '../services/UserService';
import Controller from './Controller';

class AuthController extends Controller {
  private oauthService: OAuthService = new OAuthService();
  private userService: UserService = new UserService();

  /**
   * OAuth2 authentication
   * @param req Express request
   * @param res Express response
   */
  public async oauth(req: Request, res: Response): Promise<Response> {
    const { channel_link, user_id } = req.query;
    if (!channel_link || !user_id) return res.status(400).json({ message: 'Missing required query paramaters.' });

    try {
      await this.oauthService.deleteMany({
        where: { minecraft_id: null, user_id: user_id.toString() }
      });

      const user = await this.userService.upsert({
        where: { id: user_id.toString() },
        update: {},
        create: { id: user_id.toString() }
      });

      const oauthAccount = await this.oauthService.create({
        data: { id: Snowflake.generate(), user_id: user.id }
      });

      let oauth = 'https://mc-auth.com/oauth2/authorize';
      oauth += `?client_id=${config.mcauth.clientId}`;
      oauth += `&redirect_uri=${config.mcauth.redirectUri}`;
      oauth += '&response_type=code';
      oauth += '&scope=profile';
      oauth += `&state=${JSON.stringify({ channel_link, user_id, oauth_account: oauthAccount.id })}`;

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
      const data = await this.oauthService.IdentifyCode({
        clientId: config.mcauth.clientId,
        clientSecret: config.mcauth.clientSecret,
        redirectUri: config.mcauth.redirectUri,
        code: code.toString()
      });

      const oauthAccounts = await this.oauthService.find({
        where: { minecraft_id: data.data.uuid }
      });

      if (oauthAccounts.length >= 1) {
        await this.oauthService.delete({ where: { id: data.state.oauth_account } });
        return res.status(400).json({ message: 'Minecraft account already linked to an user.' });
      }

      await this.oauthService.update({
        where: { id: data.state.oauth_account },
        data: { minecraft_id: data.data.uuid }
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
