import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `card__delete-button ${!isOwn && "card__delete-button_hidden"}`
    );

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked && "card__like-button_active"}`
    );

    const handleCardClick = card => {
        onCardClick(card);
    };

    const handleLikeClick = card => {
        onCardLike(card);
    };

    const handleDeleteClick = card => {
        onCardDelete(card);
    };

    return (
        <li className="card">
            <h2 className="card__title">{card.name}</h2>
            <img className="card__image" src={card.link} alt={card.name} onClick={() => handleCardClick(card)} />
            <div className="card__like">
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Like"
                    onClick={() => handleLikeClick(card)}
                />
                <p className="card__like-counter">{card.likes.length}</p>
            </div>
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Удалить карточку"
                onClick={() => handleDeleteClick(card)}
            />
        </li>
    );
}