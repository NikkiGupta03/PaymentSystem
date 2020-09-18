const connection = require('../config/config');
const sql = require('../config/sql');


exports.countryCurrencyList = (callback) => {
    var query = 'select country_master_id,country_name,country_code,country_currency from country_master';
    console.log("*******req",query);
    sql.executeSql(query, function (err, data) {
        if (!err) {
            let dbstatus = JSON.stringify(data);
            console.log('country details:', data);
            callback(null, dbstatus);
        }
        else {
            callback(err, null);
        }
    });

};
exports.MerchantList = (callback) => {
    var query = 'select merchant_type from merchant_master';
    console.log("*******req",query);
    sql.executeSql(query, function (err, data) {
        if (!err) {
            //let dbstatus = JSON.stringify(data[0][0]);
            console.log('country details:', data);
            callback(null, data);
        }
        else {
            callback(err, null);
        }
    });

};

exports.BankList = (callback) => {
    var query = 'select bank_id,bank_name,bank_code from bank_master';
    console.log("*******req",query);
    sql.executeSql(query, function (err, data) {
        if (!err) {
            // console.log('country details-:', data);
            callback(null, data);
        }
        else {
            callback(err, null);
        }
    });

};
exports.AddRecipient = function (serviceProviderCurrency, serviceProviderCategory, ProviderAccountHolderName, ProviderStreetAddress,BankName,AccountNumber,callback) {
    console.log('Retrive data:',serviceProviderCurrency, serviceProviderCategory, ProviderAccountHolderName, ProviderStreetAddress,BankName,AccountNumber);
      var query = 'CALL procedureAddServiceProvider("' + serviceProviderCurrency + '","' + serviceProviderCategory + '","' + ProviderAccountHolderName + '","' + ProviderStreetAddress + '","' + BankName + '","' + AccountNumber + '")';
    // var query = 'CALL procedureSecondarySentinelRegistration("' + referenceCode + '","' + firstName + '","' + lastName + '","' + emailId + '","' + deviceId + '","' + mobileNumber + '","' + locality + '","' + city + '","' + state + '","' + country + '","' + pinCode + '","' + gender + '","' + registrationLatitude + '","' + registrationLongitude + '","' + creationIp + '","'+encryptPassword+'","'+secondary_sentinel_type+'","'+registration_as+'")';
     sql.executeSql(query,function (err, data) {
         console.log('Querry Execution:', data);
         if (!err) {
             let dbstatus = JSON.stringify(data[0][0]);
             console.log('ProcedureAddRecipient:', dbstatus);
             callback(null, dbstatus);
         }
         else {
             callback(err, null);
         }
     });
 
 };

