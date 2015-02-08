var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Sidebar />
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route
    name='app'
    path='/'
    handler={ App }>

    <DefaultRoute
      name="chatrooms"
      handler={ Chatrooms } />

    <Route
      name="chatroom"
      path="chatroom/?:roomId?"
      handler={ Chatroom } />

  </Route>
);

/*
 * kicks off react router on div.main-content on the landing page
 */
Router.run(routes, HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementsByClassName('main-content')[0]);
});
