import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';

import * as actions from 'actions';

var Nav = React.createClass({

  handleSubmit (e) {
    e.preventDefault();

    var searchText = this.refs.projectName.value;

    var {dispatch} = this.props;

    this.refs.projectName.value = '';
    //console.log('Search text:', searchText);

    dispatch(actions.setSearchText(searchText));
  },

  handleLogout (e) {
    e.preventDefault();
    
    const {dispatch} = this.props;

    dispatch(actions.startLogout());
  },

  render: function(){
    const {isLoggedIn} = this.props;

    const renderLogin = () => {
      if(isLoggedIn){
        return (
          <Link activeClassName="active-link" onClick={this.handleLogout}>Logout</Link>
        );
      }else{
        return (
          <Link activeClassName="active-link" to="/login">Login</Link>
        );
      }
    }

    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">
              Neuroimaging Archive
            </li>
            <li>
              <IndexLink activeClassName="active-link" to="/">Projects</IndexLink>
            </li>
            <li>
              <Link activeClassName="active-link" to="/edit_projects">Edit Projects</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <form onSubmit={this.handleSubmit}>
            <ul className="menu">
              <li>
                <input type="search" ref="projectName" placeholder="Search"/>
              </li>
              <li>
                <input type="submit" className="button" value="Search"/>
              </li>
              <li>
                {renderLogin()}
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
});

export default connect(({isLoggedIn}) => {
  return {isLoggedIn};
}, null, null, {pure:false})(Nav);
//export default Nav;
// <div onClick={this.handleLogout}>
//   Logout
// </div>
