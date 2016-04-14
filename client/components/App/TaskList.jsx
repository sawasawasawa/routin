TaskList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        Meteor.subscribe('tasks');
        return {
            habits: Tasks.find({
                userId: Meteor.userId(),
                dueDate: moment(Session.get("displayedDate")).format("L"),
                cat: 'habit'
            }, {sort: {checked: 1}}).fetch(),

            mit: Tasks.find({
                userId: Meteor.userId(),
                dueDate: moment(Session.get("displayedDate")).format("L"),
                cat: 'mit'
            }, {sort: {checked: 1}}).fetch(),

            dueTasks: Tasks.find({
                userId: Meteor.userId(),
                cat: 'task',
                dueDate: moment(Session.get("displayedDate")).format("L")
            }, {sort: {checked: 1}}).fetch()
        }
    },

    renderMITTable() {
        return this.data.mit.map((task) => {
            return <MITRow type="mit" key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
        });
    },

    renderHabitsTable() {
        return this.data.habits.map((task) => {
            return <HabitRow type="habit" key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
        });
    },

    renderTasksTable() {
        return this.data.dueTasks.map((task) => {
            return <TaskRow key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
        });
    },

    copyUnchecked(){
        //TODO zamienić to na subset dueTaskscopying unckeckd
        var _tasksToCopy = Tasks.find({
            checked: false,
            cat: 'task',
            userId: Meteor.userId(),
            dueDate: moment(Session.get("displayedDate")).format("L")
        }).fetch();

        this.copyHabits();

        this.copyMIT();

        _tasksToCopy.forEach(function (myDoc) {
            var copy = myDoc;
            Tasks.insert(
                {
                    userId: Meteor.userId(),
                    text: copy.text,
                    createdAt: copy.createdAt,
                    cat: copy.cat,
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

    copyHabits(){
        var _tasksToCopy = Tasks.find({
            cat: 'habit',
            userId: Meteor.userId(),
            dueDate: moment(Session.get("displayedDate")).format("L")
        }).fetch();

        _tasksToCopy.forEach(function (myDoc) {
            var copy = myDoc;
            var _streak_arr = copy.streak_arr;
            _streak_arr.push(copy.checked);
            _streak_arr.shift();
            Tasks.insert(
                {
                    userId: Meteor.userId(),
                    text: copy.text,
                    createdAt: copy.createdAt,
                    cat: copy.cat,
                    dueDate_first: copy.dueDate_first,
                    dueDate: moment(copy.dueDate).add(1, 'days').format("L"),
                    streak_arr: _streak_arr,
                    username: copy.username,
                    checked: false,
                    subtasks: copy.subtasks
                }
            );

        });
    },

    copyMIT(){
        var _tasksToCopy = Tasks.find({
            checked: false,
            cat: 'mit',
            userId: Meteor.userId(),
            dueDate: moment(Session.get("displayedDate")).format("L")
        }).fetch();



        _tasksToCopy.forEach(function (myDoc) {
            var copy = myDoc;
            var _streak_arr = copy.streak_arr;
            _streak_arr.push(copy.checked);
            _streak_arr.shift();
            Tasks.insert(
                {
                    userId: Meteor.userId(),
                    text: copy.text,
                    createdAt: copy.createdAt,
                    cat: copy.cat,
                    dueDate_first: copy.dueDate_first,
                    dueDate: moment(copy.dueDate).add(1, 'days').format("L"),
                    streak_arr: _streak_arr,
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
                    <div className="centered">
                        <button type="button" className="btn btn-primary btn-lg center" onClick={this.copyUnchecked}>
                            Copy unchecked tasks
                        </button>
                    </div>
                </div>

                <Challenge30 />

                <div>
                    <h3>Habits</h3>
                    {this.data.habits.length <7 ? <HabitInput /> : null }
                    <table className="table habit-table">
                        <tbody>
                        {this.renderHabitsTable()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Most Important Tasks</h3>
                    {this.data.mit.length <3 ? <MITInput /> : null }
                    <table className="table mit-table">
                        <tbody>
                        {this.renderMITTable()}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <h3>Tasks</h3>
                    <TaskInput />
                    <table className="table task-table">
                        <tbody>
                        {this.renderTasksTable()}
                        </tbody>
                    </table>
                </div>
                <HistoryList />
            </div>

        );
    }
});

