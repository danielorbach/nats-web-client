import {describe, it, expect} from 'vitest';
import natsClient from './natsClient';
import {connect} from "nats.ws";

describe('NatsClient', () => {
    it('should connect to the NATS server', async () => {
        await expect(natsClient.connect()).resolves.not.toThrow();
        expect(natsClient.isConnected()).toBe(true);
    });

    it('should publish and receive a message', async () => {
        const testTopic = 'test-topic';
        const testMessage = 'Hello, NATS!';

        await natsClient.connect();

        const messagePromise = new Promise<string>((resolve) => {
            natsClient.subscribe(testTopic, (message) => {
                resolve(message);
            });
        });

        await natsClient.publish(testTopic, testMessage);

        const receivedMessage = await messagePromise;
        expect(receivedMessage).toBe(testMessage);
    });
});

// see <https://github.com/nats-io/nats.ws> for usage examples.
describe('DemoServer', async () => {
    const servers = [
        // BAD "demo.nats.io",
        "demo.nats.io:8443",
        // BAD "ws://demo.nats.io",
        // BAD "wss://demo.nats.io",
        // BAD "ws://demo.nats.io:8443",
        "wss://demo.nats.io:8443",
        // BAD "demo.nats.io:4222",
        // BAD "ws://demo.nats.io:4222",
        // BAD "wss://demo.nats.io:4222",
        // BAD "nats://demo.nats.io:4222",
    ];
    for (const v of servers) {
        it(`should connect to ${v}`, async () => {
            const opts = {servers: v}
            await expect(connect(opts)).resolves.not.toThrow();
        })
    }
})
