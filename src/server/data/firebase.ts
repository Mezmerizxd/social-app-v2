import * as firebaseAdmin from 'firebase-admin';
import Log from '../utils/Log';
import Config from '../config';

export default new (class Firebase {
    public firebase: firebaseAdmin.app.App;
    public database: firebaseAdmin.database.Database;

    private firebaseKey: any;

    constructor() {
        if (Config.Env().firebaseEnabled === 'true') {
            this.firebaseKey = {
                type: Config.Env().firebaseType,
                project_id: Config.Env().firebaseProjectId,
                private_key_id: Config.Env().firebasePrivateKeyId,
                private_key: Config.Env().firebasePrivateKey,
                client_email: Config.Env().firebaseClientEmail,
                client_id: Config.Env().firebaseClientId,
                auth_uri: Config.Env().firebaseAuthUri,
                token_uri: Config.Env().firebaseTokenUri,
                auth_provider_x509_cert_url:
                    Config.Env().firebaseAuthProviderCertUrl,
                client_x509_cert_url: Config.Env().firebaseClientCertUrl,
            };
            try {
                this.firebase = firebaseAdmin.initializeApp({
                    credential: firebaseAdmin.credential.cert(this.firebaseKey),
                    databaseURL: Config.Env().firebaseDbUrl,
                });
                this.database = firebaseAdmin.database(this.firebase);
            } catch (error) {
                Log.error(`[Data] [Firebase] Something went wrong, ${error}`);
            }
        } else {
            Log.warn('[Data] [Firebase] Firebase is disabled.');
        }
    }

    public Test = async () => {
        if (Config.Env().firebaseEnabled === 'true') {
            const test = await this.database.getRulesJSON();
            if (test) {
                Log.debug('[Data] [Firebase] Test successful.');
            }
        } else {
            Log.warn(`[Data] [Firebase] Test failed, Firebase is not enabled.`);
        }
    };
})();
