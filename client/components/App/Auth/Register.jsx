Register =React.createClass({
    register(e){
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        Accounts.createUser({
            email: email,
            password: password,
            username: email
        });
        console.log("zarejestrowano");
        FlowRouter.go('/registerSuccess');
    },
    render(){
        return (
            <div className="main-content ls-xs-12 col-sm-6">
                <h1>Register</h1>
                <form id="register-form" action="#" onSubmit={this.register}>
                    <div className="form-group">
                        <label htmlFor="email" >Email:</label>
                        <input type="email" id="email" name="email" className="form-control" />
                    </div>
                    <div className ="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" className ="form-control"/>
                    </div>
                    <div className="form-group">
                        <button type = "sumbit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
});