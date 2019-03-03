const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const config = require('../config');

const db = new Sequelize(config.DATABASE_URL)


// const db = new Sequelize( "vacantLanddb", "vacantLandUser", "vacantLandPass", {
//     dialect: 'mysql'
// })

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
        type: DataTypes.INTEGER,
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
        allowNull:true,
        defaultValue:"false"
    }
})

const imageBank = db.define('image', {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('imageUrl').split(',')
        },
        set(val) {
            this.setDataValue('imageUrl',val.join(','));
        },
    }
})

imageBank.belongsTo(landBank)

landBank.hasMany(imageBank)


db.sync().then(() => "Database created");

exports = module.exports = {
    db,
    userBase,
    landBank,
    imageBank
}