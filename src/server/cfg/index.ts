import * as dotenv from 'dotenv';
import * as path from 'path';

type EnvReturn = {
    port: any;
    socketPort: any;
    // MySql
    mySqlEnabled: any;
    mySqlHost: any;
    mySqlDevHost: any;
    mySqlUser: any;
    mySqlDevUser: any;
    mySqlPaswd: any;
    mySqlDevPaswd: any;
    mySqlDb: any;
    mySqlDevDb: any;
    // MongoDb
    mongoDbEnabled: any;
    mongoDbHost: any;
    mongoDbDevHost: any;
    mongoDbDb: any;
    mongoDbDevDb: any;
    // Firebase
    firebaseEnabled: any;
    firebaseDbUrl: any;
    firebaseType: any;
    firebaseProjectId: any;
    firebasePrivateKeyId: any;
    firebasePrivateKey: any;
    firebaseClientEmail: any;
    firebaseClientId: any;
    firebaseAuthUri: any;
    firebaseTokenUri: any;
    firebaseAuthProviderCertUrl: any;
    firebaseClientCertUrl: any;
};

type LocalReturn = {
    fbDbName: string;
    fbDbUserAcccount: string;
    fbDbUserData: string;
    fbDbMessages: string;
};

type UserApiReturn = {
    maxUsernameLength: number;
    minUsernameLength: number;
    minPasswordLength: number;
    illegalUsernameCharacters: string[];
};

export default new (class Cfg {
    public Env = (): EnvReturn => {
        dotenv.config({ path: path.join(__dirname, '../../../.env') });
        return {
            port: process.env.PORT,
            socketPort: process.env.SOCKET_PORT,
            // MySql
            mySqlEnabled: process.env.ENABLE_MYSQL,
            mySqlHost: process.env.MYSQL_HOST,
            mySqlDevHost: process.env.MYSQL_DEV_HOST,
            mySqlUser: process.env.MYSQL_USER,
            mySqlDevUser: process.env.MYSQL_DEV_USER,
            mySqlPaswd: process.env.MYSQL_PASSWORD,
            mySqlDevPaswd: process.env.MYSQL_DEV_PASSWORD,
            mySqlDb: process.env.MYSQL_DATABASE,
            mySqlDevDb: process.env.MYSQL_DEV_DATABASE,
            // MongoDb
            mongoDbEnabled: process.env.ENABLE_MONGODB,
            mongoDbHost: process.env.MONGODB_HOST,
            mongoDbDevHost: process.env.MONGODB_DEV_HOST,
            mongoDbDb: process.env.MONGODB_DATABASE,
            mongoDbDevDb: process.env.MONGODB_DEV_DATABASE,
            // Firebase
            firebaseEnabled: process.env.ENABLE_FIREBASE,
            firebaseDbUrl: process.env.FIREBASE_DATABASE_URL,
            firebaseType: process.env.FIREBASE_TYPE,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebasePrivateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
            firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY
                ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
                : undefined,
            firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            firebaseClientId: process.env.FIREBASE_CLIENT_ID,
            firebaseAuthUri: process.env.FIREBASE_AUTH_URI,
            firebaseTokenUri: process.env.FIREBASE_TOKEN_URI,
            firebaseAuthProviderCertUrl:
                process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            firebaseClientCertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        };
    };

    public Local = (): LocalReturn => {
        return {
            fbDbName: 'social_app_v2',
            fbDbUserAcccount: 'user_account',
            fbDbUserData: 'user_data',
            fbDbMessages: 'messages',
        };
    };

    public UserApi = (): UserApiReturn => {
        return {
            maxUsernameLength: 12,
            minUsernameLength: 1,
            minPasswordLength: 6,
            illegalUsernameCharacters: [
                '<',
                '>',
                '?',
                '.',
                ',',
                "'",
                '"',
                ';',
                ':',
                ']',
                '[',
                '{',
                '}',
                '+',
                '=',
                '-',
                '_',
                '(',
                ')',
                '*',
                '&',
                '^',
                '%',
                '$',
                '#',
                '@',
                '!',
                '/',
                '\\',
                '|',
            ],
        };
    };
})();
