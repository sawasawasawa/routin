Task = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            checked: this.props.task.checked,
            text: this.props.task.text
        }
    },

    classIfChecked(){
        if (this.props.task.checked){
            return " checked";
        }
        else {
            return "";
        }
    },

    render() {
        return (
            <li className={"form-group list-group-item"+this.classIfChecked()}>
                <div className="checkbox">

                        <input
                            type="checkbox"
                            checked={this.props.task.checked}
                            onClick={this.toggleChecked}/>

                </div>
                <form className="form-group">
                    <input className= {"form-control task-text-input "+this.classIfChecked()}
                               type="text"
                               onChange={this.update}
                               value={this.state.text}
                               placeholder="Change task text or delete by clicking x on the right"
                               onBlur={this.updateTask}
                                onSubmit={this.updateTask}
                    />
                </form>
                <span className="glyphicon glyphicon-remove-circle"
                      aria-hidden="true"
                      onClick={this.deleteTask}
                ></span>

            </li>
        );
    },

    update(e){
        this.setState({text: e.target.value})
    },

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id, {
            $set: {checked: ! this.props.task.checked}
        });
    },

    updateTask() {
        Tasks.update(this.props.task._id, {
            $set: {text: this.state.text}
        });
    },

    deleteTask(event){
        event.preventDefault();
        Tasks.remove(this.props.task._id);
    }
});

//
//<button type="button" className="btn btn-default delete-button" aria-label="Left Align" onClick={this.deleteTask}>
//    <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
////</button