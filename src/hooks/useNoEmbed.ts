import * as React from "react";

import {
  NoEmbedService,
  UrlNoEmbedFlickr,
  UrlNoEmbedVimeo,
} from "../services/NoEmbedService";

export function useNoEmbed(url: string): {
  data: UrlNoEmbedFlickr | UrlNoEmbedVimeo;
  loading: boolean;
  error: Error;
} {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    const fetchUrlData = async () => {
      try {
        setLoading(true);

        const data = await NoEmbedService.getURLData(url);

        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (url) void fetchUrlData();
  }, [url]);

  return { loading, error, data };
}
