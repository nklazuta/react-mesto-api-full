import React from 'react';
import Loading from './Loading';

export default function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit, isLoading }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    {
                        !isLoading
                            ? <button className="popup__submit-button" type="submit">{buttonText}</button>
                            : <Loading />
                    }
                </form>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}