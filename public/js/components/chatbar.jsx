var Chatbar = React.createClass({

  getDefaultProps: function() {
    return {
    };
  },

  handler: function(event) {
    event.preventDefault();
    console.log('button intercepted!', event);
    var formData = {
      message: $('form input').val()
    };
    $.post(this.props.formPath, formData, function(data) {
      // append message to log
      console.log('$.post data:', data);
      console.log('chatbox props', this.props);
      this.props.updateParent(data);
    }.bind(this));
    $('form input').val('');
  },

  render: function() {
    // var formAction = '/chat/' + { this.props.roomId };
    console.log('chatbar props', this.props);
    // console.log('user is:', user);

    return (
      <div className="chatbar row">
        <form id='newMessageForm' action={ this.props.formPath }
              method='POST' onSubmit={ this.handler }>
          <input type='text' name='message' id="message__input"/>
          <button id="new-message__submit" name='submit'>Send</button>
        </form>
      </div>
    );
  }
});
