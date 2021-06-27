import React from 'react';

export default function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card && "popup_opened"}`}>
            <div className="popup__picture-container">
                <img className="popup__picture" src={card ? card.link : ''} alt={card ? card.name : ''} />
                <p className="popup__picture-title">{card ? card.name : ''}</p>
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