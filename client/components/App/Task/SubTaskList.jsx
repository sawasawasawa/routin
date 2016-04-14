SubTaskList = React.createClass({
    renderSubTasks() {
        return this.props.subtasks.map((subtask) => {
            return <SubTask key={subtask.key} myKey={subtask.key} subtask={subtask.subtask} checked={subtask.checked}
                            taskId={this.props.taskId}/>;
        });
    },


    render() {
        return (

            <table className="subtasks">
                <tbody>
                    {this.renderSubTasks()}
                </tbody>
            </table>


        );
    }
});

