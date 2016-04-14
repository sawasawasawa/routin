Nav = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            loggedIn: !!Meteor.user(),
        }
    },

    logout(){
        Meteor.logout(function (err) {
            FlowRouter.go('/login');
        });
    },

    getLoginLink(){
        if (this.data.loggedIn) {
            return <a onClick={this.logout} href="#">Hi, {Meteor.user().emails[0]["address"]}</a>
        } else {
            return <a href="/login">Login</a>
        }
    },

    //displayedDate(){
    //    return Session.get("displayedDate");
    //},




    render(){
        return (

            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#"><img className="logo" src="\img\logo.png" height="42"/></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <div className="nav navbar-nav">
                            <DateControl />
                        </div>



                        <div className="nav navbar-nav navbar-right">
                            {this.getLoginLink()}
                        </div>
                    </div>
                </div>
            </nav>
        )
    },
})

