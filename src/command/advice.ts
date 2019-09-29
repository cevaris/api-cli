import { Advice, getIds, getQuery, getRandom, SlipResponse } from '../api/advice';


async function adviceAsync(ids: string[], query: string): Promise<string[]> {
    if (ids && query) {
        throw Error('invalid request, pass in either query or ids');
    }

    let promise: Promise<SlipResponse[]>;
    if (ids) {
        const validIds = validateIds(ids);
        promise = getIds(validIds);
    } else if (query) {
        promise = getQuery(query);
    } else {
        promise = getRandom();
    }

    try {
        const responses: SlipResponse[] = await promise;
        const sortedResponses = responses.sort((l, r) => Number(l.id) - Number(r.id));
        return sortedResponses.map(
            (sr: SlipResponse) => {
                if (sr.success) {
                    return `Advice(${String(sr.id).padStart(3, '0')}): ${sr.advice.advice}`
                } else {
                    return `Advice(${String(sr.id).padStart(3, '0')}): ${sr.error}`
                }
            }
        );
    } catch (err) {
        return Promise.reject(err);
    }
}

function advice(ids: string[], query: string): void {
    adviceAsync(ids, query)
        .then(r => process.stdout.write(r.join("\n")))
        .catch((err: Error) => process.stderr.write(err.toString()));
}

function validateIds(rawIds: string[]): number[] {
    return rawIds
        .map((id) => {
            const parsedNumber = Number(id);
            if (isNaN(parsedNumber)) {
                throw Error(`${id} is not a number`);
            } else {
                return parsedNumber;
            }
        });
}

export { advice };
