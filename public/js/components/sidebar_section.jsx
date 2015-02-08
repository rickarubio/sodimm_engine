var SidebarSection = React.createClass({
  render: function() {
    return (
      <div className="sidebar__section">
        <a href="#">
          { this.props.name }
        </a>
      </div>
    );
  }});
