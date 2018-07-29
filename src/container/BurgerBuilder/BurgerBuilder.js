import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    chesse: 0.4,
    meat: 1.5
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('https://react-my-burger-e8dee.firebaseio.com/ingredients.json')
            .then(response => {
//            console.log(response.data)
            this.setState({ingredients: response.data});
        }).catch(error => {
            this.setState({error: true});
        });
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    updatePurchaseState (ingredients) {
//        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map((igkey) => {
            return ingredients[igkey];
        }).reduce((sum, el) =>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedingredients = {
            ...this.state.ingredients
        }
        updatedingredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedingredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedingredients);
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;
        if (newCount >= 0) {
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = newCount;
            const priceSub = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSub;
            this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
            this.updatePurchaseState(updatedIngredients);
        }
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
//        alert('yehhh!');
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    
    render () {
//        console.log(this.state.totalPrice);
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummery = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.state.ingredients) {
           burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}  
                        price={this.state.totalPrice}
                    />
                </Aux>
            ); 
            orderSummery = <OrderSummery 
                        ingredients={this.state.ingredients} 
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                />;
        }
        if(this.state.loading) {
            orderSummery = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalColsed={this.purchaseCancelHandler}>
                    { orderSummery }
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);