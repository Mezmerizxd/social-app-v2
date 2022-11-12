import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';

type RequestBody = {
    method: string;
    key: any;
};

export default new (class GetUserData {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] GetUserData Started');
        const body: RequestBody = req.body;

        try {
            if (!body.method) {
                Responder(res, 'error', null, 'A method is required.');
                return;
            }

            if (!body.key) {
                Responder(res, 'error', null, 'A key is required.');
                return;
            }

            const userData = await Features.getUserData(body.method, body.key);

            if (userData.error) {
                Responder(res, 'error', null, 'No user found.');
                return;
            }

            // Return data, send all the data if the requeter is requesting their own account.
            if (req.headers.authorization === userData.authorization) {
                Responder(res, 'success', userData);
            } else {
                Responder(res, 'success', {
                    userId: userData.userId,
                    username: userData.username
                });
            }
            
        } catch (error) {
            Responder(res, 'catch', null, `[User] GetUserData, ${error}`);
        }
        Log.debugApi('[V1] [User] GetUserData Finished');
    };
})();
