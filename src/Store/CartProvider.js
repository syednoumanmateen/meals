import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    let updatedItems

    if (action.type === 'ADD') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const UpdateTotalAmount = state.totalAmount + action.item.price * action.item.amount


        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: UpdateTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const UpdateTotalAmount = state.totalAmount - existingCartItem.price

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: UpdateTotalAmount
        }
    }

    if (action.type === 'CLEAR') {
        return defaultCartState
    }

    return defaultCartState
}

const CartProvider = ({ children }) => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCart({ type: 'ADD', item })
    }

    const removeItemFromCartHandler = id => {
        dispatchCart({ type: 'REMOVE', id })
    }

    const clearItemFromCartHandler = () => {
        dispatchCart({ type: 'Clear' })
    }

    const cartContext = {
        items: cartState.items,
        amount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider >
}

export default CartProvider
