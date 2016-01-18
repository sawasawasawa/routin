SubTask = React.createClass({

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        subtask: React.PropTypes.object.isRequired
    },

    getInitialState() {
        if (this.props.checked === undefined) {
            this.props.checked = false
        }
        return {
            myKey: this.props.myKey,
            subtask: this.props.subtask,
            checked: this.props.checked,
            taskId: this.props.taskId,
        }
    },

    classIfChecked(){
        if (this.state.checked) {
            return " checked";
        }
        else {
            return "";
        }
    },


    render() {

        return (
            <li className={"form-group list-group-item subtask "+ this.classIfChecked()}>
                <div className="checkbox">

                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        onClick={this.toggleCheckedSubTask}
                    />
                </div>
                <form className="form-group">
                    <input className={"form-control task-text-input "}
                           type="text"
                           onChange={this.update}
                           value={this.state.subtask }
                           placeholder="Change task text or delete by clicking x on the right"
                           onBlur={this.updateSubTask}
                           onSubmit={this.updateSubTask}
                    />
                </form>

                <span className="glyphicon glyphicon-remove-circle"
                      //aria-hidden="true"
                      onClick={this.deleteSubTask}
                ></span>
            </li>
        );
    },

    // subtasks methods


    //updateSubTask(e){
    //        this.setState({subtasks: [e.target.value]})
    //    },
    //
    toggleCheckedSubTask() {
        // Set the checked property to the opposite of its current value
        console.log('toggle');
        var _wholeTask = Tasks.find(this.props.taskId).fetch();
        var _subtasks = _wholeTask[0].subtasks;
        var _checked = _.findWhere(_subtasks, {subtask: this.props.subtask}).checked;
        _.findWhere(_subtasks, {key: this.props.myKey}).checked = !_checked;
        this.state.checked = !_checked;
        Tasks.update(this.state.taskId, {
            $set: {subtasks: _subtasks}
        });
    },

    updateSubTask() {
        var _wholeTask = Tasks.find(this.props.taskId).fetch();
        var _subtasks = _wholeTask[0].subtasks;
        var _text = this.state.subtask;
        _.findWhere(_subtasks, {key: this.props.myKey}).subtask = _text;
        Tasks.update(this.props.taskId, {
            $set: {subtasks: _subtasks}
        });
        _wholeTask = Tasks.find(this.state.taskId).fetch();
        console.log(_wholeTask);
    },

    update(e){
        this.setState({subtask: e.target.value})
    },

    deleteSubTask(event){
        console.log('deleteing subtask...');
        var _wholeTask = Tasks.find(this.props.taskId).fetch();
        var _subtasks = _wholeTask[0].subtasks;
        var _deletedTask = _.findWhere(_subtasks, {key: this.props.myKey});
        _subtasks = _.without(_subtasks, _deletedTask);
        Tasks.update(this.props.taskId, {
            $set: {subtasks: _subtasks}
        });
        _wholeTask = Tasks.find(this.state.taskId).fetch();
        console.log(_wholeTask);

    }

});
