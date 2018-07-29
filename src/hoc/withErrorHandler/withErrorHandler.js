import React, {Component} from 'react';
import Aux from '../Auxx/Auxx';
import Modal from '../../components/UI/Modal/Modal';

const withErrorhandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        state = {
            error: null
        }
        
        componentWillMount = () => {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null}); 
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, error => { 
                this.setState({error: error})
            });
        }
        
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        
        errorConformedhandler = () => {
            this.setState({error: null});
        }
        
        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalColsed={this.errorConformedhandler}
                    >
                        {this.state.error ?  this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }  
} 
                
export default withErrorhandler;