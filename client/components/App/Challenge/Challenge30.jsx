Challenge30= React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        Meteor.subscribe('tasks');
        return {
            challenge: Tasks.find({
                userId: Meteor.userId(),
                dueDate: moment(Session.get("displayedDate")).format("L"),
                cat: 'challenge'
            }).fetch()
        }
    },


    render() {
        console.log('PINGWIN: this.data.challenge.length', this.data.challenge.length);
        console.log('PINGWIN: this.data', this.data);
        return (
            <div>
                {this.data.challenge.length>0 ? "jest challenge" : <ChallengeInput />}
            </div>

        );
    }
});

