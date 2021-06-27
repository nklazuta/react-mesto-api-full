import { useState, useEffect, useContext } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        currentUser.name && setName(currentUser.name);
        currentUser.about && setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    const handleNameChange = evt => {
        setName(evt.target.value);
    };

    const handleDescriptionChange = evt => {
        setDescription(evt.target.value);
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    };

    return (
        <PopupWithForm name="edit-form" title="Редактировать профиль" buttonText="Сохранить" {...{isOpen, onClose, isLoading}} onSubmit={handleSubmit} >
            <input
                className="popup__input popup__input_type_name"
                id="name-input"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
                required
            />
            <span className="popup__error name-input-error"></span>
            <input
                className="popup__input popup__input_type_about"
                id="about-input"
                type="text"
                name="about"
                placeholder="Занятие"
                minLength="2"
                maxLength="200"
                value={description}
                onChange={handleDescriptionChange}
                required
            />
            <span className="popup__error about-input-error"></span>
        </PopupWithForm>
    );
}