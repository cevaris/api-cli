import { readFileSync } from 'fs';
import { homedir } from 'os';
import { sep } from 'path';

class ApiKeysStore {
    private keys: Map<string, string>;
    private apiKeysPath = `${homedir()}${sep}.api-keys.json`;

    constructor() {
        const apiKeysString = readFileSync(this.apiKeysPath, 'utf8');
        this.keys = new Map(Object.entries(JSON.parse(apiKeysString)));
    }

    get(name: string): string {
        const key = this.keys.get(name);
        if (key) {
            return key.toString();
        } else {
            throw Error(`key ${name} not found in ${this.apiKeysPath}`);
        }
    }
}

export const ApiKeys = new ApiKeysStore();