const jwt = require('jsonwebtoken')
const config = require('config')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
          expiresIn: '30m',
        });

        return accessToken
    }

    generateLoginTokens(payload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
          expiresIn: '30d',
        });

        return accessToken
    }

    validateAccessToken(token) {
        const data = jwt.verify(token, config.JWT_ACCESS_SECRET);

        return data;
    }

    generateTokensResetPassword(payload) {
        const resetToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        });

        return resetToken;
      }
}

module.exports = new TokenService()