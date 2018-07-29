import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        return (
            <Aux>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} clicked={this.props.modalColsed}/>
            </Aux>
        );
    }
}

export default Modal;