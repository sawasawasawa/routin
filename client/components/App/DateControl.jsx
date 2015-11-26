
DateControl = React.createClass({

    getInitialState() {
        console.log("LOG: getInitialState session.get(displayedDate): ", Session.get("displayedDate"));
        return {
            displayedDate: Session.get("displayedDate")
        }
    },

    render(){
        return (
            <div className="btn-group btn-group-justified date-control pagination-centered"
                 role="group" aria-label="...">
                <div className="btn-group dateChangeBtn">
                    <button type="button" className="btn btn-default"
                        onClick={this.displayedDatePrev}>
                        <span className="glyphicon glyphicon-menu-left " aria-hidden="true"></span>
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default">
                        {moment(Session.get("displayedDate")).format("L")}
                    </button>
                </div>
                <div className="btn-group dateChangeBtn" role="group">
                    <button type="button" className="btn btn-default "
                            onClick={this.displayedDateNext}>
                        <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        )
    },

    displayedDateNext(){
        var _nextDate = moment(this.state.displayedDate).add(1, 'days');
        this.setState({displayedDate: _nextDate});
        Session.set("displayedDate", moment(_nextDate)._d);
    },

    displayedDatePrev(){
        var _nextDate = moment(this.state.displayedDate).add(-1, 'days');
        this.setState({displayedDate: _nextDate});
        Session.set("displayedDate", moment(_nextDate)._d);

        //var _nextDate = moment(this.state.displayedDate).add(-1, 'days');
        //console.log("LOG: DATECONTROL displayedDatePrev this.state.displayedDate", moment(this.state.displayedDate).format("L"));
        //this.setState({displayedDate: _nextDate});
        //console.log("LOG: DATECONTROL displayedDatePrev this.state.displayedDate", moment(this.state.displayedDate).format("L"));
        //console.log("LOG: DATECONTROL displayedDatePrev sessionGet displayedDate", moment(Session.get("displayedDate")).format("L"));
        //console.log("LOG: DATECONTROL displayedDatePrev _nextDate", _nextDate);
        //Session.set("displayedDate", moment(_nextDate)._d);
        //console.log("LOG: DATECONTROL displayedDatePrev sessionGet displayedDate", moment(Session.get("displayedDate")).format("L"));
    }
});