Challenge30 = React.createClass({
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

    // componentWillReceiveProps(){console.log('challenge30 received props')},

    render() {
        return (
            <div classnName="width100">
                {this.data.challenge.length>0 ?
                <Challenge id={this.data.challenge[0]._id}
                           text={this.data.challenge[0].text}
                           checked={this.data.challenge[0].checked}
                           streak_arr={this.data.challenge[0].streak_arr}
                /> :
                <ChallengeInput />}
            </div>

        );
    }
});

