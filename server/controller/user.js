const userModel = require('../models/user.model');
const paymentModel = require('../models/payment');

exports.signup = (req, res) => {
    console.log('Request Parameters:', req.body)
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email_Id = req.body.email_Id;
    let password = req.body.password
    if (!req.body.email_Id) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    } else {
        userModel.Registration(firstName, lastName, email_Id, password, function (err, data) {
            try {
                let parsedata = JSON.parse(data);
                if (err) {
                    // logger.info(`exSecondarySentinelRegistration ${constantStringmessage.serverErrMessage}`);
                    return res.json({ statusCode: '400', msg: 'error' });

                }
                else if (parsedata.success_flag == 415) {
                    // logger.info(`exSecondarySentinelRegistration IRA'S Angel already registered.`);
                    return res.json({ statusCode: '415', msg: "user already registered." });

                }
                else if (parsedata.success_flag == 401) {
                    // logger.info(`exSecondarySentinelRegistration IRA'S Angel already registered.`);
                    return res.json({ statusCode: '401', msg: "something issue on registation." });

                }
                else {
                    return res.json({ statusCode: '200', msg: "IRA'S Angel registered successfully.", response: parsedata });

                }
            } catch (err) {
                console.log(err);
                // logger.info(`exSecondarySentinelRegistrationException 400 ${err}`);
                return res.json({ statusCode: '400', msg: 'error' });
            }
        });
    }
}

exports.login = (req, res) => {
    let email_Id = req.body.email_Id;
    let password = req.body.password;
    if (email_Id == "" || email_Id == null || email_Id == undefined || password == "" || password == undefined || password == "" ) {
        return res.status(400).send({
            message: "Enter all parameter"
        });
    }else{
        userModel.Login(email_Id, password, function (err, data) {
            let parsedata = JSON.parse(data);
            console.log(parsedata);
            // let parseRoomNumber = JSON.parse(room);

            if (err) {
                // logger.info(`exLogin ${constantStringmessage.serverErrMessage}`);
                return res.json({ statusCode: '400', msg: "server error" });
            }
            else if (parsedata.success_flag == 419) {
                // logger.info(`exLogin 404 Your mobile number is not verified yet`);
                return res.json({ statusCode: '419', msg: 'incorrect credential' });

            } 
            else {
                res.status(200).send({ statusCode: '200', response: parsedata });
                // return res.json({ statusCode: '200', msg: 'Success.', 'Response': parsedata });
            }

        });

    }
}

exports.merchantDetails = (req, res, next) => {
    try {
        userModel.merchantDetails(function (err, data) {
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


// exports.create = (req, res) => {
    // if (!req.body.email_Id) {
    //     return res.status(400).send({
    //         message: "User email can not be empty"
    //     });
    // }

//     // Create a Product
//     const user = new User({
        // firstName: req.body.firstName || "Untitled Note",
        // lastName: req.body.lastName,
        // email_Id: req.body.email_Id,
        // password: req.body.password
//     });

//     // Save Product in the database
//     user.save()
//         .then(data => {
//             res.status(200).send({ message: 'User registered sucessfully!', response: data });
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Note."
//             });
//         });
// }
// exports.login = (req, res) => {
//     User.findOne({ email_Id: req.body.email_Id })
//         .then(user => {
//             console.log('login res', user)
//             if (!user) {
//                 return res.status(404).send({
//                     message: "User not found with title " + req.body.email_Id
//                 });
//             }
            // res.status(200).send({ message: 'Login success', response: user });
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Product not found with id " + req.body.email_Id
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error retrieving product with id " + req.body.email_Id
//             });
//         });
// }

// exports.userProfile = (req, res) => {
//     User.findOne({ email_Id: req.body.email_Id },
//         (err, user) => {
//            if (!user)
//               return res.status(404).json({ status: false, message: 'User record not found.' });
//            else
//               return res.status(200).json({ status: true, response: user});
//         }
//      );
// }