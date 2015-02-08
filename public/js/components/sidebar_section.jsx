var SidebarSection = React.createClass({
  getDefaultProps: function() {
    return {
      iconClassName: 'hide'
    }
  },

  render: function() {
    return (
      <div className="sidebar__section">
        <a href="#">
         <i className={ this.props.iconClassName }></i>
          { this.props.name }
        </a>
      </div>
    );
  }});
