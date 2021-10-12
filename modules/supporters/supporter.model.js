const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_from: { type: DataTypes.INTEGER, allowNull: false },
        user_to: { type: DataTypes.INTEGER, allowNull: false },
        diamond_received: { type: DataTypes.BIGINT, allowNull: false },
        channel_name: { type: DataTypes.STRING, allowNull: false },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = {  };

    return sequelize.define('Supporter', attributes, options);
}
