CategoryList = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  },

  renderList(taskType){
    return this.props.data.map((task) => {
      if (taskType == 'questionnaire') {
        //TODO get rid of this
        return <QuestionnaireRow type={taskType} key={task._id} keyId={task._id} task={task}/>
      } else {
        return <TaskRow type={taskType} key={task._id} keyId={task._id} task={task}/>
      }
    });
  },

  render() {
    return (
      <div className="table-responsive">
        <h3>{this.props.name}</h3>
        {this.props.maxItemCount && this.props.data.length >= this.props.maxItemCount ? null : <TaskInput type={this.props.type}/> }
        <table className={`table ${this.props.type}-table`}>
          <tbody>
          {this.renderList(this.props.type)}
          </tbody>
        </table>
      </div>
    );
  }


});
