const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        broadcaster_level: { type: DataTypes.STRING, allowNull: false },
        vip_level: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        picture: { type: DataTypes.STRING, allowNull: false },
        time: { type: DataTypes.STRING, allowNull: false },
        channel_name: { type: DataTypes.STRING, allowNull: false },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'broadcast_join' };

    return sequelize.define('BroadcastJoin', attributes, options);
}
