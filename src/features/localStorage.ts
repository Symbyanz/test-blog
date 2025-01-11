export const loadFromLocalStorage = <T>(key: string): T | null => {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            try {
                return JSON.parse(storedData) as T;
            } catch (error) {
                console.error("Error parsing data from localStorage:", error);
                return null;
            }
        }
    }
    return null;
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving data to localStorage:", error);
        }
    }
};
