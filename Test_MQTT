const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://test.mosquitto.org')
const client = mqtt.connect('tcp://test.mosquitto.org:1883')
const TOPIC = "DH_Topic"

setInterval(
    () => {
        let rndStr = Math.random().toString(36).substr(2, 11);
        client.publish(TOPIC, "test msg " + rndStr);
    },
    2000
);

client.subscribe(TOPIC);
client.on('message', function (topic, message) {
    console.log("topic : " + topic.toString() + "\nmessage : " + message.toString())
})
