import { connect, NatsConnection, StringCodec } from 'nats.ws';

class NatsClient {
    private static instance: NatsClient;
    private nc: NatsConnection | null = null;
    private sc = StringCodec();

    private constructor() {}

    public static getInstance(): NatsClient {
        if (!NatsClient.instance) {
            NatsClient.instance = new NatsClient();
        }
        return NatsClient.instance;
    }

    public async connect(servers: string[] = ['ws://demo.nats.io:8080']): Promise<void> {
        if (!this.nc) {
            try {
                this.nc = await connect({ servers });
                console.log('Connected to NATS');
            } catch (err) {
                console.error('Error connecting to NATS:', err);
                throw err;  // Re-throw the error for the caller to handle
            }
        }
    }

    public async publish(topic: string, message: string): Promise<void> {
        if (!this.nc) {
            throw new Error('Not connected to NATS');
        }
        this.nc.publish(topic, this.sc.encode(message));
    }

    public async subscribe(topic: string, callback: (message: string) => void): Promise<() => void> {
        if (!this.nc) {
            throw new Error('Not connected to NATS');
        }
        const sub = this.nc.subscribe(topic);
        (async () => {
            for await (const m of sub) {
                callback(this.sc.decode(m.data));
            }
        })();
        return () => {
            sub.unsubscribe();
        };
    }

    public isConnected(): boolean {
        return this.nc !== null;
    }
}

export default NatsClient.getInstance();