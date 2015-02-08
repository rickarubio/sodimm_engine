var Chatroom = React.createClass({
  mixins: [State],

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
        <h1>{ this.state.name }</h1>
        <h2>{ this.state.topic }</h2>
        { val }
      </div>
    );
  }

});
