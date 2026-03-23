const prisma = require("../config/prisma");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async({ email, password }) => {
    const user = await prisma.users.findUnique({
        where : { email }
    })

    if(!user) {
        throw new Error('Credenciales invalidas')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        throw new Error('Credenciales invalidas')
    }
    const token = jwt.sign(
        {
            userId : user.id,
            email : user.email
        },

        process.env.JWT_SECRET,
        { 
            expiresIn: '1h' 
        }
    );

    return {
        message : 'Login correcto',
        token
    }
}

const register = async({name, email, password}) => {
    const existeUsuario = await prisma.users.findUnique({
        where : {email}
    })

    if(existeUsuario) {
        throw new Error("El correo ya está registrado")
    }

    const hashPassword = await bcryot.hash(password, 10)

    const user = await prisma.users.create({
        data : {
            name,
            email,
            password : hashPassword
        }
    })

    return {
        message : "Usuario registrado correctamente",
        user : {
            id : user.id,
            name : user.name,
            email : user.email
        }
    }
}

const getUsers = async() => {
    return await prisma.users.findMany({
        select : {
            id : true,
            name : true,
            email : true
        }
    })
}

module.exports = {
    login,
    register,
    getUsers
}