import shortid from 'shortid';
import moment from 'moment';

const CALENDAR_FORMAT = {
  sameDay: '[Today,] MMM DD/YYYY',
  nextDay: '[Tomorrow,] MMM DD/YYYY',
  nextWeek: 'dddd, MMM DD/YYYY',
  lastDay: '[Yesterday,] MMM DD/YYYY',
  lastWeek: '[Last] dddd MMM DD/YYYY',
  sameElse: 'MMM DD/YYYY',
};

function getTitle(date = moment()) {
  return moment(date).calendar(null, CALENDAR_FORMAT).toUpperCase();
}

export const singleDay = {
  title: getTitle(),
  data: [
    {
      id: shortid.generate(),
      title: 'Test ngi gps',
      time: moment().toISOString(),
      completed: false,
    },
    {
      id: shortid.generate(),
      title: 'test application coté client',
      time: moment().add(1, 'hour').toISOString(),
      completed: true,
    },
    {
      id: shortid.generate(),
      title: 'test 1 2 ',
      time: moment().add(3, 'hours').toISOString(),
      completed: false,
    },
  ],
};
export default [
  {
    title: getTitle(),
    data: [
      {
        id: shortid.generate(),
        title: 'test calendrier ',
        time: moment().toISOString(),
        completed: false,
      },
      {
        id: shortid.generate(),
        title: 'mission terminer avec succés',
        time: moment().add(1, 'hour').toISOString(),
        completed: true,
      },
      {
        id: shortid.generate(),
        title: 'app ngi gps :)',
        time: moment().add(3, 'hours').toISOString(),
        completed: false,
      },
    ],
  },
  {
    title: getTitle(moment().add(1, 'day')),
    data: [
      {
        id: shortid.generate(),
        title: 'test calendrier',
        time: moment().add(5, 'hour').toISOString(),
        completed: false,
      },
      {
        id: shortid.generate(),
        title: 'test test ',
        time: moment().toISOString(),
        completed: true,
      },
      {
        id: shortid.generate(),
        title: 'ngi ngi ',
        time: moment().toISOString(),
        completed: false,
      },
    ],
  },
];
