import * as mongo from 'mongodb';
import Log from '../utils/Log';
import Cfg from '../cfg';

export default new (class MongoDb {
    private host: string;
    private options: any;
    private client: mongo.MongoClient;

    constructor() {
        if (Cfg.Env().mongoDbEnabled === 'true') {
            this.host =
                process.env.NODE_ENV === 'production'
                    ? Cfg.Env().mongoDbHost
                    : Cfg.Env().mongoDbDevHost;
            this.options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: '1',
                connectTimeoutMS: 30000,
                keepAlive: true,
            };
            this.client = new mongo.MongoClient(this.host, this.options);
            try {
                this.client
                    .connect()
                    .then(() => {
                        Log.info('[Data] [MongoDb] Connection established.');
                    })
                    .catch((err) => {
                        Log.warn(`[Data] [MongoDb] Connection error, ${err}`);
                    });
            } catch (error) {
                Log.error(`[Data] [MongoDb] Something went wrong, ${error}`);
            }
        } else {
            Log.warn('[Data] [MongoDb] MongoDb is disabled.');
        }
    }

    public Query = async (
        collection: string,
        callback: (collection: any) => any
    ) => {
        if (Cfg.Env().mongoDbEnabled === 'true') {
            try {
                await this.client.connect();
                const mongoCollection = this.client
                    .db(
                        process.env.NODE_ENV === 'production'
                            ? Cfg.Env().mongoDbDb
                            : Cfg.Env().mongoDbDevDb
                    )
                    .collection(collection);
                return await callback(mongoCollection);
            } catch (error) {
                Log.error(`[Data] [MongoDb] Query error, ${error}`);
            } finally {
                await this.client.close();
            }
        }
    };

    public Test = async () => {
        if (Cfg.Env().mongoDbEnabled === 'true') {
            try {
                await this.client.connect();
                const mongo = this.client.db(
                    process.env.NODE_ENV === 'production'
                        ? Cfg.Env().mongoDbDb
                        : Cfg.Env().mongoDbDevDb
                );
                if (mongo) {
                    Log.debug('[Data] [MongoDb] Test successful.');
                }
            } catch (error) {
                Log.warn(`[Data] [MongoDb] Test failed, ${error}`);
            } finally {
                await this.client.close();
            }
        }
    };
})();
