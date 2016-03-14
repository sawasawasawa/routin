DateControl = React.createClass({

    getInitialState() {
        //console.log("LOG: getInitialState session.get(displayedDate): ", Session.get("displayedDate"));
        return {
            displayedDate: Session.get("displayedDate")
        }
    },
    componentDidMount(){
        console.log('PINGWIN: Session.get("displayedDate")', Session.get("displayedDate"));
        d = Session.get("displayedDate");
        console.log('PINGWIN: moment(d)', moment(d));
        console.log('PINGWIN: d', d);
        $('#datetimepicker').datetimepicker({
            format:'DD/MM/YYYY'
        });
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

                        <div className='input-group date' >
                            <input type='text'
                                   className="form-control"
                                   value={moment(Session.get("displayedDate")).format("DD/MM/YYYY")}

                            />
                                                
                        </div>



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
    }
});