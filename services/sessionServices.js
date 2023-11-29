const userModel = require('../dao/model/user-model')
const {createHash, isValidPassword} = require('../utils/passwordHash')

async function findUserByEmail (email) {
  try {
    const user = await userModel.findOne({ email: email })
    return user
  } catch (error) {
    console.error(error)
    throw new Error('Error while getting user')
  }
}

async function createUser (userData) {
    try {
        userData.password = createHash(userData.password)
        const newUser = await userModel.create(userData)
        return newUser
    }
    catch (error) {
        console.error(error)
        throw new Error('Error while creating user')
    }
}

async function updatePassword(email, newPassword) {
    try {
        const hashedPassword = createHash(newPassword)
        await userModel.updateOne({email: email}, {password: hashedPassword})
    } catch (error) {
        console.error(error)
        throw new Error('Error while updating password')
    }
}

async function updateUserLastConnection(userId) {
    try {
      const currentDate = new Date();
      await userModel.findByIdAndUpdate(userId, { last_connection: currentDate });
    } catch (error) {
      console.error(error);
      throw new Error('Error while updating user last connection');
    }
  }

module.exports = {
    findUserByEmail,
    createUser,
    updatePassword,
    updateUserLastConnection
}