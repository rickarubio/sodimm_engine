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
    console.log('rooms', rooms);
    var val = rooms.map(function(e) {
      return (
        <div>{ e.name } | { e.topic }</div>
      );
    });

    return (
      <div>
        <h2>Chatrooms</h2>
        { val }
      </div>
    );
  }

});

Chatrooms = React.createFactory(Chatrooms);

React.render(
  Chatrooms(),
  document.getElementById('chatrooms')
);
