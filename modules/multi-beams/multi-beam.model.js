const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        channel_name: { type: DataTypes.STRING, allowNull: true },
        host_uid: { type: DataTypes.STRING, allowNull: true },
        uid: { type: DataTypes.STRING, allowNull: true },
        user_id: { type: DataTypes.STRING, allowNull: true },
        camera_enable: { type: DataTypes.INTEGER, allowNull: true },
        position: { type: DataTypes.INTEGER, allowNull: true },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'multi_beam' };

    return sequelize.define('MultiBeam', attributes, options);
}
