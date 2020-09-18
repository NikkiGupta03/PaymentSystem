// const config = require('../config/config')
const userModel = require('../models/user.model');
const paymentModel = require('../models/payment');
const stripe = require('stripe')(Secret_Key)
// https://appdividend.com/2018/11/11/react-crud-example-mern-stack-tutorial/


exports.createPayment = (req, res, next) => {
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: '',
        address: {
            line1: 'noida',
            postal_code: '201301',
            city: 'Noida',
            state: 'Uttar Pradesh',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 100,     // Charing Rs 25 
                description: 'Web Development Product',
                currency: 'INR',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success")  // If no error occurs 
        })
        .catch((err) => {
            res.send(err)       // If some error occurs 
        });
};

exports.getList = (req, res) => {
    stripe.balanceTransactions.list(
        { limit: 3 }).then((list) => {
            console.log('listNikki', list);
            return res.send({ 200: 'success', list });
        }).catch((err) => {
            return err;
        })
}

exports.countryCurrencyList = (req, res, next) => {
    try {
        paymentModel.countryCurrencyList(function (err, data) {
            let parsedata = JSON.parse(data);
            if (err) {
                // logger.info(`countryMasterDetails ${constantStringmessage.serverErrMessage}`);
                return res.json({ statusCode: '400', msg: 'error' });
            } else {
                console.log('=====Retrive data from database:', data);
                return res.json({ statusCode: '200', response: parsedata });
            }
        });
    } catch (error) {
        console.log(error);
        // logger.info(`countryMasterDetailsException ${error}`);
        return res.json({ statusCode: '400', msg: 'Error in country master. Please contact herDum systems.' });
    }

};
exports.MerchantList = (req, res, next) => {
    try {
        paymentModel.MerchantList(function (err, data) {
            if (err) {
                // logger.info(`countryMasterDetails ${constantStringmessage.serverErrMessage}`);
                return res.json({ statusCode: '400', msg: 'error' });
            } else {
                console.log('=====Retrive data from database:', data);
                return res.json({ statusCode: '200', response: data });
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({ statusCode: '400', msg: 'Error in country master. Please contact herDum systems.' });
    }

};
exports.BankList = (req, res, next) => {
    try {
        paymentModel.BankList(function (err, data) {
            if (err) {
                return res.json({ statusCode: '400', msg: 'error' });
            } else {
                console.log('=====Retrive data from database:', data);
                return res.json({ statusCode: '200', response: data });
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({ statusCode: '400', msg: 'Error in country master. Please contact herDum systems.' });
    }

};

exports.AddRecipient = (req, res, next) => {
    try {
        console.log('Request Parameters:', req.body)
        let serviceProviderCurrency = req.body.serviceProviderCurrency;
        let serviceProviderCategory = req.body.serviceProviderCategory;
        let ProviderAccountHolderName = req.body.ProviderAccountHolderName;
        let ProviderStreetAddress = req.body.ProviderStreetAddress;
        let BankName = req.body.BankName;
        let AccountNumber = req.body.AccountNumber
        // let ProviderEmail = req.body.ProviderEmail;
        // let ProviderPhoneNumber = req.body.ProviderPhoneNumber;
        // let ProviderGetsAmount  = req.body.ProviderGetsAmount;
        // let PaymentReference = req.body.PaymentReference;
        // let PaymentArrivalDate  = req.body.PaymentArrivalDate;
        // let ProviderPhoneNumber = req.body.ProviderPhoneNumber;
        // let ProviderPhoneNumber = req.body.ProviderPhoneNumber;

        // console.log('sha256 encryption:', encryptPassword);
        // serviceProviderCurrency == null || serviceProviderCurrency == undefined || serviceProviderCurrency == "" || serviceProviderCategory == null || serviceProviderCategory == undefined || serviceProviderCategory == "" || BankName == null || BankName == undefined || BankName == "" 
        if (AccountNumber == null || AccountNumber == undefined || AccountNumber == "" || ProviderAccountHolderName == null || ProviderAccountHolderName == undefined || ProviderAccountHolderName == "" || ProviderStreetAddress == null || ProviderStreetAddress == undefined || ProviderStreetAddress == "") {
            return res.json({ statusCode: '402', msg: 'Please enter all details.' });

        } else {
            paymentModel.AddRecipient(serviceProviderCurrency, serviceProviderCategory, ProviderAccountHolderName, ProviderStreetAddress, BankName, AccountNumber, function (err, data) {
                try {
                    let parsedata = JSON.parse(data);
                    if (err) {
                        // logger.info(`exSecondarySentinelRegistration ${constantStringmessage.serverErrMessage}`);
                        return res.json({ statusCode: '400', msg: 'server error' });

                    }
                    else if (parsedata.success_flag == 415) {
                        // logger.info(`exSecondarySentinelRegistration IRA'S Angel already registered.`);
                        return res.json({ statusCode: '415', msg: "already exists." });

                    }
                    else {
                        return res.json({ statusCode: '201', msg: "successfull.", response: parsedata });

                    }
                } catch (err) {
                    console.log(err);
                    // logger.info(`exSecondarySentinelRegistrationException 400 ${err}`);
                    return res.json({ statusCode: '400', msg: 'error' });
                }
            })
        }
    } catch (error) {
        // console.log(error);
        // logger.info(`exSecondarySentinelRegistrationException ${error}`);
        return res.json({ statusCode: '400', msg: 'Error in IRA angle registration. Please contact herDum systems.' });
    }
};

// exports.createPayment = (req, res) => {
    // stripe.customers.create({
    //     email: req.body.stripeEmail,
    //     source: req.body.stripeToken,
    //     name: 'Akhilesh Pandey',
    //     address: {
    //         line1: 'D-15 sector 58, Noida',
    //         postal_code: '201301',
    //         city: 'Noida',
    //         state: 'Uttar Pradesh',
    //         country: 'India',
    //     }
    // })
    //     .then((customer) => {

    //         return stripe.charges.create({
    //             amount: 100,     // Charing Rs 25 
    //             description: 'Web Development Product',
    //             currency: 'INR',
    //             customer: customer.id
    //         });
    //     })
    //     .then((charge) => {
    //         res.send("Success")  // If no error occurs 
    //     })
    //     .catch((err) => {
    //         res.send(err)       // If some error occurs 
    //     });
// }


// exports.deleteList = (req, res) => {
//     try {
//       User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
//         if (err) res.json(err);
//         else res.json('Successfully removed');
//       });
//     } catch (err) {
//       return res.status(404).json({ msg: 'unhandle error occured in deleteList api' });
//     }
//   };
