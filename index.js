$(document).ready(function() {
    console.log("index.js");

    // var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
    // or
    var client = mqtt.connect('wss://mqtt.eclipseprojects.io:443/mqtt')

    // var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
    // or
    // var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

    var d = new Date()
    var pubTopic = document.getElementById('input-topic')
    var message = document.getElementById('input-payload')

    var subtopic = document.getElementById('input-subTopic')


    var Topic = $('input-topic').val()
    var PayLoad = $('input-payload').val()

    client.on('message', function(Topic, Payload) {
        $(".tableMsg tbody").prepend("<tr><td>" + Topic + "</td><td>" + Payload + "</td><td>" + d.toUTCString() + "</td></tr>")
    })

    $('#connect').click(function() {
        $('#status').val("Connecting...").css("color", "green")
        client.on('connect', function() {
            $('#status').val("Connected to wss://mqtt.eclipseprojects.io:443/mqtt")

        })


    })
    $('.pubs').click(function() {
        client.publish(pubTopic.value, message.value)
        $(".tablePub tbody").prepend("<tr><td>" + pubTopic.value + "</td><td>" + message.value + "</td><td>" + d.toUTCString() + "</td></tr>")
    })
    $('.subs').click(function() {
        console.log('fa')
        $yes = client.subscribe($('.sub-in').val())
        if ($yes) {
            console.log('migana')
        }
        $(".subT tbody").append("<tr><td>" + $('.sub-in').val() + "</td><td>" + d.toUTCString() + "</td></tr>")
    })

})