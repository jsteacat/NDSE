const router = require('express').Router();

//авторизация пользователя
router.post('/login', (req, res) => {
  //метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
  return res
    .status(201)
    .json({ id: 1, mail: 'test@mail.ru' });
});

module.exports = router;