const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        message_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
        user_from: { type: DataTypes.INTEGER, allowNull: false },
        user_to: { type: DataTypes.INTEGER, allowNull: false },
        conversation_id: { type: DataTypes.STRING, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: false },
        added_time: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        file_type: { type: DataTypes.STRING, allowNull: false },
        seen: { type: DataTypes.INTEGER, allowNull: false },
        agora_peer_id: { type: DataTypes.STRING, allowNull: false },
        agora_id: { type: DataTypes.STRING, allowNull: false },
        gift_image: { type: DataTypes.STRING, allowNull: false },
        coins: { type: DataTypes.BIGINT, allowNull: false },
        diamonds: { type: DataTypes.BIGINT, allowNull: false },
        deleted_by: { type: DataTypes.INTEGER, allowNull: true },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'message' };

    return sequelize.define('Message', attributes, options);
}
