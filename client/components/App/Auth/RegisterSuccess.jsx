RegisterSuccess =React.createClass({



routeHome(){
    console.log('ELO');
    FlowRouter.go('/');
},

    render(){
        return (
            <div className="main-content ls-xs-12 col-sm-6">
                <h1>Register successful</h1>
                <button type="button" className ="btn btn-success"
                    onClick = {this.routeHome}>Start adding tasks</button>
            </div>
        )
    }
});