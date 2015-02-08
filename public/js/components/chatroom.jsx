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

  render: function() {
    var messages = this.state.messages;
    console.log('chatroom state:', this.state);

    var val = messages.map(function(e) {
      return (
        <div>{ e.author} | { e.message }</div>
      );
    });

    return (
      <div>
        <h1 className="col-sm-1">{ this.state.slug }</h1>
        <h2 className="col-sm-9">{ this.state.topic }</h2>
        { val }
      </div>
    );
  }

});
