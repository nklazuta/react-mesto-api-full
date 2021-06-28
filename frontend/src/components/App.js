import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [typeInfoTooltip, setTypeInfoTooltip] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadUserInfo();
    loadCards();
  }, [isLoggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const loadUserInfo = () => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log("Ошибка: ", err));
  };

  const loadCards = () => {
    api
      .getInitialCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log("Ошибка: ", err));
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const onCardDelete = (card) => {
    setCardToDelete(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsInfoTooltipOpen(false);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка: ", err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка: ", err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .handleAddCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка: ", err))
      .finally(() => setIsLoading(false));
  };

  const tokenCheck = () => {
    auth
      .getContent()
      .then(res => {
        setUserEmail(res.email);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const onRegister = (data) => {
    return auth
      .register(data)
      .then(res => {
        setUserEmail(res.data.email);
        setIsInfoTooltipOpen(true);
        setTypeInfoTooltip('success');
        history.push("/signin");
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
        setIsInfoTooltipOpen(true);
        setTypeInfoTooltip('fail');
      });
  };

  const onLogin = (data) => {
    return auth
      .authorize(data)
      .then(res => {
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
        setIsInfoTooltipOpen(true);
        setTypeInfoTooltip('fail');
      });
  };

  const onLogout = () => {
    return auth
      .logout()
      .then (() => {
        setIsLoggedIn(false);
        history.push("/signin");
      })
      .catch((err) => console.log("Ошибка: ", err))
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={userEmail} {...{onLogout}} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            {...{ isLoggedIn, cards, onCardDelete }}
          />

          <Route path="/signup">
            <Register {...{ onRegister }} />
          </Route>

          <Route path="/signin">
            <Login {...{ onLogin }} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          {...{ isLoading }}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          {...{ isLoading }}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          {...{ isLoading }}
        />

        <DeleteCardPopup
          card={cardToDelete}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip isOpen={isInfoTooltipOpen} type={typeInfoTooltip} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
