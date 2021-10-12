const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        follow_to: { type: DataTypes.INTEGER, allowNull: false },
        follow_by: { type: DataTypes.INTEGER, allowNull: false },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'follower' };

    return sequelize.define('Follower', attributes, options);
}
