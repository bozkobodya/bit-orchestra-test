import {useCallback, useState} from "react";

const isDefaultIncludes = (localStorageKey: string, id: string) =>
    () => JSON
        .parse(localStorage.getItem(localStorageKey) ?? '[]')
        .includes(id);

export const useLocalStorageIncludesArray = (localStorageKey: string, id: string): [boolean, () => void] => {
    const [includes, setIncludes] = useState<boolean>(isDefaultIncludes(localStorageKey, id));

    const handleToggleIncludes = useCallback(
        () => {
            const compareItems = JSON.parse(localStorage.getItem(localStorageKey) ?? '[]');

            if (includes) {
                localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(
                        compareItems.filter(
                            (item: string) => item !== id)
                    )
                );
            } else {
                localStorage.setItem(
                    localStorageKey,
                    JSON.stringify([...compareItems, id])
                );
            }

            setIncludes(!includes);
        },
        [includes, id, localStorageKey]
    );

    return [includes, handleToggleIncludes];
}