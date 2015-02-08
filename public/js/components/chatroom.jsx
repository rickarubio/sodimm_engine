var Chatroom = React.createClass({

  render: function() {

    return (
      <h2>Chatroom</h2>
    );
  }

});

Chatroom = React.createFactory(Chatroom);

React.render(
  Chatroom(),
  document.getElementById('example')
);
