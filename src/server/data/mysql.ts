import * as mysql from 'mysql2';
import * as util from 'util';
import Log from '../utils/Log';
import Cfg from '../cfg';

export default new (class MySql {
    private host: string;
    private user: string;
    private password: string;
    private database: string;
    private connection: mysql.Connection;
    private connected: boolean;

    constructor() {
        if (Cfg.Env().mySqlEnabled === 'true') {
            this.host =
                process.env.NODE_ENV === 'production'
                    ? Cfg.Env().mySqlHost
                    : Cfg.Env().mySqlDevHost;
            this.user =
                process.env.NODE_ENV === 'production'
                    ? Cfg.Env().mySqlUser
                    : Cfg.Env().mySqlDevUser;
            this.password =
                process.env.NODE_ENV === 'production'
                    ? Cfg.Env().mySqlPaswd
                    : Cfg.Env().mySqlDevPaswd;

            this.database =
                process.env.NODE_ENV === 'production'
                    ? Cfg.Env().mySqlDb
                    : Cfg.Env().mySqlDevDb;

            this.connection = mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
            });

            this.connection.connect((err) => {
                if (err) {
                    Log.warn(`[Data] [MySql] Connection error, ${err.message}`);
                    return;
                }
                this.connected = true;
                Log.info('[Data] [MySql] Connection established.');
            });
        } else {
            Log.warn('[Data] [MySql] MySql is disabled.');
        }
    }

    public Query = (query: string, callback?: (results: any) => void) => {
        if (Cfg.Env().mySqlEnabled === 'true' && this.connected) {
            try {
                this.connection.execute(query, (err: any, results: any) => {
                    if (err) {
                        Log.error(`[Data] [MySql] Query error, ${err.message}`);
                        return;
                    }
                    if (callback) callback(results);
                    return results;
                });
            } catch (error) {
                Log.error(`[Data] [MySql] Something went wrong, ${error}`);
            }
        }
    };

    public QueryAsync = async (query: string) => {
        if (Cfg.Env().mySqlEnabled === 'true' && this.connected) {
            try {
                const promisql = util
                    .promisify(this.connection.query)
                    .bind(this.connection);
                const result = promisql(query);
                return result;
            } catch (error) {
                Log.error(`[Data] [MySql] Something went wrong, ${error}`);
            }
        }
    };

    public Test = () => {
        if (Cfg.Env().mySqlEnabled === 'true') {
            this.connection = mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
            });

            this.connection.connect((err) => {
                if (err) {
                    Log.warn(`[Data] [MySql] Test failed, ${err.message}`);
                    return;
                }
                this.connected = true;
                Log.debug('[Data] [MySql] Test successful.');
            });
        }
    };
})();
