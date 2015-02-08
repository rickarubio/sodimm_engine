var Chatrooms = React.createClass({
  getInitialState: function() {
    return {
      rooms: []
    };
  },

  componentDidMount: function() {
    $.get('/chat', function(result) {
      if (this.isMounted()) {
        this.setState(result);
      }
    }.bind(this));
  },

  render: function() {
    var rooms = this.state.rooms;
    console.log('rooms', rooms);
    var val = rooms.map(function(e) {
		var path = '/chat/' + e.name;
      return (
	<div className='row'>
        <div className='col-sm-3'> 
			<a href={ path }> { e.name } </a>
		</div>  
    	<div className='col-sm-3'> { e.topic } </div>
</div>
      );
    });

    return (
      <div>
        <h2>Chatrooms</h2>
        { val }
      </div>
    );
  }

});

React.render(
  <Chatrooms />,
  document.getElementById('chatrooms')
);
