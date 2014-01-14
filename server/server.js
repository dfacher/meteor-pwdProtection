var signedIn = false;
var pwd = 'YOUR PWD';

//// Server side password validation

Meteor.methods({
    signIn: function(password){
        signedIn = false;
        if(password === pwd){
            signedIn = true;
        }
        return signedIn;
    },
    isSignedIn: function(){
        return signedIn;
    }
});