import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = ({ onClick }) => {
    return <div className={classes.backdrop} onClick={onClick} />
}

const ModalOverlay = ({ children }) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
    </div>
}

const Modal = ({ onClick, children }) => {

    const portalElement = document.getElementById('overlays')

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={onClick} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal
