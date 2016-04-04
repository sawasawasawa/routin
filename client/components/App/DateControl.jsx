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
        $('#datepicker').datepicker({
            //defaultViewDate: {year:moment(d).year(), month:moment(d).month(), day:moment(d).day},
            format: "D, dd M",
            autoclose: true,
            todayHighlight: true,
            //toggleActive: true
        }).on('changeDate', function(e) {
            console.log('PINGWIN: e', e);
            Session.set("displayedDate", moment(e.date)._d);
            console.log('chjanged')
        });

    },

    render(){
        return (
            <div className="btn-group  date-control pagination-centered"
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
                               styleName="text-align:center"
                               id="datepicker"
                               value={moment(Session.get("displayedDate")).format("ddd, DD MMM")}

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