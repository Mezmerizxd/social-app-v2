import { Request, Response } from 'express';
import Log from '../../../utils/Log';

export default new (class Demo {
    public Perform = (req: Request, res: Response) => {
        Log.debugApi('[V1] [Tests] [Demo] Started');
        res.status(200).json({
            error: false,
            data: {
                demo: 'Hello World',
            },
        });
        Log.debugApi('[V1] [Tests] [Demo] Finished');
    };
})();
