const { DataTypes, DATE } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        device_name: { type: DataTypes.STRING, allowNull: false },
        log_time: { type: DataTypes.DATE, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'user_log' };

    return sequelize.define('UserLog', attributes, options);
}
