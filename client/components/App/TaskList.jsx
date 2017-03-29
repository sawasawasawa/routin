TaskList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        const handle = Meteor.subscribe('tasks');
        const _date = moment(Session.get("displayedDate")).format("L");
        const docsForDay = Tasks.find({
            userId: Meteor.userId(),
            dueDate: _date,
          }, {sort: {createdAt: 1}}).fetch();

        return {

            ready: handle.ready(),

            habit: docsForDay.filter((task) => {
                return task.cat === 'habit'
            }),
            mit: docsForDay.filter((task) => {
                return task.cat === 'mit'
            }),
            task: docsForDay.filter((task) => {
                return task.cat === 'task'
            }),
            questionnaire: docsForDay.filter((task) => {
                return task.cat === 'questionnaire'
            }),
            journal: docsForDay.filter((task) => {
                return task.cat === 'journal'
            })
        }
    },

    copyUnchecked(){
        this.copyChallenge();
        this.copyTasksFromCategory('task');
        this.copyTasksFromCategory('mit');
        this.copyTasksFromCategory('habit');
        this.copyTasksFromCategory('questionnaire');
    },

    copyTasksFromCategory(category){
        const _checkedQuery = category == 'habit' || category == 'questionnaire' ? {$exists: true} : false;
        var _tasksToCopy = Tasks.find({
            cat: category,
            checked: _checkedQuery,
            userId: Meteor.userId(),
            dueDate: moment(Session.get("displayedDate")).format("L")
        }).fetch();

        _tasksToCopy.forEach(function (myDoc) {
            var copy = myDoc;
            var _streak_arr = [];
            if (category === 'habit') {
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

        if (!this.data.ready) {
            return <div className="centered">
                <h1>Loading...</h1>
            </div>

        }


        return (
            <div className="taskList">
                <div className="taskList-inner">
                    <div className="container-fluid main-container main-content">
                        <div className="centered">
                            <button type="button" className="btn btn-primary btn-lg center"
                                    onClick={this.copyUnchecked}>
                                Copy unchecked tasks
                            </button>
                        </div>
                    </div>

                    <Challenge30 />

                    <CategoryList type={'habit'} name={'Habits'} data={this.data['habit']} maxItemCount={5}/>
                    <CategoryList type={'mit'} name={'Most Important Tasks'} data={this.data['mit']} maxItemCount={3}/>
                    <CategoryList type={'task'} name={'Tasks'} data={this.data['task']}/>
                    <CategoryList type={'questionnaire'} name={'Things to remember about'} data={this.data['questionnaire']}/>

                    <JournalContainer journal={this.data.journal}/>

                </div>
            </div>
        );
    },
});

