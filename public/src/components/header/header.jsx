import React from 'react';
import { Navbar } from 'react-materialize';
import './header.css'

const Header = () => {
  return (
<Navbar
  alignLinks="left"
  brand={<img className="Navbar brand-logo" href="#" atl="The letters P-I-D-G-E-E and an exclamation point that looks like a feather" src="../../images/Pidgee-Logo.png"></img>}
  centerLogo
  id="mobile-nav"
  menuIcon={<Icon>menu</Icon>}
  options={{
    draggable: true,
    edge: 'left',
    inDuration: 250,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 200,
    preventScrolling: true
  }}
>
  <NavItem onClick={function noRefCheck(){}}>
    Getting started
  </NavItem>
  <NavItem href="components.html">
    Components
  </NavItem>
</Navbar>
)};

export default Header;

