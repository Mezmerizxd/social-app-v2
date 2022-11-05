import * as firebaseAdmin from 'firebase-admin';
import Log from '../utils/Log';
import Cfg from '../cfg';

export default new (class Firebase {
    public firebase: firebaseAdmin.app.App;
    public database: firebaseAdmin.database.Database;

    private firebaseKey: any;

    constructor() {
        if (Cfg.Env().firebaseEnabled === 'true') {
            this.firebaseKey = {
                type: Cfg.Env().firebaseType,
                project_id: Cfg.Env().firebaseProjectId,
                private_key_id: Cfg.Env().firebasePrivateKeyId,
                private_key: Cfg.Env().firebasePrivateKey,
                client_email: Cfg.Env().firebaseClientEmail,
                client_id: Cfg.Env().firebaseClientId,
                auth_uri: Cfg.Env().firebaseAuthUri,
                token_uri: Cfg.Env().firebaseTokenUri,
                auth_provider_x509_cert_url:
                    Cfg.Env().firebaseAuthProviderCertUrl,
                client_x509_cert_url: Cfg.Env().firebaseClientCertUrl,
            };
            try {
                this.firebase = firebaseAdmin.initializeApp({
                    credential: firebaseAdmin.credential.cert(this.firebaseKey),
                    databaseURL: Cfg.Env().firebaseDbUrl,
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
        if (Cfg.Env().firebaseEnabled === 'true') {
            const test = await this.database.getRulesJSON();
            if (test) {
                Log.debug('[Data] [Firebase] Test successful.');
            }
        }
    };
})();
