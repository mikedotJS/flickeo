import * as React from "react";

import {
  NoEmbedService,
  UrlNoEmbedFlickr,
  UrlNoEmbedVimeo,
} from "../services/NoEmbedService";

export function useNoEmbed(url: string): {
  data: UrlNoEmbedFlickr | UrlNoEmbedVimeo;
  loading: boolean;
  error: string;
} {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    setError("");

    const fetchUrlData = async () => {
      try {
        setLoading(true);

        const data = await NoEmbedService.getURLData(url);

        if (data?.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (url) void fetchUrlData();
  }, [url]);

  return { loading, error, data };
}
