var SidebarSection = React.createClass({
  sectionAction: function() {
    if (this.props.action === 'create') {
      $('#myModal').modal('toggle')
    }
  },

  getDefaultProps: function() {
    return {
      iconClassName: 'hide'
    }
  },

  render: function() {
    return (
      <div className="sidebar__section" onClick={this.sectionAction}>
        <a href="#">
         <i className={ this.props.iconClassName } action={ this.props.action }></i>
          { this.props.name }
        </a>
      </div>
    );
  }
});
