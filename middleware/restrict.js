const Users = require("../users/users-model")
const bcrypt = require("bcryptjs")


const sessions = {  
}

function restrict(){
    const authError =  {
            message: "Invalid credentials",
        }
    return async (req, res, next) =>{
       
        try{

            // const { authorization } = req.headers

            // if (!sessions[authorization]) {
            //     return res.status(401).json(authError)
            // }

            // const { cookie } = req.headers
            // if(!cookie){
            //     return res.status(401).json(authError)
            // }

            // const authToken = cookie.replace("token=", "")
            // if(!sessions[authToken]){
            //     return res.status(401).json(authError)
            // }

            // does the same thing but simpler
            if (!req.session || !req.session.user){
                return res.status(401).json(authError)
            }

        next() 
    } catch(err){
            next(err)
        }
    }
}

module.exports ={
    sessions,
    restrict,
}


// previous code before authorization tokens:
//    //     const { username, password } = req.headers
        //     // makes sure these values aren't empty
        //     if (!username || !password){
        //         return res.status(401).json(authError)
        //     }
        //     console.log("checkpoint 1")
        
        //     const user = await Users.findBy({ username }).first()
        //     // makes sure the user exists
        //     if (!user){
        //         return res.status(401).json(authError)
            
        // } 
        // console.log("checkpoint2")
        // const passwordValid = await bcrypt.compare(password, user.password)
        // // make sure the password is correct
        // if(!passwordValid){
        //     return res.status(401).json(authError)
        // } 
