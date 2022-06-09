import * as React from "react";

import { BookmarkFlickr } from "./BookmarkFlickr";
import { BookmarkVimeo } from "./BookmarkVimeo";
import { useNoEmbed } from "./hooks/useNoEmbed";
import { UrlNoEmbedFlickr, UrlNoEmbedVimeo } from "./services/NoEmbedService";

export function App() {
  const [url, setUrl] = React.useState("");
  const [bookmarks, setBookmarks] = React.useState<
    ((UrlNoEmbedFlickr | UrlNoEmbedVimeo) & { bookmarked_at: Date })[]
  >([]);

  const { data, loading, error } = useNoEmbed(url);

  function handleURLChange(event): void {
    setUrl(event.target.value);
  }

  function addBookmark() {
    if (url && data && !loading && !error)
      setBookmarks((oldBookmarks) => [
        ...oldBookmarks,
        { ...data, bookmarked_at: new Date() },
      ]);
  }

  function deleteBookmark(url: string): void {
    setBookmarks((oldBookmarks) =>
      oldBookmarks.filter((oldBookmark) => oldBookmark.url !== url)
    );
  }

  return (
    <>
      <header>Flickeo</header>

      <main>
        <input
          type="text"
          placeholder="Type URL here"
          onChange={handleURLChange}
          value={url}
          style={{ margin: "0 4px 8px 0" }}
        />

        <button onClick={addBookmark}>Submit</button>

        <div>
          <span>{loading ?? "Loading..."}</span>
          <span>{error?.message}</span>

          <div className="bookmark-list">
            {bookmarks.map((bookmark) => {
              return bookmark.provider_name === "Vimeo" ? (
                <BookmarkVimeo
                  key={bookmark.url}
                  data={bookmark}
                  deleteBookmark={deleteBookmark}
                />
              ) : (
                <BookmarkFlickr
                  key={bookmark.url}
                  data={bookmark}
                  deleteBookmark={deleteBookmark}
                />
              );
            })}
          </div>

          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </main>
    </>
  );
}
