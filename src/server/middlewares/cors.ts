import { Application } from 'express';
import * as cors from 'cors';
import Log from '../utils/Log';

export default new (class Cors {
    public Initialize(app: Application) {
        if (!app) {
            Log.warn('[Middlewares] [Cors] Failed to get application.');
            return;
        }
        app.use(cors());
        Log.info('[Middlewares] [Cors] Initialized.');
        return app;
    }
})();
