
TaskInput = React.createClass({
    render(){
        return (
            <form className="new-task" onSubmit={this.handleSubmit} >
                <input className="form-control"
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks" />
            </form>
        )
    },

    handleSubmit(event){
        event.preventDefault();
        var text = React.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert(
            {
                userId: Meteor.userId(),
                text:text,
                createdAt: moment().format("L"),
                cat: "test",
                dueDate_first: moment().format("L"),
                dueDate: moment().format("L"),
                streak_arr: [0, 0, 0, 0, 0, 0, 0],
                username: Meteor.user().emails[0]["address"],
                checked: false
            }
        );
        React.findDOMNode(this.refs.textInput).value ="";
    }
});

