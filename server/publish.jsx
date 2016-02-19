Meteor.publish("tasks", function () {
    //console.log("LOG: publish ", Tasks.find({userId:this.userId}).count(), " tasks fo user", this.userId);
    return Tasks.find({userId:this.userId});
});
