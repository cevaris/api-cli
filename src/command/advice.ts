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

function advice(ids: string[], query: string): void {
    const validIds = validateIds(ids);
    console.log(`command advice: ids=${validIds} query=${query}`);
}

export { advice, validateIds };