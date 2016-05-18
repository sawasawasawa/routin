JournalContainer = React.createClass({

    createJournalRecord(){
        var found = Tasks.find({
            userId: Meteor.userId(),
            cat: 'journal',
            date: _date
        }).fetch();

        if (found.length == 0) {

            var _date = moment(Session.get("displayedDate")).format("L");
            Tasks.insert(
                {
                    cat: 'journal',
                    userId: Meteor.userId(),
                    date: _date,
                    username: Meteor.user().emails[0]["address"],
                    gratefulness: '',
                    makeTodayGreat: '',
                    affirmation: '',
                    amazingThings: '',
                    todayBetter: ''
                }
            );
        }
    },

    render() {
        if (!this.props.journal) {
            this.createJournalRecord();
            return <h2>Loading...</h2>
        }

        return (
            <div className="width100">
                <h3>5 minute journal</h3>
                <div className="form-group">
                    <JournalElement type='gratefulness'
                                    journalId={this.props.journal._id}
                                    text={this.props.journal.gratefulness}/>
                    <JournalElement type='makeTodayGreat'
                                    journalId={this.props.journal._id}
                                    text={this.props.journal.makeTodayGreat}/>
                    <JournalElement type='affirmation'
                                    journalId={this.props.journal._id}
                                    text={this.props.journal.affirmation}/>
                    <JournalElement type='amazingThings'
                                    journalId={this.props.journal._id}
                                    text={this.props.journal.amazingThings}/>
                    <JournalElement type='todayBetter'
                                    journalId={this.props.journal._id}
                                    text={this.props.journal.todayBetter}/>


                </div>
            </div>

        );
    }
});


