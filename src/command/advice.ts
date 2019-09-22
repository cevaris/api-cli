import { getIds, getQuery, getRandom, Advice } from '../api/advice';


async function adviceAsync(ids: string[], query: string): Promise<string[]> {
    if (ids && query) {
        throw Error('invalid request, pass in either query or ids');
    }

    let promise: Promise<Advice[]>;
    if (ids) {
        const validIds = validateIds(ids);
        promise = getIds(validIds);
    } else if (query) {
        promise = getQuery(query);
    } else {
        promise = getRandom();
    }

    try {
        const advice: Advice[] = await promise;
        const sortedAdvice = advice.sort((l, r) => Number(l.slip_id) - Number(r.slip_id));
        return sortedAdvice.map(
            (a: Advice) => `Advice(${String(a.slip_id).padStart(3, '0')}): ${a.advice}`
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