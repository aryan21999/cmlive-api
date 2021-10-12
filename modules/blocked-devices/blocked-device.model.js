const { DataTypes, DATE } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        advertising_id: { type: DataTypes.TEXT, allowNull: true },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'blocked_device' };

    return sequelize.define('BlockedDevice', attributes, options);
}
