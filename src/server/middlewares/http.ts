import { Application } from 'express';
import * as bodyParser from 'body-parser';
import Log from '../utils/Log';

export default new (class Http {
    public Initialize(app: Application) {
        if (!app) {
            Log.warn('[Middlewares] [Http] Failed to get application.');
            return;
        }
        app.use(
            bodyParser.json({
                limit: '50mb',
            })
        );
        app.use(
            bodyParser.urlencoded({
                limit: '50mb',
                extended: false,
            })
        );
        Log.info('[Middlewares] [Http] Initialized.');
        return app;
    }
})();
