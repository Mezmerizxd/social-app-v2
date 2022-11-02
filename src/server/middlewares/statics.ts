import * as express from 'express';
import * as path from 'path';
import Log from '../utils/Log';

export default new (class Statics {
    public Initialize(app: express.Application) {
        if (!app) {
            Log.warn('[Middlewares] [Statics] Failed to get application.');
            return;
        }
        app.use(
            express.static(path.join(__dirname, `../../../release/client/`))
        );
        app.get('/*', (req, res) => {
            res.sendFile(
                path.join(__dirname, `../../../release/client/index.html`)
            );
        });
        Log.info('[Middlewares] [Statics] Initialized.');
        return app;
    }
})();
