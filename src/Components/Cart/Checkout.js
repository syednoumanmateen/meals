import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''
const isFiveChar = value => value.length !== 5

const Checkout = ({ onCancel, onConfirm }) => {

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const confirmedHandler = (e) => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isFiveChar(enteredPostalCode);

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalCodeIsValid

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        })

        if (!formIsValid) {
            return
        }

        onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        })
    }

    const nameClasses = formInputValidity.name ? '' : classes.invalid
    const streetClasses = formInputValidity.street ? '' : classes.invalid
    const postalCodeClasses = formInputValidity.postalCode ? '' : classes.invalid
    const cityClasses = formInputValidity.city ? '' : classes.invalid

    return (
        <form className={classes.form} onSubmit={confirmedHandler}>
            <div className={`${classes.control} ${nameClasses}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" name="" ref={nameInputRef} id="name" />
                {!formInputValidity.name && <p>Please enter the name</p>}
            </div>
            <div className={`${classes.control} ${streetClasses}`}>
                <label htmlFor="street">Street</label>
                <input type="text" name="" ref={streetInputRef} id="street" />
                {!formInputValidity.street && <p>Please enter the Street</p>}
            </div>
            <div className={`${classes.control} ${postalCodeClasses}`}>
                <label htmlFor="postal">Postal code</label>
                <input type="text" name="" ref={postalCodeInputRef} id="postal" />
                {!formInputValidity.postalCode && <p>Please enter the PostalCode</p>}
            </div>
            <div className={`${classes.control} ${cityClasses}`}>
                <label htmlFor="city">City</label>
                <input type="text" name="" ref={cityInputRef} id="city" />
                {!formInputValidity.city && <p>Please enter the city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout
