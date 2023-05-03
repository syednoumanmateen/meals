import React, { useContext } from 'react'
import CartContext from '../../../Store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = ({ name, description, price, id }) => {

    const { addItem } = useContext(CartContext)

    const onAddToCart = amount => {
        addItem({
            id, name, amount, price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>
                    {name}
                </h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>${price.toFixed(2)}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={onAddToCart} />
            </div>
        </li>
    )
}

export default MealItem
