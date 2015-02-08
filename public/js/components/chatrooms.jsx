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
    var val = rooms.map(function(room) {

      return (
        <div className='row' key={ room.name }>
          <div className='col-sm-3'>
            <Link to='chatroom' params={{ roomId: room.slug }}>{ room.name }</Link>
          </div>
          <div className='col-sm-9'> { room.topic } </div>
        </div>
      );
    });

    return (
      <div className="col-sm-9">
        <h2>Chatrooms</h2>
        <div className='row'>
          <div className='col-sm-3'><h3>Title</h3></div>
          <div className='col-sm-9'><h3>Topic</h3></div>
        </div>
        { val }
      </div>
    );
  }
});
