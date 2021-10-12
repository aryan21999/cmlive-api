const { DataTypes, DATE } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        promotion_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
        event_title: { type: DataTypes.STRING, allowNull: true },
        event_desc: { type: DataTypes.STRING, allowNull: false },
        start_date: { type: DataTypes.STRING, allowNull: false },
        end_date: { type: DataTypes.STRING, allowNull: false },
        banner_image: { type: DataTypes.STRING, allowNull: true },
        rule_image: { type: DataTypes.STRING, allowNull: true },
        reward_image: { type: DataTypes.STRING, allowNull: true },
        category_id: { type: DataTypes.BIGINT, defaulValue: 0 },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = {  };

    return sequelize.define('Promotion', attributes, options);
}
