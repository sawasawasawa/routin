TaskList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        Meteor.subscribe('tasks');
        console.log('LOG: TASKLIST getMeteorData displayedDate: ', Session.get("displayedDate"));
        return {
            dueTasks: Tasks.find({
                userId: Meteor.userId(),
                dueDate: moment(Session.get("displayedDate")).format("L")
            }, {sort: {checked: 1}}).fetch()
        }
    },

    //renderTasks() {
    //    return this.data.dueTasks.map((task) => {
    //        return <Task key={task._id} task={task} subtasks={task.subtasks}/>;
    //    });
    //},

    renderTasksTable() {
        return this.data.dueTasks.map((task) => {
            return <TableRow key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
        });
    },

    copyUnchecked(){
        //TODO zamienić to na subset dueTaskscopying unckeckd
        console.log("LOG: copying unckeckd...");
        var _tasksToCopy = Tasks.find({
            checked: false,
            userId: Meteor.userId(),
            dueDate: moment(Session.get("displayedDate")).format("L")
        }).fetch();

        console.log("LOG: _tasksToCopy", _tasksToCopy);
        _tasksToCopy.forEach(function (myDoc) {
            var copy = myDoc;
            Tasks.insert(
                {
                    userId: Meteor.userId(),
                    text: copy.text,
                    createdAt: copy.createdAt,
                    cat: "test",
                    dueDate_first: copy.dueDate_first,
                    dueDate: moment(copy.dueDate).add(1, 'days').format("L"),
                    streak_arr: [0, 0, 0, 0, 0, 0, 0],
                    username: copy.username,
                    checked: false,
                    subtasks: copy.subtasks
                }
            );

        });
    },

    render() {
        return (
            <div>
                <div className="container-fluid main-container main-content">
                    <TaskInput />
                    <div className="centered">
                        <button type="button" className="btn btn-primary btn-lg center" onClick={this.copyUnchecked}>
                            Copy unchecked tasks
                        </button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                        {this.renderTasksTable()}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
});

