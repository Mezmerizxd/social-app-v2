import Log from '../../utils/Log';
import Firebase from '../../data/firebase';
import * as crypto from 'crypto';

type GenerateReturn = {
    data: any;
};

export default new (class Features {
    private generators_max_id_size = 999999999999999;
    private generators_max_token_byte = 64;
    private generators_max_attempts = 5;

    public GenerateUserId = async (): Promise<GenerateReturn> => {
        Log.debug('[API/V1] [Features] GenerateUserId - started');
        let created = false;
        let id: number = 0;
        let attempts = 0;
        while (!created) {
            id = Math.floor(Math.random() * this.generators_max_id_size);
            if (attempts === this.generators_max_attempts) {
                Log.error('[Generator] UserId - max attempts');
                return { data: null };
            }
            const fbUserAccount = Firebase.database.ref(
                `social_app_v2/user_accounts/${id}`
            );
            const fbUserDataResp = (await fbUserAccount.get()).toJSON();
            if (!fbUserDataResp) created = true;
            attempts += 1;
        }
        Log.debug('[API/V1] [Features] GenerateUserId - finished');
        return { data: id };
    };

    public GenerateAuthorization = async (): Promise<GenerateReturn> => {
        Log.debug('[API/V1] [Features] GenerateAuthorization - started');
        let created = false;
        let token: string = '';
        let attempts = 0;
        while (!created) {
            token = crypto
                .randomBytes(this.generators_max_token_byte)
                .toString('hex');
            if (attempts === this.generators_max_attempts) {
                Log.error('[Generator] AuthorizationToken - max attempts');
                return { data: null };
            }
            const fbUserData = Firebase.database
                .ref(`social_app_v2/`)
                .child('user_data')
                .orderByChild('authorization')
                .equalTo(token)
                .limitToFirst(1);
            const fbUserDataResp = (await fbUserData.get()).toJSON();
            if (!fbUserDataResp) created = true;
            attempts += 1;
        }
        Log.debug('[API/V1] [Features] GenerateAuthorization - finished');
        return { data: token };
    };
})();
