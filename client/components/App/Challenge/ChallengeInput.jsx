ChallengeInput= React.createClass({
    render(){
        return (
            <form className="new-task" onSubmit={this.handleSubmit}>
                <input className="form-control"
                       type="text"
                       ref="textInput"
                       placeholder="Type to set yourself a 30 day challenge"/>
            </form>
        )
    },

    handleSubmit(event){
        event.preventDefault();
        var text = React.findDOMNode(this.refs.textInput).value.trim();
        var _date = moment(Session.get("displayedDate")).format("L");

        Tasks.insert(
            {
                userId: Meteor.userId(),
                text: text,
                createdAt: _date,
                cat: "challenge",
                dueDate_first: _date,
                dueDate: _date,
                streak_arr: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0,0,0],
                username: Meteor.user().emails[0]["address"],
                checked: false,
                subtasks: [

                ]


            }
        );
        React.findDOMNode(this.refs.textInput).value = "";
    }
});

