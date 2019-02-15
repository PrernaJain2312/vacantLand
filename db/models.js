const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const db = new Sequelize( "vacantLanddb", "vacantLandUser", "vacantLandPass", {
    dialect: 'mysql'
})

const userBase = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

const landBank = db.define('land', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    State: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull:false
    },
    Cost: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    Image: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

db.sync().then(() => "Database created");

exports = module.exports = {
    db,
    userBase,
    landBank
}