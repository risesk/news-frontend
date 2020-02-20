import { DATE_BY_MONTHS, TIME_IN_MS } from '../constants/variables';

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month + 1}-${day}`;
};

const getWeekBeforeDate = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const weekBeforeTimestamp = timestamp - (TIME_IN_MS);
  const weekBeforeDate = new Date(weekBeforeTimestamp);
  const year = weekBeforeDate.getFullYear();
  const month = weekBeforeDate.getMonth();
  const day = weekBeforeDate.getDate();

  return `${year}-${month + 1}-${day}`;
};

const getNewsCardDate = (newsDate) => {
  const date = new Date(newsDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${DATE_BY_MONTHS[month]}, ${year}`;
};

export {
  getCurrentDate,
  getWeekBeforeDate,
  getNewsCardDate,
};
