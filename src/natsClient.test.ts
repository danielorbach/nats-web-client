import natsClient from './natsClient';

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