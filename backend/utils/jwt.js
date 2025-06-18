const sendToken = (user,statusCode,res) => {

    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true // The cookie is only accessible by the server not by the client
    }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({
        sucess: true,
        token,
        user
    })
}


module.exports = sendToken;