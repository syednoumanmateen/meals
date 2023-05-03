import React, { useContext, useState } from 'react'
import CartContext from '../../Store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = ({ onHideCart }) => {

    const { items, amount, addItem, removeItem, clearCart } = useContext(CartContext)
    const [isCheckout, setCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartItemRemoveHandler = (id) => {
        removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://meals-fa02e-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: items
            })
        })

        setIsSubmitting(false)
        setDidSubmit(true)
        clearCart()
    }

    const cartItems = <ul className={classes['cart-items']}>{items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={cartItemAddHandler.bind(null, item)} onRemove={cartItemRemoveHandler.bind(null, item.id)} />)}</ul>
    const hasItem = items.length > 0

    const modalAction = (<div className={classes.actions}>
        <button className={classes['button-alt']} onClick={onHideCart}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>)

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>total Amount</span>
                <span>${amount.toFixed(2)}</span>
            </div>
            {isCheckout && <Checkout onCancel={onHideCart} onConfirm={submitOrderHandler} />}
            {!isCheckout && modalAction}
        </>
    )

    const isSubmittingContent = <p>Sending Order data...</p>

    const didSubmitContent = (<><p>successfully Sent Order!</p>
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={onHideCart}>Close</button>
        </div>
    </>)

    return (
        <Modal onClick={onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && isSubmittingContent}
            {!isSubmitting && didSubmit && didSubmitContent}
        </Modal>
    )
}

export default Cart
