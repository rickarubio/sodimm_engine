var Chatroom = React.createClass({
  mixins: [State],

  getInitialState: function() {
    return {
      messages: [],
      slug: 'test room'
    };
  },

  componentDidMount: function() {
    var params = this.getParams();
    $.get('/chat/' + params.roomId, function(result) {
      console.log('ajax result:', result);
      if (this.isMounted()) {
        this.setState(result);
      }
    }.bind(this));
  },

  addMessage: function(message) {
    console.log('chatroom updated!');
    this.state.messages.push(message);
  },

  render: function() {
    var messages = this.state.messages;
    console.log('chatroom state:', this.state);
    var path = '/chat/' + this.state.slug;

    var val = messages.map(function(e) {
      return (
        <div>{ e.author } | { e.message }</div>
      );
    });

    return (
      <div>
        <h1>{ this.state.slug } <small>{ this.state.topic }</small></h1>
        { val }
        <Chatbar formPath={ path } updateParent={ this.addMessage } />
      </div>
    );
  }
});
