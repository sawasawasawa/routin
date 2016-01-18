SubTaskList = React.createClass({
    renderSubTasks() {
        return this.props.subtasks.map((subtask) => {
            console.log(subtask);
            return <SubTask myKey={subtask.key} subtask={subtask.subtask} checked={subtask.checked}
                            taskId={this.props.taskId} />;
        });
    },


    render() {
        console.log('rendering subtasklist')
        console.log(this.props);
        console.log(this.props);
        return (

            <ul className="subtasks" >
                {this.renderSubTasks()}
            </ul>


        );
    }
});

