import React from "react";

export default function InfoTooltip({ isOpen, type, onClose }) {
    return (
        <div className={`popup popup_type_info-tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <div className={`popup__info-tooltip-icon popup__info-tooltip-icon_type_${type}`}></div>
                {
                    type === 'success'
                        ? <p className="popup__info-tooltip-text">
                            Вы успешно зарегистрировались!
                        </p>
                        : <p className="popup__info-tooltip-text">
                            Что-то пошло не так!
                            Попробуйте ещё раз.
                        </p>
                }
                <button
                    className="popup__close-button popup__close-button_type_info-tooltip"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}