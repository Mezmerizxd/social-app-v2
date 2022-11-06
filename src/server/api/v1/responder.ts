import { Response } from 'express';
import Log from '../../utils/Log';

export default function Responder(
    handler: Response,
    type: string,
    data?: any,
    error?: string
) {
    try {
        Log.debugApi(
            `[V1] [Responder] Response, Data: ${data} | Error: ${error}`
        );
        type = type.toUpperCase();
        switch (type) {
            case 'SUCCESS':
                return handler.status(200).json({
                    success: true,
                    data: data ? data : null,
                });
            case 'ERROR':
                return handler.status(400).json({
                    success: false,
                    error: error ? error : null,
                });
            case 'CATCH':
                Log.error(`[API/V1] ${error}`);
                return handler.status(400).json({
                    success: false,
                    error: 'Something went wrong.',
                });
        }
    } catch (error) {
        Log.error(`[API] [V1] [Responder] Error handling Success, ${error}`);
        return handler.status(400).json({
            success: false,
            error: 'Something went wrong.',
        });
    }
}
