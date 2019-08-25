import { getIds, getQuery, getRandom } from '../api/advice';

async function advice(ids: string[], query: string): void {
    if ((ids.length > 0) && query) {
        throw Error('invalid request, use either query or ids');
    }

    const validIds = _validateIds(ids);

    let promise;
    if (validIds.length > 0) {
        promise = getIds(validIds);
    } else if (query) {
        promise = getQuery(query);
    } else {
        promise = getRandom();
    }

    try {
        const response = await promise;
        console.log(`Response: ${response}`);
    } catch (err) {
        console.error(err);
    }
}

function _validateIds(rawIds: string[]): number[] {
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

export { advice, _validateIds as validateIds };