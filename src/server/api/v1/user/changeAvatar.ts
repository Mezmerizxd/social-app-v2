import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';
import Utils from '../../../utils';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';

type RequestBody = {
    avatar: string;
};

export default new (class ChangeAvatar {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] ChangeAvatar Started');
        const body: RequestBody = req.body;

        if (
            (await (
                await Features.authorize(res, req.headers.authorization)
            ).authorized) === false
        )
            return;

        if (!Utils.isValidUrl(body.avatar)) {
            Responder(res, 'error', null, 'Invalid Url.');
            return;
        }

        try {
            const userData: any = await Features.getUserData(
                'authorization',
                req.headers.authorization
            );

            await Firebase.database
                .ref(
                    `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbUserData}/${
                        userData.userId
                    }/avatar`
                )
                .set(body.avatar);

            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[User] ChangeAvatar, ${error}`);
        }
        Log.debugApi('[V1] [User] ChangeAvatar Finished');
    };
})();
