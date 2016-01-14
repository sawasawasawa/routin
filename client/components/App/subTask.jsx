
SubTask = React.createClass({

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        //task: React.PropTypes.object.isRequired
    },

    getInitialState() {
        if (this.props.checked===undefined){this.props.checked = false}
        return {
            //checked: this.props.task.checked,
            //text: this.props.task.text,
            taskId: this.props.taskId,
            key: this.props.key,
            subtask: this.props.subtask,
            checked: this.props.checked
        }
    },

    classIfChecked(){
        if (this.state.checked){
            return " checked";
        }
        else {
            return "";
        }
    },



    render() {

        return (
            <li className={"form-group list-group-item subtask "+ this.classIfChecked()} >
                <div className="checkbox">

                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        onClick={this.toggleCheckedSubTask}
                    />
                </div>
                <form className="form-group">
                    <input className= {"form-control task-text-input "}
                           type="text"
                           onChange={console.log("changing", this)}
                           value={this.state.subtask}
                           placeholder="Change task text or delete by clicking x on the right"
                           onBlur={console.log("changing", this)}
                           onSubmit={console.log("changing", this)}
                    />
                </form>

                <span className="glyphicon glyphicon-remove-circle"
                    aria-hidden="true"
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
        console.table(Tasks.find([this.state.taskId].subtasks).fetch());
            Tasks.update(this.state.taskId, {
                //$set: {checked: ! this.state.checked}

            $set: {pingwin: ! this.state.checked}
                //$set: {subtasks[0]."checked": !this.state.checked}
            });
        },
    //
    //updateSubTask() {
    //        Tasks.update(this.props.task._id, {
    //            $set: {text: this.state.text}
    //        });
    //    },

    deleteSubTask(event){
            event.preventDefault();
            console.log('deleting subtask');
            Tasks.remove(this.state.subtask);
    }

    });
