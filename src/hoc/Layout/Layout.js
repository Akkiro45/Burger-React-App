import React, { Component } from 'react';
import Aux from '../Auxx/Auxx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerColsedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    
    openSideDrawerHandler = () => {
        this.setState((prevState) => { 
            return {showSideDrawer: !prevState.showSideDrawer} 
        }
        );
    }
    
    render () {
        return (
            <Aux>
                <Toolbar open={this.openSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerColsedHandler} />
                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;