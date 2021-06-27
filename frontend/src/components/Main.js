import { useContext } from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {  
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-icon">
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар пользователя"
                        onClick={onEditAvatar}
                    />
                    <button
                        className="profile__avatar-update"
                        type="button"
                        aria-label="Изменить аватар"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать"
                        onClick={onEditProfile}
                    />
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}
                />
            </section>

            <section className="cards">
                <ul className="cards__list">
                    {cards.map(card => (<Card key={card._id} {...{card, onCardClick, onCardLike, onCardDelete}} />))}
                </ul>
            </section>
        </main>
    );
}