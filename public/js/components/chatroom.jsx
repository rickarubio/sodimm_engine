var Chatroom = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      name: 'test room'
    };
  },

  componentDidMount: function() {
    $.get('/chat/' + '', function(result) {
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
