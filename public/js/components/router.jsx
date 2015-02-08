var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.Handler;
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
  <Route handler={App} path="/">
    <Route name="chatroom" handler={Chatroom} />
    <Route name="chatrooms" handler={Chatrooms} />
  </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
  React.render(
    <Handler />,
    document.body
  );
});
