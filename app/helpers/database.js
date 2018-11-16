const DABASE_NAME = 'conduiteprojet2018';
const usersCol  = 'users';
const projectsCol = 'projets';
const IDsCol = 'IDs';
const MONGO_URL = 'mongodb://user:sampleuser1@ds261253.mlab.com:61253/conduiteprojet2018';
const MongoClient = require('mongodb').MongoClient;

let utils = {
  DBname: DABASE_NAME,
  usersCol: usersCol,
  projectsCol: projectsCol,
  IDsCol: IDsCol,
  DBurl: MONGO_URL,
  MongoClient: MongoClient
};

module.exports = utils;
