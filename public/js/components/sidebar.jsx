var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      sections: [
        {name: 'Create A Channel', iconClassName: 'fa fa-plus', action: 'create'},
        {name: 'Search Channels', iconClassName: 'fa fa-search'},
        {name: 'JavaScript', iconClassName: 'fa fa-comments-o'},
        {name: 'React', iconClassName: 'fa fa-comments-o'},
        {name: 'Node', iconClassName: 'fa fa-comments-o'},
        {name: 'Bitcoin', iconClassName: 'fa fa-comments-o'}
      ]
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
    var sectionHtml = sections.map(function(section) {
      return (
        <SidebarSection name={section.name} iconClassName={section.iconClassName} action={section.action}/>
      );
    });

    return (
      <div className="sidebar">
        { sectionHtml }
      </div>
    );
  }
});
