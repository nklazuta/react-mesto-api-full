import { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    const handleNameChange = evt => {
        setName(evt.target.value);
    };

    const handleLinkChange = evt => {
        setLink(evt.target.value);
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        onAddPlace({
            name,
            link
        });
    };

    return (
        <PopupWithForm name="add-form" title="Новое место" buttonText="Создать" {...{ isOpen, onClose, isLoading }} onSubmit={handleSubmit} >
            <input
                className="popup__input popup__input_type_place"
                id="place-input"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
                required
            />
            <span className="popup__error place-input-error"></span>
            <input
                className="popup__input popup__input_type_link"
                id="link-input"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={handleLinkChange}
                required
            />
            <span className="popup__error link-input-error"></span>
        </PopupWithForm>
    );
}