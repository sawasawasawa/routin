QuestionnaireRow = React.createClass({
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
                            <td>
                                <div className="btn-group btn-toggle yes-no">
                                    <button className="btn btn-sm btn-default" onClick={this.toggleChecked}>YES</button>
                                    <button className="btn btn-sm btn-primary active" onClick={this.toggleChecked}>NO
                                    </button>
                                </div>
                            </td>
                            <td ><i className="glyphicon glyphicon-remove-circle"
                                    aria-hidden="true"
                                    onClick={this.deleteTask}
                            ></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    },

    handlePress(e){
        if (e.which == 13) {
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

    // toggleChecked(event) {
    //     // Set the checked property to the opposite of its current value
    //     console.log("event", event.target.classList);
    //     event.target.classList.remove("active")
    //     Tasks.update(this.props.task._id, {
    //         $set: {checked: !this.props.task.checked}
    //     });
    // },

    toggleChecked(event){
        var target = event.target.parentNode;
        $(target).find('.btn').toggleClass('active');
        if ($(target).find('.btn-primary').size() > 0) {
            $(target).find('.btn').toggleClass('btn-primary');
        }
        $(target).find('.btn').toggleClass('btn-default');
        Tasks.update(this.props.task._id, {
            $set: {checked: !this.props.task.checked}
        });
    },

    clickYes(event) {
        // Set the checked property to the opposite of its current value
        event.target.nextSibling.classList.remove("active");
        event.target.classList.add("active");
        Tasks.update(this.props.task._id, {
            $set: {checked: !this.props.task.checked}
        });
    },

    clickNo(event) {
        // Set the checked property to the opposite of its current value
        event.target.previousSibling.classList.remove("active");
        event.target.classList.add("active");
        Tasks.update(this.props.task._id, {
            $set: {checked: !this.props.task.checked}
        });
    },

    updateTask() {
        Tasks.update(this.props.task._id, {
            $set: {text: this.state.text}
        });
    }
});
