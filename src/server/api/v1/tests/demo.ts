import { Request, Response } from 'express';
import Log from '../../../utils/Log';
import User from '../../../features/user';

export default new (class Demo {
    public Perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Tests] [Demo] Started');

        const user = new User(452802201068579, 'userId');
        await user.init();

        if (
            user
                .data()
                .friends?.find((friend) => friend.userId === 459867563499183)
        ) {
            console.log('Friend FOund');
        }

        res.status(200).json({
            error: false,
            data: {
                demo: 'Hello World',
            },
        });
        Log.debugApi('[V1] [Tests] [Demo] Finished');
    };
})();
