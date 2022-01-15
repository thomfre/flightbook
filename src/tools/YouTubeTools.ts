export const getYouTubeId = (url: string): string => {
    if (url.includes('=')) {
        return url.split('=').pop() ?? '';
    }

    return url.split('/').pop() ?? '';
};
