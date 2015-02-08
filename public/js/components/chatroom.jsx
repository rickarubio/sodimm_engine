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
    setTimeout(function() {
      $('.messages-container').scrollTop($(document).height());
    }, 1000);
  },

  render: function() {
    var messages = this.state.messages;
    console.log('chatroom state:', this.state);
    var path = '/chat/' + this.state.slug;

    var val = messages.map(function(e) {
      return (
        <p>{ e.author } | { e.message }</p>
      );
    });

    return (
      <div className="chatroom-container">
        <div className="messages-container">
          <h1>{ this.state.slug } <small>{ this.state.topic }</small></h1>
          { val }
        </div>
        <Chatbar formPath={ path } />
      </div>
    );
  }
});
