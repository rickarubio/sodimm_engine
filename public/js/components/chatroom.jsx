var Chatroom = React.createClass({
  mixins: [Router.State],

  getInitialState: function() {
    return {
      messages: [],
      name: 'test room'
    };
  },

  componentDidMount: function() {
    var params = this.getParams();
    console.log('chatroom params:', params.roomId);
    $.get('/chat/' + params.roomId, function(result) {
      if (this.isMounted()) {
        this.setState(result);
      }
    }.bind(this));
  },

  render: function() {
    var messages = this.state.messages;

    var val = messages.map(function(e) {
      return (
        <div>{ e.author} | { e.message }</div>
      );
    });

    return (
      <div>
        <h2>{ this.state.name }</h2>
        { val }
      </div>
    );
  }

});

Chatroom = React.createFactory(Chatroom);

React.render(
  Chatroom(),
  document.getElementById('chatroom')
);
