const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization; // Get the Authorization header value

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7); // Remove the "Bearer " prefix to extract the token

  try {
    const decoded = jwt.verify(token, `${process.env.MY_ACCESS_TOKEN}`); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded; // Attach the decoded user information to the request object
    console.log(decoded)
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// const jsonTokenValidate = asyncHandler(async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer")) {
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401)
//                 throw new Error("User is not Authorized!!!")
//             }
//             console.log(decoded)
//             req.user = decoded.user;
//             next()
//         })

//         if(!token){
//             res.status(401)
//             throw new Error("User is not authorized or token is missing")
//         }
//     }
// })

module.exports = authenticateJWT;