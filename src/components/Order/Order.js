import React from 'react';
import classes from './Order.css';

const order = (props) => {
    
    const ingredients = [];
    for(let ingredient in props.ingredients ) {
        ingredients.push({
            name: ingredient,
            amout: props.ingredients[ingredient]
        });
    }
    
    const ingredientsOutput = ingredients.map(ig => {
        return <span 
                    style={{
                           textTransform: 'capitalize',
                           display: 'inline-block',
                           margin: '0 8px',
                           border: '1px solid #CCC',
                           padding: '5px'
                          }}
                    key={ig.name} >{ig.name} ({ig.amout})</span>
    });
    
    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );   
}

export default order;
