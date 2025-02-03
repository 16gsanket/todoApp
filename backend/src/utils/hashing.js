import bcrypt from "bcrypt"

const toHash = async(values , salt) =>{
    const hashedPassword = await bcrypt.hash(values , salt)
    return hashedPassword;
}

const validateHashedPassword = async(value , hashedValue)=>{
    console.log(value , hashedValue);
    const result =await bcrypt.compare(value , hashedValue)
    return result;
}

export {toHash , validateHashedPassword}