var java = require("java");
var path = require('path');


var Keystore = function (keystore, storepass) {

    if (!keystore) {
        throw new Error('Keystore: keystore - must not be empty.'); 
    }

    if (!storepass) {
        throw new Error('Keystore: storepass - must not be empty.');
    }
    
    // Get SSL Cert from Java Keystore Lib
    java.classpath.push("commons-lang3-3.1.jar");
    java.classpath.push("commons-io.jar");
    java.classpath.push(path.resolve(__dirname, './SSLKeystore.jar'));
    
    var _class = java.newInstanceSync("GetData");

    var getCert = function(alias){

        if(!alias){
            throw new Error("Keystore: getCert: alias - must not be empty");
        }

        var _certificate;
        try {
            // JAR file call to retrieve the certificate from keystore
            _certificate = java.callMethodSync(_class, "getCert",
                path.resolve(__dirname, keystore),
                storepass,
                alias); 

            if(!_certificate){
                throw new Error('Cannot find cert for alias:' + alias);
            }
        }
        catch (error) {
            throw error;
        }

        return _certificate;
        
    }

    var getPrivateKey = function(alias){

        if(!alias){
            throw new Error("Keystore: getPrivateKey: alias - must not be empty");
        }

        var _privateKey;

        try {
            // JAR file call to retrieve the certificate from keystore
            _privateKey = java.callMethodSync(_class, "getPrivateKey",
                path.resolve(__dirname, keystore),
                storepass,
                alias);

            if(!_privateKey){
                throw new Error('Cannot find privateKey for alias:' + alias);
            }
        }
        catch (error) {
            throw error;
        }

        return _privateKey;
    }
    return {
        getCert: getCert,
        getPrivateKey: getPrivateKey
    }

};

module.exports = Keystore;
