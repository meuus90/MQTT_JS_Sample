const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://test.mosquitto.org')
const client = mqtt.connect('tcp://test.mosquitto.org:1883')
const TOPIC_NAME = "DH_MQTT_Test"
const OPTION_INTERVAL_START = "INTERVAL_START"
const OPTION_INTERVAL_END = "INTERVAL_END"

client.subscribe(TOPIC_NAME);
client.on('message', function (topic, message) {
    console.log("topic : " + topic.toString() + "\nmessage : " + message.toString())
    if (message.toString().match(OPTION_INTERVAL_START))
        startInterval()
    else if (message.toString().match(OPTION_INTERVAL_END))
        endInterval()
})

var timerId = null;
function startInterval() {
    if (timerId == null)
        timerId = setInterval(
            () => {
                let rndStr = Math.random().toString(36).substr(2, 11);
                client.publish(TOPIC_NAME, "server : " + rndStr);
            },
            2000
        );
}

function endInterval() {
    if (timerId != null) {
        clearInterval(timerId)
        timerId = null
    }
}
