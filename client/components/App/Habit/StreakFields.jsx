StreakFields = React.createClass({

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        streak: React.PropTypes.array.isRequired
    },

    colorField(int){
        if (this.props.streak[int] == true) {
            return " colorBlue";
        } else {
            return " colorRed";
        }
    },

    render(){
        return (<td className="streakFields">
                            <div className={"streakInd" + this.colorField(0)}></div>
                            <div className={"streakInd" + this.colorField(1)}></div>
                            <div className={"streakInd" + this.colorField(2)}></div>
                            <div className={"streakInd" + this.colorField(3)}></div>
                            <div className={"streakInd" + this.colorField(4)}></div>
                            <div className={"streakInd" + this.colorField(5)}></div>
                            <div className={"streakInd" + this.colorField(6)}></div>

            </td>
        );
    }
})