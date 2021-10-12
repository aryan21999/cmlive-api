const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        phone_number: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        device_token: { type: DataTypes.TEXT, allowNull: false },
        advertising_id: { type: DataTypes.TEXT, allowNull: true },
        
        top_trending: { type: DataTypes.INTEGER, allowNull: false, defaulValue: 0 },
        pk_points: { type: DataTypes.BIGINT, allowNull: false, defaulValue: 0 },
        pk_battle_status: { type: DataTypes.INTEGER, allowNull: true, defaulValue: 0 },
        match_mode: { type: DataTypes.STRING, allowNull: true },
        profile_frame: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },

        profile_userid: { type: DataTypes.BIGINT, allowNull: false },
        agency_id: { type: DataTypes.INTEGER, allowNull: false },
        available_coin: { type: DataTypes.BIGINT, allowNull: false },
        available_exp: { type: DataTypes.BIGINT, allowNull: false },
        live_status: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: false },
        block_type: { type: DataTypes.INTEGER, allowNull: false },
        location_status: { type: DataTypes.INTEGER, allowNull: false },
        reseller_account: { type: DataTypes.INTEGER, allowNull: false },

        profile_image: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        available_diamond: { type: DataTypes.BIGINT, allowNull: true },
        channel_name: { type: DataTypes.TEXT, allowNull: true },
        live_image: { type: DataTypes.STRING, allowNull: true },
        live_title: { type: DataTypes.STRING, allowNull: true },
        live_category: { type: DataTypes.STRING, allowNull: true },
        live_location: { type: DataTypes.STRING, allowNull: true },
        live_mode: { type: DataTypes.STRING, allowNull: true },
        block_reason: { type: DataTypes.TEXT, allowNull: true },
        live_time: { type: DataTypes.STRING, allowNull: true },
        pk_diamonds: { type: DataTypes.STRING, allowNull: true },
        live_hosts: { type: DataTypes.STRING, allowNull: true },
        live_uid: { type: DataTypes.STRING, allowNull: true },
        total_diamonds: { type: DataTypes.STRING, allowNull: true },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = {
        tableName: 'user',
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['password'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}
