import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Utils from '../../../utils';
import User from '../features/user';

type RequestBody = {
    avatar: string;
};

export default new (class ChangeAvatar {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] ChangeAvatar Started');
        const body: RequestBody = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        if (!Utils.isValidUrl(body.avatar)) {
            Responder(res, 'error', null, 'Invalid Url.');
            return;
        }

        try {
            await user.setAvatarUrl(body.avatar);

            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[User] ChangeAvatar, ${error}`);
        }
        Log.debugApi('[V1] [User] ChangeAvatar Finished');
    };
})();
