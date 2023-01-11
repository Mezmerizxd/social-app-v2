import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';
import User from '../features/user';

export default new (class VerifyEmail {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Account] VerifyEmail Started');
        const body = req.body;
        const code: any = req.query.code;

        // check url parameter code
        if (!code || code === '') {
            Responder(res, 'error', null, 'No code provided.');
            return;
        }

        try {
            const fbUserData = Firebase.database
                .ref(`${Cfg.Local().fbDbName}/`)
                .child(Cfg.Local().fbDbUserAcccount)
                .orderByChild('verificationCode')
                .equalTo(code)
                .limitToFirst(1);
            let fbResData: any = null;
            (await fbUserData.get()).forEach((child: any) => {
                fbResData = child.toJSON();
            });

            if (!fbResData) {
                Responder(res, 'error', null, 'Email already verified.');
                return;
            }

            // Get userId from data above
            let userId: number = fbResData.userId;

            const user = new User(userId, 'userId');
            await user.init();
            if (!user.data()) {
                Responder(res, 'error', null, 'User not found.');
                return;
            }

            await user.setIsEmailVerified(true);

            await Firebase.database
                .ref(
                    `${Cfg.Local().fbDbName}/${
                        Cfg.Local().fbDbUserAcccount
                    }/${userId}/verificationCode`
                )
                .set(null);

            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[Account] VerifyEmail, ${error}`);
        }
        Log.debugApi('[V1] [Account] VerifyEmail Finished');
    };
})();
