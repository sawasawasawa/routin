Meteor.publish("tasks", function () {
    return Tasks.find({userId:this.userId});
});
