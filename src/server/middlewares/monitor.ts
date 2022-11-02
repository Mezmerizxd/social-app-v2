import { Application } from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import Log from '../utils/Log';

export default new (class Monitor {
    public Initialize(app: Application) {
        if (!app) {
            Log.warn('[Middlewares] [Monitor] Failed to get application.');
            return;
        }
        const options: object = {
            title: 'Monitor',
            path: '/monitor',
            spans: [
                {
                    interval: 1,
                    retention: 60,
                },
                {
                    interval: 5,
                    retention: 60,
                },
                {
                    interval: 15,
                    retention: 60,
                },
            ],
            chartVisibility: {
                mem: true,
                rps: true,
                cpu: true,
                load: true,
                statusCodes: true,
                responseTime: true,
            },
            // healthChecks: [
            //     {
            //         protocol: 'http',
            //         host: 'localhost',
            //         path: '/',
            //         port: '3001',
            //     },
            //     {
            //         protocol: 'http',
            //         host: 'localhost',
            //         path: '/api',
            //         port: '3001',
            //     },
            // ],
        };
        app.use(expressStatusMonitor(options));
        Log.info('[Middlewares] [Monitor] Initialized.');
        return app;
    }
})();
