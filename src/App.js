import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]); // Состояние для списка персонажей
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Выбранный персонаж для модального окна
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибок

  useEffect(() => {
    // Получение данных с API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (err) {
        setError('Ошибка при загрузке данных.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character); // Устанавливаем выбранного персонажа
  };

  const closeModal = () => {
    setSelectedCharacter(null); // Закрываем модальное окно
  };

  if (loading) {
    return <div className="App">Загрузка...</div>;
  }

  if (error) {
    return <div className="App">{error}</div>;
  }

  return (
    <div className="App">
      <h1>Персонажи из Rick and Morty</h1>
      <div className="character-list">
        {characters.map((character) => (
          <div
            className="character-row"
            key={character.id}
            onClick={() => openModal(character)} // Открытие модального окна
          >
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p><strong>Статус:</strong> {character.status}</p>
              <p><strong>тип:</strong> {character.species}</p>
              <p><strong>последнее появление:</strong> {character.type || 'Неизвестно'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>Закрыть</button>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} className="modal-image" />
            <h2>{selectedCharacter.name}</h2>
            <p><strong>Статус:</strong> {selectedCharacter.status}</p>
            <p><strong>тип:</strong> {selectedCharacter.species}</p>
            <p><strong>первое появдение:</strong> {selectedCharacter.type || 'Неизвестно'}</p>
            <p><strong>Последний эпизод:</strong> {selectedCharacter.episode[selectedCharacter.episode.length - 1].split('/').pop()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
