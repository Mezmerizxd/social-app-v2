import { Request, Response } from 'express';
import Responder from '../responder';
import Firebase from '../../../data/firebase';
import * as sjcl from 'sjcl';
import Cfg from '../../../cfg';
import Log from '../../../utils/Log';

export default new (class Login {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] [Login] Started');
        const body: Server.V1.User.Req.Login = req.body;

        // Email value checks
        if (!body.email) {
            Responder(res, 'error', null, 'Email is required.');
            return;
        }

        // Password value checks
        if (!body.password) {
            Responder(res, 'error', null, 'Password is required.');
            return;
        }

        try {
            // Find user account
            const fbUserAccountRef = Firebase.database
                .ref(Cfg.Local().fbDbName)
                .child(Cfg.Local().fbDbUserAcccount)
                .orderByChild('email')
                .equalTo(body.email)
                .limitToFirst(1);
            const fbUserAccount = await fbUserAccountRef.get();

            // Verify account exists
            if (!fbUserAccount.toJSON()) {
                Responder(res, 'error', null, 'No account found.');
                return;
            }

            // Get account
            let userAccount: any;
            fbUserAccount.forEach((child) => {
                userAccount = child.toJSON();
            });

            // Verify emails match - if they do not match then thats worrying
            if (userAccount.email !== body.email) {
                Responder(res, 'error', null, 'Something went wrong');
                return;
            }

            // Encrypt password
            const encryptedPassword = sjcl.codec.hex.fromBits(
                sjcl.hash.sha256.hash(body.password)
            );

            // Verify passwords match
            if (userAccount.password !== encryptedPassword) {
                Responder(res, 'error', null, 'Password is incorrect');
                return;
            }

            // Find user data
            const fbUserDataRef = Firebase.database.ref(
                `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbUserData}/${
                    userAccount.userId
                }`
            );
            const fbUserData = await fbUserDataRef.get();

            // Verify user data exists
            if (!fbUserData.toJSON()) {
                Responder(res, 'error', null, 'No user data found.');
                return;
            }

            // Update last logged in date
            await fbUserDataRef.update({
                lastLoggedInDate: JSON.stringify(new Date()),
            });

            // Get user data
            let userData: any = fbUserData.toJSON();

            // Return data
            Responder(res, 'success', {
                userId: userData.userId,
                username: userData.username,
                authorization: userData.authorization,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[User] Login, ${error}`);
        }
        Log.debugApi('[V1] [User] [Login] Finished');
    };
})();
