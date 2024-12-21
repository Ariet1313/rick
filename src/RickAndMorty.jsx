import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RickAndMorty = () => {
  const [characters, setCharacters] = useState([]); // Состояние для хранения персонажей

  useEffect(() => {
    // Функция для получения данных
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character'); // Запрос к API
        setCharacters(response.data.results); // Сохраняем массив персонажей
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error.message);
      }
    };

    fetchData(); // Вызываем функцию
  }, []); // Выполняем запрос один раз при загрузке компонента

  return (
    <div>
      <h1>Персонажи из Rick and Morty</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} width="50" /> {/* Изображение */}
            {character.name} {/* Имя персонажа */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMorty;
