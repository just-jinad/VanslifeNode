const vanModel = require('../model/vans.model')

const userSignup = (req, res) => {
    console.log("User sign-up request received")
    console.log(req.body);
    const newUser = new vanModel(req.body)
    newUser.save()
        .then(data => {
            console.log("User saved successfully:");
            res.status(201).json({ message: "User created successfully", status:true})
        })
        .catch(error => {
            console.log(error)
            if (error.code == 11000) {
                res.send({message:"Email already exists", status:false});
            } else {
                res.send({message:"Internal Server Error"});
            }
        });
};

const userLogin = (req,res)=>{
    console.log(req.body);
    vanModel.findOne({email: req.body.email}).then((data)=>{
        console.log(data);
        if(!data){
         res.send({message:'User not registered' , status : false})
        } else if (req.body.email == data.email && req.body.password == data.password) {
        res.send({message:"user has been found", status: true})
            }else{
        res.send({message: "Incorrect Email or Password"})
            }
        
    })
}


module.exports = { userSignup,userLogin }
