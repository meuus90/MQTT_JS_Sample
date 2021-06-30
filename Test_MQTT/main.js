const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://test.mosquitto.org')
const client = mqtt.connect('tcp://test.mosquitto.org:1883')
const TOPIC_NAME = "DH_MQTT_Test"
const OPTION_INTERVAL_START = '[Op01]'
const OPTION_INTERVAL_END = '[Op02]'

client.subscribe(TOPIC_NAME)
client.on('message', function (topic, message) {
    console.log("[" + topic.toString() + "]message : " + message.toString())
    if (message.toString().startsWith(OPTION_INTERVAL_START)) {
        startInterval()
        return
    }

    if (message.toString().startsWith(OPTION_INTERVAL_END)) {
        endInterval()
        return
    }
})

let timerId = null
function startInterval() {
    if (timerId == null) {
        timerId = setInterval(
            () => {
                const rndStr = Math.random().toString(36).substr(2, 11)
                client.publish(TOPIC_NAME, "[Server] " + rndStr)
            },
            2000
        )
    }
}

function endInterval() {
    if (timerId != null) {
        clearInterval(timerId)
        timerId = null
    }
}