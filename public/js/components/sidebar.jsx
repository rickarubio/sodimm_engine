var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      sections: []
    };
  },

  //componentDidMount: function() {
    //$.get('/chat', function(result) {
      //if (this.isMounted()) {
        //this.setState(result);
      //}
    //}.bind(this));
  //},

  render: function() {
    var sections = this.state.sections;
    console.log('sections', sections);
    var sectionHtml = sections.map(function(section) {
      return (
        <div>{ section.name }</div>
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
