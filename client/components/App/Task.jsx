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
            return "list-group-item checked";
        }
        else {
            return "list-group-item";
        }
    },

    render() {
        return (
            <li className={this.classIfChecked()}>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.task.checked}
                            onClick={this.toggleChecked}/>
                    </label>
                </div>
                <button className="delete-button" onClick={this.deleteTask}>&times;</button>
                <div className="task-text">
                    {this.props.task.text}
                </div>
                <div className="task-edit">
                    <input type="text" onChange={this.update.bind(this)} onBlur={this.updateTask}/>
                        {this.state.text}
                </div>
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