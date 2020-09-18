module.exports = (app) => {
    const payment = require('../controller/payment.js');
    const user = require('../controller/user')

    app.post('/payment', payment.createPayment);
    app.get('/getList', payment.getList);
    app.post('/register', user.signup);
    app.post('/login', user.login);
    app.post('/addServiceProvider', payment.AddRecipient);
    app.get('/countryCurrencyList', payment.countryCurrencyList);
    app.get('/MerchantList', payment.MerchantList);
    app.get('/BankList', payment.BankList);
    app.get('/getMerchantDetails', user.merchantDetails);


    // app.get('/MerchantList', payment.MerchantList);
    // app.post('/userProfile', user.userProfile);
    // app.post('/deleteList', user.deleteList)



}