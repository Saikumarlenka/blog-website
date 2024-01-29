import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'; 
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400,'All Fields are required'))
  }
  const hashedPassword =  bcryptjs.hashSync(password,10);
 
  const newUser = new User({ username, email, password:hashedPassword });

  try {
    await newUser.save();
    res.json({ message: " Created successfully" });
  } catch (error) {
    next(error)  }
};


export const signin = async (req, res, next) => {
   const {email,password}=req.body;
   if  (!email || !password || email === "" || password === ""){
    next(errorHandler(400,'All Fields are reuired'))
   }
   try {
    const validuser = await User.findOne({email})
    if(!validuser){
      return next(errorHandler(404,'User not found'))

    }
    const validPassword=bcryptjs.compareSync(password,validuser.password); 
    if(!validPassword){
     return next(errorHandler(404,'Invalid password'))
    }
    const token = jwt.sign({id:validuser._id},process.env.JWT_SECRET_KEY)
    const {password:pass,...rest}=validuser._doc;
    res.status(200).cookie('access_token',token,{
      httpOnly: true,
    }).json(rest)


    
   } catch (error) {
   return next(error)
   }
}
export const google = async (req,res,next)=>{
  const {email,name,googlePhotUrl}=req.body
  try {
   const user = await User.findOne({email}) 
   if(user){
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
    const {password,...rest}=user._doc;
    res.status(200).cookie('access_token',token,{
      httpOnly:true,


    }).json(rest)

   }
   else{
    const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
    const newUser = new User({
      username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
      email,
      password:hashedPassword,
      profilePicture:googlePhotUrl

    })
    await newUser.save()
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
    const {password,...rest}=user._doc;
    res.status(200).cookie('access_token',token,{
      httpOnly:true,


    }).json(rest)
   }
  } catch (error) {
    next(error)
  }

}
