import Log from '../../utils/Log';
import Firebase from '../../data/firebase';
import * as crypto from 'crypto';
import Cfg from '../../cfg';

export default new (class Features {
    private generators_max_id_size = 999999999999999;
    private generators_max_token_byte = 64;
    private generators_max_verification_code_byte = 40;
    private generators_max_attempts = 5;

    public generateUserId = async (): Promise<Server.V1.GeneratorsReturn> => {
        Log.debug('[API] [V1] [Features] GenerateUserId - started');
        let created = false;
        let id: number = 0;
        let attempts = 0;
        try {
            while (!created) {
                id = Math.floor(Math.random() * this.generators_max_id_size);
                if (attempts === this.generators_max_attempts) {
                    Log.error('[API] [V1] [Features] UserId - max attempts');
                    return { data: null };
                }
                const fbUserAccount = Firebase.database.ref(
                    `${Cfg.Local().fbDbName}/${
                        Cfg.Local().fbDbUserAcccount
                    }/${id}`
                );
                const fbUserDataResp = (await fbUserAccount.get()).toJSON();
                if (!fbUserDataResp) created = true;
                attempts += 1;
            }
        } catch (error) {
            Log.error('[API] [V1] [Features] GenerateUserId,', error);
        }
        Log.debug('[API] [V1] [Features] GenerateUserId - finished');
        return { data: id };
    };

    public generateAuthorization =
        async (): Promise<Server.V1.GeneratorsReturn> => {
            Log.debug('[API] [V1] [Features] GenerateAuthorization - started');
            let created = false;
            let token: string = '';
            let attempts = 0;
            try {
                while (!created) {
                    token = crypto
                        .randomBytes(this.generators_max_token_byte)
                        .toString('hex');
                    if (attempts === this.generators_max_attempts) {
                        Log.error(
                            '[API] [V1] [Features] AuthorizationToken - max attempts'
                        );
                        return { data: null };
                    }
                    const fbUserData = Firebase.database
                        .ref(`${Cfg.Local().fbDbName}/`)
                        .child(Cfg.Local().fbDbUserData)
                        .orderByChild('authorization')
                        .equalTo(token)
                        .limitToFirst(1);
                    const fbUserDataResp = (await fbUserData.get()).toJSON();
                    if (!fbUserDataResp) created = true;
                    attempts += 1;
                }
            } catch (error) {
                Log.error(
                    '[API] [V1] [Features] GenerateAuthorization,',
                    error
                );
            }
            Log.debug('[API] [V1] [Features] GenerateAuthorization - finished');
            return { data: token };
        };

    public generateMessageId =
        async (): Promise<Server.V1.GeneratorsReturn> => {
            Log.debug('[API] [V1] [Features] GenerateMessageId - started');
            let created = false;
            let id: number = 0;
            let attempts = 0;
            try {
                while (!created) {
                    id = Math.floor(
                        Math.random() * this.generators_max_id_size
                    );
                    if (attempts === this.generators_max_attempts) {
                        Log.error(
                            '[API] [V1] [Features] MessageId - max attempts'
                        );
                        return { data: null };
                    }
                    const fbMessages = Firebase.database
                        .ref(`${Cfg.Local().fbDbName}/`)
                        .child(Cfg.Local().fbDbMessages)
                        .child('messages')
                        .orderByChild('messageId')
                        .equalTo(id)
                        .limitToFirst(1);
                    const fbUserDataResp = (await fbMessages.get()).toJSON();
                    if (!fbUserDataResp) created = true;
                    attempts += 1;
                }
            } catch (error) {
                Log.error('[API] [V1] [Features] GenerateMessageId,', error);
            }
            Log.debug('[API] [V1] [Features] GenerateMessageId - finished');
            return { data: id };
        };

    public generateVerificationCode =
        async (): Promise<Server.V1.GeneratorsReturn> => {
            Log.debug(
                '[API] [V1] [Features] GenerateVerificationCode - started'
            );
            let created = false;
            let code: string = '';
            let attempts = 0;
            try {
                while (!created) {
                    code = crypto
                        .randomBytes(this.generators_max_verification_code_byte)
                        .toString('hex');
                    if (attempts === this.generators_max_attempts) {
                        Log.error(
                            '[API] [V1] [Features] VerificationCode - max attempts'
                        );
                        return { data: null };
                    }
                    const fbUserData = Firebase.database
                        .ref(`${Cfg.Local().fbDbName}/`)
                        .child(Cfg.Local().fbDbUserAcccount)
                        .orderByChild('verificationCode')
                        .equalTo(code)
                        .limitToFirst(1);
                    const fbUserDataResp = (await fbUserData.get()).toJSON();
                    if (!fbUserDataResp) created = true;
                    attempts += 1;
                }
            } catch (error) {
                Log.error(
                    '[API] [V1] [Features] GenerateVerificationCode,',
                    error
                );
            }
            Log.debug(
                '[API] [V1] [Features] GenerateVerificationCode - finished'
            );
            return { data: code };
        };
})();
