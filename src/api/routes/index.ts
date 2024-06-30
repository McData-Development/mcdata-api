import type { Request, Response } from 'express';
import type HttpServer from '../HttpServer';
import { ModulesMiddleware } from '../middleware';
import HealthRoute from './HealthRoute';
import VersionRoute from './VersionRoute';
import GameRoute from './GameRoute';
import EffectRoute from './EffectRoute';
import DimensionRoute from './DimensionRoute';
import ColorRoute from './ColorRoute';
import BiomeRoute from './BiomeRoute';
import ArmorRoute from './ArmorRoute';
import AlphabetRoute from './AlphabetRoute';

/**
 * Initialize routes
 * @param server HttpServer
 */
export const initRoutes = (server: HttpServer): void => {
  const { options, application } = server;

  ModulesMiddleware.register(server);

  // Health check.
  application.use(`${options.prefix}/health`, new HealthRoute(server).router);

  // Minecraft versions.
  application.use(
    `${options.prefix}/versions`,
    new VersionRoute(server).router
  );

  // Minecraft games.
  application.use(`${options.prefix}/games`, new GameRoute(server).router);

  // Minecraft effects.
  application.use(`${options.prefix}/effects`, new EffectRoute(server).router);

  // Minecraft dimensions.
  application.use(
    `${options.prefix}/dimensions`,
    new DimensionRoute(server).router
  );

  // Minecraft colors.
  application.use(`${options.prefix}/colors`, new ColorRoute(server).router);

  // Minecraft biomes.
  application.use(`${options.prefix}/biomes`, new BiomeRoute(server).router);

  // Minecraft armor.
  application.use(`${options.prefix}/armor`, new ArmorRoute(server).router);

  // Minecraft alphabet.
  application.use(
    `${options.prefix}/alphabet`,
    new AlphabetRoute(server).router
  );

  // Unknown endpoint.
  application.use('', (_: Request, res: Response): Response => {
    return res.status(404).json({
      error: 'UNKNOWN_ENDPOINT',
      message: 'We could not find any referring endpoint.'
    });
  });
};
