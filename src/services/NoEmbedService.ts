enum Provider {
  FLICKR = "Flickr",
  VIMEO = "Vimeo",
}

export interface UrlNoEmbed {
  account_type: string;
  author_name: string;
  author_url: string;
  description: string;
  duration: number;
  height: number;
  html: string;
  is_plus: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url_with_play_button: string;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  upload_date: string;
  uri: string;
  url: string;
  version: string;
  video_id: number;
  width: number;
}

export interface UrlNoEmbedFlickr extends UrlNoEmbed {
  provider_name: Provider.FLICKR;
  cache_age: number;
  flickr_type: string;
  license_id: string;
  license_url: string;
  license: string;
  media_url: string;
  web_page_short_url: string;
  web_page: string;
}

export interface UrlNoEmbedVimeo extends UrlNoEmbed {
  provider_name: Provider.VIMEO;
  account_type: string;
  description: string;
  duration: number;
  is_plus: string;
  thumbnail_url_with_play_button: string;
  upload_date: string;
  uri: string;
  video_id: number;
}

export const NoEmbedService = {
  async getURLData(url: string): Promise<UrlNoEmbedFlickr | UrlNoEmbedVimeo> {
    try {
      const data = await fetch(
        `${process.env.NOEMBED_API_URL}/embed?url=${url}`
      );

      return await data.json();
    } catch (error) {
      console.error(error);
    }
  },
};
