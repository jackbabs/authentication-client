import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Header extends Component { 
  renderLinks(){
    if(this.props.authenticated){
      return <li className="nav-item">
        <NavLink to="/" className="nav-link">Sign out</NavLink>
      </li>
    } else {
      return [
        <li className="nav-item" key={1}>
        <NavLink to="/signin" className="nav-link">Sign in</NavLink>
      </li>,
      <li className="nav-item" key={2}>
        <NavLink to="/signup" className="nav-link">Sign up</NavLink>
      </li>
      ]
    }
  }
  render(){
    return (
      <nav className="navbar navbar-light">
        <NavLink to="/" className="navbar-brand">Redux Auth</NavLink>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header) 