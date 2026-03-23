const authService = require("../services/auth.service")

const login = async(req, res) => {
    try{
        const result = await authService.login(req.body)
        res.json(result)
    } catch(error){
        res.status(401).json({
            message: error.message
        })
    }
}

const register = async(req, res) => {
    try {

    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getUserById = async(req, res) => {
    try {
        const users = await authService.getUserById()
        res.json(users)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await authService.getUsers(req.param.id)
        res.json(users)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async(req, res) => {
    try {
        const result = await authService.updateUser(req.params.id, req.body)
        res.json(result)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const result = await authService.deleteUser(req.params.id)
        res.json(result)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}