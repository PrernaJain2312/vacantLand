const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL || "mysql://vacantLandUser:vacantLandPass@localhost:3306/vacantLanddb";

const SECRET_ACCESS_KEY = "your key";

const ACCESS_KEY_ID = "your key";

exports = module.exports = {PORT, DATABASE_URL, SECRET_ACCESS_KEY, ACCESS_KEY_ID};

