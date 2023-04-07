const express = require('express');
const axios = require('axios');

const router = express.Router();

// Migrated to flashcard-set route!!

// router.get('/edit-set', (req, res) => {

//   const id = req.query.id;
//   console.log('Id received is: ', id);
//   if (!id) {
//     res.status(400).send({ message: 'missing set id' });
//   }
//   const mockSetObj = {
//     id,
//     title: 'Agile Quiz',
//     description:
//       'This set is a mock quiz set that will be used to test dynamic study set editting. The id of the set will be the id passed in via the query params',
//     cards: [
//       { term: 'card1', definition: 'card1 def' },
//       { term: 'card2', definition: 'card2 def' },
//       { term: 'card3', definition: 'card3 def' }
//     ]
//   };
//   res.send(mockSetObj);
// });

/* istanbul ignore next */
router.post('/edit-set/:id', (req, res) => {
  const id = req.params.id;
  // a mongoDB update takes place here
  res.status(200).send({ message: 'success' });
});

module.exports = router;
