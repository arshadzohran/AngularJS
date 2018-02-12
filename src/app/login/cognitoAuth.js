/**
 * Created by shahein.moussavi on 9/19/17
 */

import AWSCognito from 'amazon-cognito-identity-js';

AWSCognito.config.region = 'us-east-1';

module.exports = {
    login(username, password) {
        let authData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenicationDetails(authData);
        const poolData = {
            UserPoolId: process.env.POOL_ID,
            ClientId: process.env.CLIENT_ID,
        };
        const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                console.log('idToken + ' + result.idToken.jwtToken);
            },

            onFailure: function (err) {
                alert(err);
                return err;
            }
        })
    }
};
