"use strict";

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    //MLH Data
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    graduation: DataTypes.DATE,
    major: DataTypes.STRING,
    shirt_size: DataTypes.STRING,
    dietary_restrictions: DataTypes.STRING,
    special_needs: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    school: DataTypes.STRING,

    //Custom Data
    resume: DataTypes.BLOB,
    teamates: DataTypes.STRING,
    first_hackathon: DataTypes.BOOLEAN,
    sms_notifications: DataTypes.BOOLEAN,

    //Internal
    status: {type: DataTypes.STRING, defaultValue: 'pending'},
    travel: DataTypes.STRING
  });

  return Users;
};