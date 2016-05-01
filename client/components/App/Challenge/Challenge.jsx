Challenge = React.createClass({

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.id, {
            $set: {checked: !this.props.checked}
        });
    },
    componentDidMount(){
        this.paintStreak();
        this.rePaintStreak();
    },

    componentWillUpdate(){
        this.rePaintStreak();
    },
    //shouldComponentUpdate: function(nextProps) {
    //    console.log('PINGWIN: nextprops', nextProps);
    //    console.log('PINGWIN: props',this.props);
    //    return nextProps !== this.props;
    //},
    componentWillReceiveProps(){
        this.rePaintStreak();},

    paintStreak(){
        var streak = d3.select(".challengeStreak")
            .selectAll("div")
            .data(this.props.streak_arr)
            .enter().append("div")
            .style("background-color", function (d) {
                return d ? "blue" : 'red'
            })
            .classed("challengeStreakCell", true);
    },

    rePaintStreak(){
        var streak = d3.select(".challengeStreak");
        streak.selectAll('div').remove();
        streak.selectAll("div")
            .data(this.props.streak_arr)
            .enter().append("div")
            .style("background-color", function (d) {
                return d ? "blue" : 'red'
            })
            .classed("challengeStreakCell", true);
    },

    render(){
        return (
            <div className="width100">
                <h3>30 day challenge</h3>
                <div className="challenge width100">
                    <input
                        className="challengeCheckbox"
                        type="checkbox"
                        checked={this.props.checked}
                        onChange={this.toggleChecked}/>
                    <div>{this.props.text}</div>
                    <div className="challengeStreakContainter">
                        <div className="challengeStreak"></div>
                    </div>
                </div>
            </div>
        )
    }
});

