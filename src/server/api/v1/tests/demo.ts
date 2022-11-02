import { Request, Response } from 'express';
import Log from '../../../utils/Log';

export default new (class Demo {
    public Perform = (req: Request, res: Response) => {
        Log.debug('[API/V1] Debug used.');
        res.status(200).json({
            error: false,
            data: {
                demo: 'Hello World',
            },
        });
        return;
    };
})();
