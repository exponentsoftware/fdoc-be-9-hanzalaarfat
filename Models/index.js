const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //logging: false, // true hone par query trminal par print kreage false me nhi krega
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.todo = require("./Todo")(sequelize, Sequelize);
db.view = require("./Views")(sequelize, Sequelize);
db.like = require("./Like")(sequelize, Sequelize);
db.rating = require("./Rating")(sequelize, Sequelize);
// db.activeuser = require("./ActiveUser")(sequelize, Sequelize);
db.comment = require("./Comment")(sequelize, Sequelize);
// db.tag = require("./Tag")(sequelize, Sequelize);

// db.admin = require("./Admin")(sequelize, Sequelize);

// db.user.belongsToMany(db.todo, { through: "userId" });
// db.todo.belongsToMany(db.user, { through: "userId" });
db.user.hasMany(db.todo, { as: "todoDetails", foreignKey: "userId" });

// db.user.hasMany(db.todo, { foreignKey: "userId", as: "todoDetails" });
// db.todo.belongsTo(db.user, { foreignKey: "userId", as: "userDetails" });
db.todo.hasMany(db.comment);

// db.todo.hasMany(db.user, { as: "todo" });
// db.user.belongsTo(db.todo, { foreignKey: "TodoId", as: "user" });

//db.todo.belongsTo(db.user);
// db.user.hasMany(db.todo);
// db.todo.hasMany(db.todo);

module.exports = db;
