SubTask = React.createClass({

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        subtask: React.PropTypes.string.isRequired
    },

    getInitialState() {
        if (this.props.checked === undefined) {
            this.props.checked = false
        }
        return {
            key: this.props.key,
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
            <tr className={" "+ this.classIfChecked()}>
                <td >

                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        onChange={this.toggleCheckedSubTask}
                    />
                </td>
                <td >
                    <input className={"task-text-input subtask-text-input"}
                           type="text"
                           onChange={this.update}
                           value={this.state.subtask }
                           placeholder="Change task text or delete by clicking x on the right"
                           onBlur={this.updateSubTask}
                           onSubmit={this.updateSubTask}
                    />
                </td>

                <td className="glyphicon glyphicon-remove-circle subtask-remove"
                      aria-hidden="true"
                      onClick={this.deleteSubTask}
                ></td>
            </tr>
        );
    },
//<tr className={"form-group list-group-item subtask "+ this.classIfChecked()}>

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
        var _checked = _.findWhere(_subtasks, {key: this.props.myKey}).checked;
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
