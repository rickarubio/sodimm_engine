var Router = ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var HistoryLocation = Router.HistoryLocation;

/*
 * TODO add sidebar to layout
 */
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
      path=":roomId"
      handler={ Chatroom } />

  </Route>
);

/*
 * kicks off react router on div.main-content on the landing page
 */
Router.run(routes, HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementsByClassName('main-content')[0]);
});
