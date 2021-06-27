import { useEffect, useRef } from "react";
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const userAvatar = useRef();

    useEffect(() => {
        userAvatar.current.value = '';
    }, [isOpen]);

    const handleSubmit = evt => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: userAvatar.current.value
        });
    };

    return (
        <PopupWithForm name="update-form" title="Обновить аватар" buttonText="Сохранить" {...{ isOpen, onClose, isLoading }} onSubmit={handleSubmit} >
            <input
                className="popup__input popup__input_type_avatar-link"
                id="avatar-input"
                type="url"
                name="avatar"
                placeholder="Ссылка на новый аватар"
                ref={userAvatar}
                required
            />
            <span className="popup__error avatar-input-error"></span>
        </PopupWithForm>
    );
}