const connection = require('../config/config');
const sql = require('../config/sql');
const sha256 = require('sha256');


    exports.Registration = function(firstName, lastName, email_Id, password, callback) {
    var encryptPassword = sha256(password);
    console.log('encrypt:', encryptPassword);
    // var sql = "INSERT INTO user_master(first_name, last_name, user_name, encrypt_password,mobile_number, gender_id, locality_master_id, city_master_id, state_master_id,country_master_id, pincode, registration_latitude, registration_longitude, subscription_end_date, subscription_type, subscription_start_date, otp,otp_creation_datetime, is_active, creation_ip, creation_date) VALUES()";
    var query = 'CALL ProcedureUserRegistration("' + firstName + '","' + lastName + '","' + email_Id + '","' + encryptPassword + '")';
    sql.executeSql(query, function (err, data) {
        if (!err) {
            var dbstatus = JSON.stringify(data[0][0]);
            console.log('User Registration:', dbstatus, query);
            callback(null, dbstatus);
        }
        else {
            console.log('Querry execution error', err)
            callback(err, null);
        }
    });
}

exports.Login = function (email_Id, password, callback) {
    var passwordHash = sha256(password);
    var query = 'CALL procedureUserLogin("' + email_Id + '","' + passwordHash + '")';
    console.log('User login:', query);
    sql.executeSql(query,function (err, data) {
           if (!err) {
            
            let dbstatus = JSON.stringify(data[0][0]);
            console.log('Login value:', dbstatus);
            callback(null, dbstatus); 
        }       
        else {
            callback(err, null);
        }        

    });
}
exports.merchantDetails = (callback) => {
    var query = 'select service_provider_name,provider_bank_name,service_provider_category,service_provider_currency,provider_account_number,service_provider_id from service_provider_master';
    console.log("*******req",query);
    sql.executeSql(query, function (err, data) {
        if (!err) {
            let dbstatus = JSON.stringify(data);
            console.log('merchantDetails', data);
            callback(null, dbstatus);
        }
        else {
            callback(err, null);
        }
    });

};

// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email_Id: String,
//     Password: String,
//     created_at: { type: Date },
//     updated_at: { type: Date, default: Date.now },

// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('User', userSchema);