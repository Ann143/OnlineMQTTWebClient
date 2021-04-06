
console.log("index.js");

// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

var d = new Date()
var pubTopic = document.getElementById('input-topic')
var message = document.getElementById('input-payload')

var subtopic = document.getElementById('input-subTopic')


var Topic = $('input-topic').val()
var Topic = $('input-topic').val()

client.on('message', function (Topic, Payload) {
  $(".tableMsg tbody").prepend("<tr><td>" + Topic + "</td><td>" + Payload + "</td><td>" + d.toUTCString() + "</td></tr>")
})
$(document).ready(function () {
  $('#connect').click(function () {
    $('#status').val("Connecting...").css("color", "green")
    client.on('connect', function () {
      $('#status').val("Connected Successfully!")

      $('#published').click(function () {
        client.publish(pubTopic.value, message.value)
        $(".tablePub tbody").prepend("<tr><td>" + pubTopic.value + "</td><td>" + message.value + "</td><td>" + d.toUTCString() + "</td></tr>")
      })
      $('#subscribe').click(function() {
        client.subscribe(subtopic.value)
        $(".tableSub tbody").prepend("<tr><td>" + subtopic.value + "</td><td>" + d.toUTCString() + "</td></tr>")
    })
    })
  })
  $('#disconnect').click(function() {
    $('#status').val("Disconnected!").css("color", "red")
    client = "";
})
})
