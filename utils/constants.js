const Status = {
  OK: 200,
  CREATED: 201,
  ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  CONFLICT: 409,
  INTERNALERROR: 500,
};

const Message = {
  AUTH_ERROR: 'Необходимо авторизоваться',
  BAD_EMAIL: 'Введен некорректный почтовый адрес',
  BAD_EMAIL_OR_PASSWORD: 'Неправильные почта или пароль',
  BAD_URL: 'Неверный формат ссылки',
  BAD_INPUT_DATA: 'Введены некорректные данные',
  BAD_EMAIL_USAGE: 'Данный email уже используется',
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  MOVIE_ACCESS_DENIED: 'Доступ к фильму запрещен',
  PAGE_NOT_FOUND: 'Страница не найдена',
  USER_NOT_FOUND: 'Пользователь не найден',
};

module.exports = {
  Status, Message,
};
