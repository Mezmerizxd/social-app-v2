import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Cfg from '../../../cfg';
import User from '../../../features/user';

type RequestBody = {
    username: string;
};

export default new (class ChangeUsername {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] ChangeUsername Started');
        const body: RequestBody = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        if (
            Cfg.UserApi().illegalUsernameCharacters.some((char: string) =>
                body.username.includes(char)
            )
        ) {
            Responder(
                res,
                'error',
                null,
                'Username contains illegaal characters.'
            );
            return;
        }

        try {
            const username = await user.setUsername(body.username);

            if (username.success === false) {
                Responder(res, 'error', null, username.error);
                return;
            }

            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[User] ChangeUsername, ${error}`);
        }
        Log.debugApi('[V1] [User] ChangeUsername Finished');
    };
})();
