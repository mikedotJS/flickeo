import * as React from "react";

import { getHMSFromMS } from "./helpers/get-hms-from-ms";
import { getTimeIntervalInMillisecond } from "./helpers/get-time-interval-in-ms";
import { UrlNoEmbedVimeo } from "./services/NoEmbedService";

interface Props {
  data: UrlNoEmbedVimeo & { bookmarked_at: Date };
  deleteBookmark: (url: string) => void;
}

export function BookmarkVimeo({ data, deleteBookmark }: Props): JSX.Element {
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
          Ajoutée par <a href={data.author_url}>{data.author_name}</a>, il y a{" "}
          {uploadTimeIntervalLabel}
        </div>
        <div>
          Publiée sur {data.provider_name} le{" "}
          {new Date(data.upload_date).toLocaleDateString()}
        </div>
        <div>Dure {getHMSFromMS(data.duration * 1_000)}</div>
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
