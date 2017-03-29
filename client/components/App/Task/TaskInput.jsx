TaskInput = React.createClass({
    render(){
        return (
            <form className="new-task" onSubmit={this.handleSubmit}>
                <input className="form-control"
                       type="text"
                       ref="textInput"
                       placeholder={this.getPlaceHolderText(this.props.type)}/>
            </form>
        )
    },

    getPlaceHolderText(type) {
      switch (type) {
        case 'mit':
          return "Add Most Important Task";
          break;
        case 'habit':
          return "Add a habit to track";
          break;
        case 'questionnaire':
          return 'Add a question to ask yourself everyday';
          break;
        case 'task':
        default:
          return "Add a new task";
          break;
      }
    },

    handleSubmit(event){
        event.preventDefault();
        var text = React.findDOMNode(this.refs.textInput).value.trim();
        var _date = moment(Session.get("displayedDate")).format("L")

        Tasks.insert(
            {
                userId: Meteor.userId(),
                text: text,
                createdAt: _date,
                cat: this.props.type,
                dueDate_first: _date,
                dueDate: _date,
                streak_arr: [0, 0, 0, 0, 0, 0, 0],
                username: Meteor.user().emails[0]["address"],
                checked: false,
                subtasks: [

                ]


            }
        );
        React.findDOMNode(this.refs.textInput).value = "";
    }
});

TaskInput.propTypes = {
  type: React.PropTypes.string.isRequired
}