StreakFields = React.createClass({

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        streak: React.PropTypes.array.isRequired
    },

    colorField(int){
        if (this.props.streak[int] = 1) {
            return " colorRed";
        }
    },

    render(){
        return (<tr className="width100">
                <td colSpan="4">
                    <table className="table streakTable">
                        <tbody>
                        <tr colSpan="7">
                            <td className={"streakInd" + this.colorField(0)}></td>
                            <td className={"streakInd" + this.colorField(1)}></td>
                            <td className={"streakInd" + this.colorField(2)}></td>
                            <td className={"streakInd" + this.colorField(3)}></td>
                            <td className={"streakInd" + this.colorField(4)}></td>
                            <td className={"streakInd" + this.colorField(5)}></td>
                            <td className={"streakInd" + this.colorField(6)}></td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
})