Router.configure({
  layoutTemplate: 'layout'
});

//simple route mapping
Router.map(function () {
    
    this.route('login', { //route for login page
        path: '/',
        template: 'login',
        layoutTemplate: 'loginRouterTemplate'
    });
    
    this.route('app', { //route for core app
        path: '/app',
        template: 'app',
        before: function(){ //ensure app only accessible when pwd correct
            Meteor.call('isSignedIn', function(err, res){ //server side login validation
                if(!res || res === false){
                    console.log('Not signed In');
                    Router.go('login');
                }
            });
        },
    });   
});

//// Listener for pwd field events ////
Template.login.events({
    'keydown input#loginPwd' : function (e) {
        if (e.which == 13) { //13 => enter key
            e.preventDefault(); 
            Meteor.call('signIn', $(e.target).val(), function(err, res){ //server side password validation
                if(res && res == true){
                    Router.go('app');
                }
                else{
                    $( "#loginPwd" ).effect( "shake" ); //shake effect of pwd field if pwd incorrect
                }
            });
        }
    },
});