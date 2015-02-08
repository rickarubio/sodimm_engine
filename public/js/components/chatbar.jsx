var Chatbar = React.createClass({
  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    // var formAction = '/chat/' + { this.props.roomId };
    console.log('chatbar props', this.props);
    // console.log('user is:', user);

    return (
      <div className="chatbar row">
        <form action={ this.props.formPath } method='POST'>
          <input type='text' name='message' id="message__input"/>
          <button id="new-message__submit" name='submit'>Send</button>
        </form>
      </div>
    );
  }
});
