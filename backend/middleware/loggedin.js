const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];//.split(" ")[1] is to get the token from the header (the token is in the second position of the array)
     jwt.verify(token, 'ti_ho_mai_detto_la_definizione_di_follia_ma_lo_ho_fatto');
 
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!"
    });
  }
};
