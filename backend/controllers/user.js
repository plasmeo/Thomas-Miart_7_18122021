const Models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    //masquage de l'email
    let data = req.body.email;
    let buff = new Buffer.from(data);
   // let userEmail = buff.toString('base64');
    let userEmail = data;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    console.log(req.body)

    Models.User.findOne({ where: {email: userEmail} }).then(userData => {
        if (userData === null){
            //vérification de la force du password 
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let  mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    let isPasswordOk = false;

    if (strongRegex.test(req.body.password)){
        console.log("Password fort");
        isPasswordOk = true;
    }else if (mediumRegex.test(req.body.password)){
        console.log("Password Moyen")
        isPasswordOk = true
    } else{
        res.status(400).json({message: 'Mot de passe trop faible' });
    }
    if (isPasswordOk){
        //crytpage du mdp
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            const user = Models.User.create({
                email: userEmail,
                password: hash,
                firstName: firstName,
                lastName: lastName,
                isAdmin: 0
            })
        })
        .catch(error => res.status(500).json({ error }));
    };  

        }else{
            res.status(401).json({message: 'User already registered' });
        }

        // project will be the first entry of the Projects table with the title 'aProject' || null
      })    
    }


  exports.login = (req, res, next) => {

    let data = req.body.email;

    let buff = new Buffer.from(data);
    //let userEmail = buff.toString('base64');
    let userEmail = data;
//{email: req.body.email}


Models.User.findOne({ where: {email: userEmail} })
    .then(userData => {
        if (userData === null){
            return res.status(401).json({error: 'User not registered'});
        }else{
            bcrypt.compare(req.body.password, userData.password)
            .then(valid => {
                if (!valid){
                    return res.status(401).json({error: 'Mot de passe incorrect'});
                }else {
                    res.status(200).json({
                        userEmail: userEmail,
                        userId: userData.id,
                        isAdmin: userData.isAdmin,
                        token: jwt.sign({
                            userId: userData.id,
                            isAdmin: userData.isAdmin
                        },
                        process.env.TOKEN,
                        {
                            expiresIn: '1h'
                        })
                    });
                    console.log("Connection reussie")
                }            
            })
            .catch(error => res.status(500).json({error}));
        }        
    })
    .catch(error => res.status(500).json({error}));
};


exports.deleteAccount = (req, res, next) => {

    let data = req.body.email;
    let userEmail = data;
    let userId;


Models.User.findOne({ where: {email: userEmail} })
    .then(userData => {
        if (userData === null){
            return res.status(401).json({error: 'User not registered'});
        }else{
            userId = userData.id;
            //console.log(userId);
            bcrypt.compare(req.body.password, userData.password)
            .then(valid => {
                if (!valid){
                    return res.status(401).json({error: 'Mot de passe incorrect'});
                }else {               
 

                    Models.Comments.destroy({
                        where: {
                            UserId: userId
                        }
                      });

                    console.log(userId);
                    Models.Post.destroy({
                        where: {
                            UserId: userId
                        }
                    });

                    Models.User.destroy({
                        where: {
                            id: userId
                        }
                    });
                    
                    res.status(200).json({message: "Compte supprimé"});
                    console.log("Compte supprimé")
                }            
            })
            .catch(error => res.status(500).json({error}));
        }        
    })
    .catch(error => res.status(500).json({error}));
};

