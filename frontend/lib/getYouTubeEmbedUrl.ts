const getYouTubeEmbedUrl = (url: string) => {
  try {
    const youtubeRegex = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^?]+)/,
      /(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([^&]+)/,
    ];

    for (const regex of youtubeRegex) {
      const match = url.match(regex);
      if (match && match[1]) {
        const videoId = match[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return url;
  } catch (error) {
    console.error('Error processing YouTube URL:', error);
    return url;
  }
};

export { getYouTubeEmbedUrl };
