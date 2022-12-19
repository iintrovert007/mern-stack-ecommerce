const sendToken = (user, statusCode, res) => {

    //Creating JWT Token
    const token = user.getJwtToken();

    //setting cookies 
    const options = {
        expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 
            ),
        httpOnly: true,
    }
    let copyUser ={...user._doc};
    delete copyUser['password'];
    res.status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        user: copyUser
    })


}

module.exports = sendToken;