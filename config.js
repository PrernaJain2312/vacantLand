const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL || "mysql://vacantLandUser:vacantLandPass@localhost:3306/vacantLanddb"

exports = module.exports = {PORT, DATABASE_URL}