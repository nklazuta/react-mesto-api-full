import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup({ card, onClose, onSubmit }) {
    const isOpen = card ? true : false;

    const handleSubmit = evt => {
        evt.preventDefault();
        onSubmit(card);
    };

    return (
        <PopupWithForm name="confirm-delete" title="Вы уверены?" buttonText="Да" {...{isOpen, onClose}} onSubmit={handleSubmit} />
    );
}