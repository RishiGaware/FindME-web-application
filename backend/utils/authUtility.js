import bcrypt from 'bcrypt';

const hashPassword = async (password)=>{
    try{
        let saltRounds = 10;
        const hash=await bcrypt.hash(password, saltRounds);
        return hash;
    }catch(error){
        console.log('Cannot perform hashing of password');
    }
}

const comparePassword = async (password, storedPassword)=>{
    try{
        const result = await bcrypt.compare(password, storedPassword);
        return result;
    }catch(error){
        console.log('Cannot perform compare operation on stored and provided passwords', error);
    }
}

export {hashPassword, comparePassword};
