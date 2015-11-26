console.log("LOG: setting date session.get(displayedDate): ", Session.get("displayedDate"));
Session.set("displayedDate", moment()._d);
console.log("LOG: date set session.get(displayedDate): ", Session.get("displayedDate"));

App = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        return {
            loggedIn: !!Meteor.user()
        }
    },

    render() {
        return (
            <div >
               { this.allowedLayout() ? this.showLayout() : this.showLogin() }
            </div>
        )

    },

    showLayout(){
            if (this.props.content.props.name == 'Request'){
                return (
                    <div className="main-container">
                        {this.props.content}
                    </div>
                )
            }
            else {
                return(
                    <div>
                        {this.props.nav}
                        <div className="main-container">
                            {this.props.content}
                        </div>
                    </div>
                )
            }
    },

    showLogin(){
        return(
            <div>
                {this.props.nav}
                <p className="centered">
                    You must be logged in to do that.
                    <br></br><br></br>
                    Don't have an account?
                    <br></br>
                    <a href="/register">Register here</a>
                </p>
                <Login />
            </div>
        )
    },

    allowedLayout(){
        console.log("LOG: APP check if user loggedIn", this.data.loggedIn);
        var allowedLayouts =['Request', 'Login', 'Register', 'Dashboard'];
        var layoutAllowed = false;
        if ($.inArray(this.props.content.props.name, allowedLayouts)>-1
            || this.data.loggedIn) {
            layoutAllowed = true;
        }
        return layoutAllowed;
    }

});

