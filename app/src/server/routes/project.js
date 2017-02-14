const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const knex = require('../db/connection');
const amqp = require('amqplib/callback_api');


router.get('/', authHelpers.loginRequired, function(req, res) {
  knex('projects').select().orderBy('id').then(function(data){
    res.status(200).render('projects/index', {projects:data});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.get('/new', authHelpers.loginRequired, function(req, res) {
  res.render('projects/new');
});
router.get('/:id/show', authHelpers.loginRequired, function(req,res){
  res.render('projects/show');
});
router.get('/:id', authHelpers.loginRequired, function(req, res) {
  knex('projects').select().where({id: req.params.id}).then(function(data){
    res.status(200).json({status:"success", project:data[0]});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.get('/:id/edit', authHelpers.loginRequired, function(req, res) {
  knex('projects').select().where({id: req.params.id}).then(function(data){
    res.status(200).render('projects/edit', {project:data[0]});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});
router.post('/:id/update', authHelpers.loginRequired, function(req, res) {
  knex('projects').update({title: req.body.title, description: req.body.description}).where({id: req.params.id}).then(function(data){
    res.redirect('/projects');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.put('/:id', authHelpers.loginRequired, function(req, res) {
  knex('projects').update({title: req.body.title, description: req.body.description}).where({id: req.params.id}).then(function(data){
    res.redirect('/projects');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.post('/create', authHelpers.loginRequired, function(req, res) {
  //rabbitmq
  knex('projects').insert({title: req.body.title, description: req.body.description}).then(function(data){
      var msg = req.body.title;
      sendRabbit('added', msg);
      handleResponse(res, 200, 'success');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});
router.get('/:id/delete', authHelpers.loginRequired, function(req, res){
  knex('projects').delete().where({id: req.params.id}).then(function(data){
    res.redirect('/projects');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});
router.delete('/:id', authHelpers.loginRequired, function(req, res){
  knex('projects').delete().where({id: req.params.id}).then(function(data){
    var msg = req.params.id;
    sendRabbit('deleted', msg);
    handleResponse(res, 200, 'success');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});
function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}
function sendRabbit(q, msg){
  amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); }, 500);
});
}
module.exports = router;
