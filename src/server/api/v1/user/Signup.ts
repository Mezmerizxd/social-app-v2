import { Request, Response } from 'express';
import Responder from '../responder';
import Firebase from '../../../data/firebase';
import * as sjcl from 'sjcl';
import Features from '../generators';
import Cfg from '../../../cfg';
import Log from '../../../utils/Log';
import Email from '../../../utils/email';

type RequestBody = {
    email: string;
    username: string;
    password: string;
};

export default new (class Signup {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] [Signup] Started');
        const body: RequestBody = req.body;

        // Email value checks
        if (!body.email) {
            Responder(res, 'error', null, 'Email is required.');
            return;
        }
        if (!body.email.includes('@')) {
            Responder(res, 'error', null, 'Email is invalid.');
            return;
        }

        // Username value checks
        if (!body.username) {
            Responder(res, 'error', null, 'Username is required.');
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
        if (body.username.length < Cfg.UserApi().minUsernameLength) {
            Responder(
                res,
                'error',
                null,
                `Username must be more than ${
                    Cfg.UserApi().minUsernameLength
                } characters.`
            );
            return;
        }
        if (body.username.length > Cfg.UserApi().maxUsernameLength) {
            Responder(
                res,
                'error',
                null,
                `Username must be less than ${
                    Cfg.UserApi().maxUsernameLength
                } characters.`
            );
            return;
        }

        // Password value checks
        if (!body.password) {
            Responder(res, 'error', null, 'Password is required.');
            return;
        }
        if (body.password.length < Cfg.UserApi().minPasswordLength) {
            Responder(
                res,
                'error',
                null,
                `Password must be more than ${
                    Cfg.UserApi().minPasswordLength
                } characters.`
            );
            return;
        }

        try {
            // Find an account with matching emails
            const fbUserAccountRef = Firebase.database
                .ref(Cfg.Local().fbDbName)
                .child(Cfg.Local().fbDbUserAcccount)
                .orderByChild('email')
                .equalTo(body.email)
                .limitToFirst(1);
            const fbUserAccount = await fbUserAccountRef.get();

            // If account exists return error
            if (fbUserAccount.toJSON()) {
                Responder(res, 'error', null, 'Email is already in use.');
                return;
            }

            // Find user data with matching usernames
            const fbUserDataRef = Firebase.database
                .ref(Cfg.Local().fbDbName)
                .child(Cfg.Local().fbDbUserData)
                .orderByChild('username')
                .equalTo(body.username)
                .limitToFirst(1);
            const fbUserData = await fbUserDataRef.get();

            // If user data exists return error
            if (fbUserData.toJSON()) {
                Responder(res, 'error', null, 'Username is already in use.');
                return;
            }

            // Generate a user id
            const userId = await Features.generateUserId();
            if (!userId?.data) {
                Responder(res, 'error', null, 'Something went wrong.');
                return;
            }

            // Generate a authorization token
            const authorization = await Features.generateAuthorization();
            if (!authorization?.data) {
                Responder(res, 'error', null, 'Something went wrong.');
                return;
            }

            // Encrypt password
            const encryptedPassword = sjcl.codec.hex.fromBits(
                sjcl.hash.sha256.hash(body.password)
            );

            // create 40 character verification code
            const verificationCode = await Features.generateVerificationCode();
            if (!verificationCode?.data) {
                Responder(res, 'error', null, 'Something went wrong.');
                return;
            } else {
                Email.EmailVerification(body.email, verificationCode.data);
            }

            // Set data
            const CreationTimeStamp = JSON.stringify(new Date());
            const NewAccountData = {
                userId: userId.data,
                email: body.email,
                password: encryptedPassword,
                verificationCode: verificationCode.data,
            };
            const NewUserData = {
                email: body.email,
                userId: userId.data,
                authorization: authorization.data,
                username: body.username,
                avatar: 'https://i.pravatar.cc/300',
                accountCreationDate: CreationTimeStamp,
                lastLoggedInDate: CreationTimeStamp,
                verifiedEmail: false,
                verifiedUser: false,
            };

            // Insert account data
            const newFbUserAccountRef = Firebase.database.ref(
                `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbUserAcccount}/${
                    userId.data
                }`
            );
            await newFbUserAccountRef.set(NewAccountData);

            // Insert user data
            const newFbUserDataRef = Firebase.database.ref(
                `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbUserData}/${
                    userId.data
                }`
            );
            await newFbUserDataRef.set(NewUserData);

            // Return data
            Responder(res, 'success', {
                authorization: authorization.data,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[User] Signup, ${error}`);
        }
        Log.debugApi('[V1] [User] [Signup] Finished');
    };
})();
