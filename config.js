const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL || "mysql://vacantLandUser:vacantLandPass@localhost:3306/vacantLanddb";

const SECRET_ACCESS_KEY =  "WOASZZLRvs5QYuaWc0cpgTeyKAloPYBzMs4/mFOE";

const ACCESS_KEY_ID = "AKIAIGB2RIIG7G4TAMRQ";

exports = module.exports = {PORT, DATABASE_URL, SECRET_ACCESS_KEY, ACCESS_KEY_ID};