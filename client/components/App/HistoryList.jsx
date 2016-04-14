HistoryList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        Meteor.subscribe('tasks');
        var dateLast = moment(Session.get("displayedDate")).format("L");
        var dateFirst = moment(Session.get("displayedDate")).add(-7, 'days').format("L");
        return {
            completed: Tasks.find({
                userId: Meteor.userId(),
                dueDate: {$lt: dateLast, $gt: dateFirst},
                cat: 'task',
            }, {sort: {checked: 1}}).fetch()
        }
    },

    renderHistoryTable() {

        return this.data.completed.map((task) => {
            return <TaskRow type="completedTask" key={task._id+'_completed'} keyId={task._id+'_completed'}
                            task={task}/>;
        });
    },


//
    render() {

        return (
            <div className="table-responsive historyList">
                <h3>Completed Last Week</h3>
                <table className="table task-table ">
                    <tbody>
                        {this.renderHistoryTable()}
                    </tbody>
                </table>
            </div>

        );
    }
});

