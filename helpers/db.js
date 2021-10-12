const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { databaseConfig } = require('config.js');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = databaseConfig;
    
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../modules/users/user.model')(sequelize);
    db.Promotion = require('../modules/promotions/promotion.model')(sequelize);
    db.Transaction = require('../modules/transactions/transaction.model')(sequelize);
    db.UserLog = require('../modules/user-logs/user-log.model')(sequelize);
    db.BlockedDevice = require('../modules/blocked-devices/blocked-device.model')(sequelize);
    db.BroadcastJoin = require('../modules/broadcast-joins/broadcast-join.model')(sequelize);
    db.Follower = require('../modules/followers/follower.model')(sequelize);
    db.MultiBeam = require('../modules/multi-beams/multi-beam.model')(sequelize);
    db.Supporter = require('../modules/supporters/supporter.model')(sequelize);
    db.Message = require('../modules/messages/message.model')(sequelize);
    db.HostRegistrationApplication = require('../modules/host-registration-applications/host-registration-application.model')(sequelize);

    //Relations
    // db.Message.belongsTo(db.User, { foreignKey: 'user_from', targetKey: 'user_id' });

    // sync all models with database
    await sequelize.sync();
}


// module.exports.db = function () {

//     const { host, port, user, password, database } = databaseConfig;
    
//     db = new Sequelize(database, user, password, { dialect: 'mysql' });

//     return db;
// };
