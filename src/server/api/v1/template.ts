/*

import { Request, Response } from 'express';
import Responder from './responder';
import Log from '../../utils/Log';

type RequestBody = {};

export default new (class Template {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Template] Started');
        const body: RequestBody = req.body;

        try {
            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[Template] Template, ${error}`);
        }
        Log.debugApi('[V1] [Template] Finished');
    };
})()

*/
