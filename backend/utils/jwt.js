const sendToken = (user,statusCode,res) => {

    const token = user.getJwtToken();

    res.status(statusCode).json({
        sucess: true,
        token,
        user
    })
}


module.exports = sendToken;