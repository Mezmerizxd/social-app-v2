import MongoDb from './mongodb';
import MySql from './mysql';
import Firebase from './firebase';

export default new (class Data {
    public Initialize = async () => {
        MySql.Test();
        await MongoDb.Test();
        await Firebase.Test();
    };
})();
