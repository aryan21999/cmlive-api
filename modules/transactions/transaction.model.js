const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        transaction_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.DECIMAL, allowNull: false },
        coin_diamond: { type: DataTypes.INTEGER, allowNull: false },
        type: { type: DataTypes.INTEGER, allowNull: false },
        transaction_statement: { type: DataTypes.TEXT, allowNull: false },
        transaction_date: { type: DataTypes.DATE, allowNull: false, defaulValue: Date.now },
        createdAt: { field: 'created_at', type: DataTypes.DATE, defaulValue: Date.now },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE, defaulValue: Date.now }
    };

    const options = { tableName: 'transaction' };

    return sequelize.define('Transaction', attributes, options);
}
