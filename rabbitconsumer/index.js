#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'added';
    var p = 'deleted';

    ch.assertQueue(q, {durable: false});
    ch.assertQueue(p, {durable: false});
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
    ch.consume(q, function(msg) {
      console.log(msg.content);
      console.log(" [x] Project %s has been added in our application.", msg.content.toString());
    }, {noAck: true});
    ch.consume(p, function(msg) {
      console.log(" [x] Project with the id %s has been deleted from our application.", msg.content.toString());
    }, {noAck: true});
  });
});
