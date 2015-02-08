var Router = ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HistoryLocation = Router.HistoryLocation;

var App = React.createClass({
  render: function() {
    return (
      <div>
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
      path='/chat/:roomId'
      handler={ Chatroom } />

  </Route>
);

Router.run(routes, HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
