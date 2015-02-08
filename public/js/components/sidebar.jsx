var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      sections: [{name: 'Create A Channel'}, {name: 'Search Channels'}, {name: '#JavaScript'}]
    };
  },

  //componentDidMount: function() {
    //$.get('/chat', function(result) {
      //if (this.isMounted()) {
        //this.setState(result);
      //i}
    //}.bind(this));
  //},

  render: function() {
    var sections = this.state.sections;
    console.log('sections', sections);
    var sectionHtml = sections.map(function(section) {
      return (
        <div className="sidebar__section">
          <a href="#">
              { section.name }
          </a>
        </div>
      );
    });

    return (
      <div>
        { sectionHtml }
      </div>
    );
  }
});

React.render(
  <Sidebar />,
  document.getElementById('sidebar')
);
