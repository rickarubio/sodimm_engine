var Chatrooms = React.createClass({

  getInitialState: function() {
    return {
      rooms: []
    };
  },

  componentDidMount: function() {
    $.get('/chat', function(result) {
      if (this.isMounted()) {
        this.setState(result);
      }
    }.bind(this));
  },

  render: function() {
    var rooms = this.state.rooms;
    var val = rooms.map(function(e) {
      // var path = '/chatroom/' + e.name;

      return (
        <div className='row' key={ e.name }>
          <div className='col-sm-3'>
            <Link to='chatroom' params={{ roomId: e.name }}> { e.name } </Link>
          </div>
          <div className='col-sm-3'> { e.topic } </div>
        </div>
      );
    });

    return (
      <div className="col-sm-9">
        <h2>Chatrooms</h2>
        { val }
      </div>
    );
  }
});
