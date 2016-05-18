JournalElement = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
    },


    getInitialState() {
        return {
            text: this.props.text,
        }
    },

    update(e){
        const key = this.props.type;
        const id = this.props.journalId;
        const value = e.target.value;
        var _updateObject = { };
        _updateObject[key] = value;
        Tasks.update({_id: id},
            {$set: _updateObject}
        );
    },

    getHeader(){
        let _header;
        switch (this.props.type){
            case 'gratefulness':
                _header = 'I am grateful for:';
                break;
            case 'makeTodayGreat':
                _header = "What would make today great?";
                break;
            case 'affirmation':
                _header ='Daily affirmation. I am...';
                break;
            case 'amazingThings':
                _header ='Amazing things that happened today:';
                break;
            case 'todayBetter':
                _header ='What would make today better?';
                break;
            default:
                _header = this.props.type;
                break;
        }
        return _header;
    },
    render() {
        return (
            <div className="width100">
                <h5 className="gratefulness">{this.getHeader()}</h5>
                <textarea className="form-control "
                          rows="3"
                          id={this.props.type}
                          value={this.props.text}
                          onChange={this.update}
                ></textarea>
            </div>
        );
    }


});
