export const calcReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(words / wordsPerMinute);
    return readingTimeMinutes; // min
};