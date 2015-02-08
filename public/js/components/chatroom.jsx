var Chatroom = React.createClass({
  mixins: [State],

  getInitialState: function() {
    return {
      messages: [],
      slug: 'test room'
    };
  },

  componentDidMount: function() {
    window.setInterval(function() {
      this.getMessages();
    }.bind(this),
    1000);
  },

  getMessages: function() {
    var params = this.getParams();
    $.get('/chat/' + params.roomId, function(result) {
      console.log('ajax result:', result);
      if (this.isMounted()) {
        this.setState(result);
      }
    }.bind(this));
    // setTimeout(function() {
    //   $('.messages-container').scrollTop($(document).height());
    // }, 1000);
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
      var sentiment;
      if (e.score > 0) {
        sentiment = 'good';
      } else if (e.score < 0){
        sentiment = 'bad';
      } else {
        sentiment = '';
      }
      return (
        <p className={ sentiment } key={ e._id }>
          <i className="fa fa-thumbs-o-up"></i> { e.author } | { e.message }
        </p>
      );
    });

    return (
      <div className="chatroom-container">
        <div className="messages-container">
          <h1>{ this.state.slug } <small>{ this.state.topic }</small></h1>
          { val }
        </div>
        <Chatbar formPath={ path } updateParent={ this.addMessage } />
      </div>
    );
  }
});
