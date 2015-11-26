Login = React.createClass({
    login(e){
        e.preventDefault();
        var _email = $('#email_x').val();
        var _password = $('#password').val();
        console.log("LOG: LOGIN routing to /");
        Meteor.loginWithPassword(_email, _password, FlowRouter.go('/'));
        console.log("LOG: LOGIN routed at /");
    },
    render(){
        return(
            <div className="main-container">
                <h1>Login</h1>
                <form onSubmit={this.login} id ="login-form" action="#" >
                    <div className="form-group">
                        <label htmlFor="email_x" id = "email">Email: </label>
                        <input type="email_x"
                               id="email_x"
                               name="email_x"
                               className = "form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type = "password"
                               id = "password"
                               name="password"
                               className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type ="submit" className = "btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
});