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

    renderTable(taskType){
        console.log('PINGWIN: this.data[taskType]', this.data[taskType]);
        return this.data[taskType].map((task) => {
            switch(taskType) {
                case 'dueTasks':
                    return <TaskRow type={taskType} key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
                    break;
                case 'mit':
                    return <MITRow type={taskType} key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
                    break;
                case 'habits':
                    return <HabitRow type={taskType} key={task._id} keyId={task._id} task={task} subtasks={task.subtasks}/>;
                    break;
            }
        });
    },

    copyUnchecked(){
        this.copyChallenge();
        this.copyTasksFromCategory('task');
        this.copyTasksFromCategory('mit');
        this.copyTasksFromCategory('habit');
    },

    copyTasksFromCategory(category){
        var _tasksToCopy = Tasks.find({
            cat: category,
            userId: Meteor.userId(),
            dueDate: moment(Session.get("displayedDate")).format("L")
        }).fetch();

        _tasksToCopy.forEach(function (myDoc) {
            var copy = myDoc;
            var _streak_arr = [];
            if (category==='habit'){
                _streak_arr = copy.streak_arr;
                _streak_arr.push(copy.checked);
                _streak_arr.shift();
            }
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


    copyChallenge(){
        var _tasksToCopy = Tasks.find({
            cat: 'challenge',
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
                        {this.renderTable('habits')}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Most Important Tasks</h3>
                    {this.data.mit.length <3 ? <MITInput /> : null }
                    <table className="table mit-table">
                        <tbody>
                        {this.renderTable('mit')}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <h3>Tasks</h3>
                    <TaskInput />
                    <table className="table task-table">
                        <tbody>
                        {this.renderTable('dueTasks')}
                        </tbody>
                    </table>
                </div>

            </div>

        );
    }
});

