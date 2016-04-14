MITRow = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired
    },


    getInitialState() {
        return {
            checked: this.props.task.checked,
            text: this.props.task.text,
            subtasks: this.props.subtasks

        }
    },

    classIfChecked(){
        if (this.props.task.checked) {
            return " checked";
        }
        else {
            return "";
        }
    },

    render() {
        return (

            <tr className={this.classIfChecked()}>
                <td className="width100">
                    <table className="table">
                        <tbody>
                        <tr className="width100">
                            <td>
                                <input
                                    type="checkbox"
                                    checked={this.props.task.checked}
                                    onChange={this.toggleChecked}/>

                            </td>
                            <td ><i className="glyphicon glyphicon-plus"
                                    aria-hidden="true"
                                    onClick={this.addSubtask}
                            ></i></td>
                            <td className="width80">
                                <input className="task-text-input"
                                       type="text"
                                       onChange={this.update}
                                       value={this.state.text}
                                       placeholder="Change task text or delete by clicking x on the right"
                                       onBlur={this.updateTask}
                                       onSubmit={this.updateTask}
                                       onKeyPress={this.handlePress}
                                />


                            </td>

                            <td ><i className="glyphicon glyphicon-remove-circle"
                                    aria-hidden="true"
                                    onClick={this.deleteTask}
                            ></i>
                            </td>
                        </tr>
                        {this.props.subtasks.length>0 &&  this.props.type != "habit" ?
                        <tr className="width100">
                            <td colSpan="1"></td>
                            <td colSpan="5" className="width100">
                                <SubTaskList subtasks={this.props.subtasks} taskId={this.props.task._id}/>
                            </td>
                        </tr> : false
                            }
                   </tbody>
                    </table>
                </td>
            </tr>
        );
    },

    handlePress(e){
        if(e.which == 13)
        {
            document.activeElement.blur();

        }

    },



    deleteTask(event){
        event.preventDefault();
        Tasks.remove(this.props.task._id);
    },

    update(e){
        this.setState({text: e.target.value})
    },

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id, {
            $set: {checked: !this.props.task.checked}
        });
    },

    updateTask() {
        Tasks.update(this.props.task._id, {
            $set: {text: this.state.text}
        });
    },
    addSubtask(event) {
        event.preventDefault();
        var _subtasks = this.props.subtasks;
        var _key = 0;
        var _maxKey = _.max(this.props.task.subtasks, function (subtask) {
                return subtask.key;
            }).key + 1;
        if (_maxKey && _maxKey > 0) {
            _key = _maxKey
        }
        ;
        _subtasks.push({key: _key, subtask: "Subtask - click to edit text", checked: false});
        Tasks.update(this.props.task._id, {
            $set: {subtasks: _subtasks}
        });
    }

});
