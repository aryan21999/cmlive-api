const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        application_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        mobile_number: { type: DataTypes.STRING, allowNull: true },
        country: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        national_id_number: { type: DataTypes.STRING, allowNull: true },
        national_id_image: { type: DataTypes.STRING, allowNull: true },
        agency_code: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.INTEGER, allowNull: true },
        submission_date: { type: DataTypes.DATE, allowNull: true },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'host_registration_application' };

    return sequelize.define('Follower', attributes, options);
}
