import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
//import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ViewSet.module.css';
import Button from '@mui/material/Button';
import EditCard from '../CreateSet/EditCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function FullScreenFlashcardSet() {
  //this one needs to pull flashcard data
  const navigate = useNavigate();
  const theme = createTheme();
  const location = useLocation();
  const [id, setId] = useState(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([
    {
      term: '',
      definiion: ''
    }
  ]);

  useEffect(() => {
    axios.get(`http://localhost:3001/edit-set?id=${id}`).then((response) => {
      const data = response.data;
      setTitle(data.title);
      setDescription(data.description);
      setCards(data.cards);
    });
    console.log(id);
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    const id = evt.target.name;
    const field = id.slice(0, -1);
    const index = id.slice(id.length - 1);
    const newCard = cards[index];
    newCard[field] = value;
    setCards(
      cards
        .slice(0, index)
        .concat(newCard)
        .concat(cards.slice(index + 1))
    );
    console.log(cards);
  }

  function handleDelete(index) {
    setCards(cards.slice(0, index).concat(cards.slice(index + 1)));
  }

  function addNew() {
    setCards(cards.concat({ term: '', definition: '' }));
  }

  function handleSubmit(evt) {
    const info = {
      title: { title },
      description: { description },
      cards: { cards }
    };
    axios
      .post(`http://localhost:3001/edit-set?id=${id}`)
      .then((response) => alert(`Saved changes to set ${title}`));
  }

  const cardElements = cards.map((info, i) => {
    return (
      <>
        <EditCard
          handleChange={handleChange}
          handleDelete={handleDelete}
          index={i}
          term={info.term}
          def={info.definition}></EditCard>
      </>
    );
  });

  const shareSet = () => {
    const setURL = window.location.href;
    navigator.clipboard.writeText(setURL).then(() => {
      alert(`Link to flashcard set "${title}" has copied to clipboard!`);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        className=""
        startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        onClick={() => navigate('/flashcards')}></Button>
      <h1 className={styles.setTitle}>{title}</h1>
      <p className={styles.setDescription}>{description}</p>
      <Button className={styles.shareSetButton} onClick={shareSet}>
        Share
      </Button>
      <div className={styles.cardsContainer}>{cardElements}</div>
      <div className={styles['form-actions']}>
        <Button
          variant="outlined"
          onClick={addNew}
          startIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
          Add Card
        </Button>
        <Button onClick={handleSubmit} variant="outlined">
          Save
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default FullScreenFlashcardSet;
