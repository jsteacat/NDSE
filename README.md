# Домашнее задание к занятию «2.6 База данных и хранение данных»

**Правила выполнения домашней работы:**

- Выполняйте домашнее задание в отдельной ветке проекта на гитхабе.
- В поле для сдачи работы прикрепите ссылку на ваш проект в Git.
- Присылать на проверку можно каждую задачу по отдельности или все задачи вместе.
- Во время проверки по частям ваша домашняя работа будет со статусом «На доработке».
- Любые вопросы по решению задач задавайте в Slack.

#### Задание 1

Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел
документации про использование [**CRUD Operations**](https://docs.mongodb.com/manual/crud/)

#### Задание 2

В файле **README.md** написать следующие запросы для **MongoDB**:

- запрос(ы) для _вставки_ данных минимум о двух книгах в коллекцию **books**

```javascript
db.books.insertMany([
  { title: 'title1', description: 'description1', authors: 'author1' },
  { title: 'title2', description: 'description2', authors: 'author2' }
]);
```

- запрос для _поиска_ полей документов коллекции **books** по полю _title_

```javascript
db.books.find({
  title: 'title1'
});
db.books.find({
  title: {
    $in: ['title1', 'title2']
  }
});
```

- запрос для _редактирования_ полей: _description_ и _authors_ коллекции **books** по _\_id_ записи

```javascript
db.books.updateOne(
  { _id: ObjectId('98750432y340f0uihihipv') },
  { $set: { description: 'description', authors: 'authors' } }
);
```

\*Каждый документ коллекции **books** должен содержать следующую структуру данных:

```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
```
