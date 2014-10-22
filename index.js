// Get SSL Cert from Java Keystore Lib

var JavaSSL = function(options){

    if(!options){ throw new Error('options - must not be empty.');}
    this.options = options;
};

JavaSSL.prototype.getCredentials = function() {
            
            // Get SSL Cert from Java Keystore Lib
            var java=require("java");
            var path = require('path');

            java.classpath.push("commons-lang3-3.1.jar");
            java.classpath.push("commons-io.jar");
            java.classpath.push(path.resolve(__dirname, './SSLKeystore.jar'));

            
            var myclass = java.newInstanceSync("GetData");
            try{

                // JAR file call to retrieve the certificate from keystore
            var certificate = java.callMethodSync(myclass, "getCert", 
                    path.resolve(__dirname, this.options.ks_path),
                    this.options.ks_password,
                    this.options.ks_alias);
            // JAR file call to retrieve the private Key from keystore
            var privatekey = java.callMethodSync(myclass, "getPrivateKey", 
                    this.options.ks_path,
                    this.options.ks_password,
                    this.options.ks_alias);
            }
            catch(error){
                console.log(error);
            }
              
            var credentials = { 
                key:privatekey, 
                cert:certificate 
            };

            return credentials;
        }

module.exports = JavaSSL;
