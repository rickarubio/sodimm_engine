var Chatbar = React.createClass({
  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    return (
      <div className="chatbar row">
        <input type='text' name='chatbar' className="col-sm-10"/>
        <button name='submit' className="col-sm-2">Send</button>
      </div>
    );
  }
});
