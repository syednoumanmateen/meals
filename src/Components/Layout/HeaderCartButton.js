import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../Store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = ({ onClick }) => {

    const { items } = useContext(CartContext)

    const numberOfCartItems = items.length && items.reduce((a, item) => a + item.amount, 0)

    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false)
    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighLighted(true)

        const timeClean = setTimeout(() => {
            setBtnIsHighLighted(false)
        }, 300)

        return () => {
            clearTimeout(timeClean)
        }
    }, [items])

    return (
        <>
            <button className={btnClasses} onClick={onClick}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>
                    {numberOfCartItems}
                </span>
            </button>
        </>
    )
}

export default HeaderCartButton
