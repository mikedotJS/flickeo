import * as React from "react";

import { getHMSFromMS } from "./helpers/get-hms-from-ms";
import { getTimeIntervalInMillisecond } from "./helpers/get-time-interval-in-ms";
import { UrlNoEmbedFlickr } from "./services/NoEmbedService";

interface Props {
  data: UrlNoEmbedFlickr & { bookmarked_at: Date };
  deleteBookmark: (url: string) => void;
}

export function BookmarkFlickr({ data, deleteBookmark }: Props): JSX.Element {
  const uploadTimeIntervalInMS = getTimeIntervalInMillisecond(
    data.bookmarked_at
  );

  const uploadTimeIntervalLabel = getHMSFromMS(uploadTimeIntervalInMS);

  return (
    <div className="bookmark">
      <img className="bookmark-image" src={data.thumbnail_url} />

      <div className="bookmark-content">
        <a href={data.url}>{data.url}</a>
        <h2>{data.title}</h2>
        <div>
          Ajoutée par <a href={data.author_url}>{data.author_name}</a>
        </div>
        <div>Bookmarkée il y a {uploadTimeIntervalLabel}</div>
        <div>Publiée sur {data.provider_name}</div>
        <div>
          {data.width} x {data.height}
        </div>
      </div>

      <button
        className="bookmark-delete-button"
        onClick={() => deleteBookmark(data.url)}
      >
        Supprimer
      </button>
    </div>
  );
}
