Challenge = React.createClass({

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.id, {
            $set: {checked: !this.props.checked}
        });
    },

    render(){
        return (
            <div styleName="width100">
                <h3>30 day challenge</h3>
                <div styleName="width100">
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        onChange={this.toggleChecked}/>
                    <div>{this.props.text}</div>
                </div>
            </div>
        )
    }
});

