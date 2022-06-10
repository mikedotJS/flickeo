import * as React from "react";

import { BookmarkFlickr } from "./BookmarkFlickr";
import { BookmarkVimeo } from "./BookmarkVimeo";
import { AUTHORIZED_DOMAIN } from "./constants";
import { useNoEmbed } from "./hooks/useNoEmbed";
import { UrlNoEmbedFlickr, UrlNoEmbedVimeo } from "./services/NoEmbedService";

export function App() {
  const [url, setUrl] = React.useState("");
  const [bookmarks, setBookmarks] = React.useState<
    ((UrlNoEmbedFlickr | UrlNoEmbedVimeo) & { bookmarked_at: Date })[]
  >([]);
  const [bookmarkError, setBookmarkError] = React.useState("");

  const { data, loading, error } = useNoEmbed(url);

  function handleURLChange(event): void {
    const value: string = event.target.value;

    setUrl(value);
  }

  function addBookmark() {
    if (
      url &&
      data &&
      !loading &&
      !error &&
      url.match(
        // Regex to validate URL
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm
      ) &&
      (url.includes(AUTHORIZED_DOMAIN.FLICKR) ||
        url.includes(AUTHORIZED_DOMAIN.VIMEO)) &&
      !bookmarks.some((bookmark) => bookmark.url === url)
    )
      setBookmarks((oldBookmarks) => [
        ...oldBookmarks,
        { ...data, bookmarked_at: new Date() },
      ]);
    setBookmarkError("");

    if (
      url.match(
        // Regex to validate URL
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm
      ) &&
      !url.includes(AUTHORIZED_DOMAIN.FLICKR) &&
      !url.includes(AUTHORIZED_DOMAIN.VIMEO)
    ) {
      // We should be using an error dictionary here of course
      setBookmarkError("Flickr and Vimeo are the only authorized providers");
    }
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
          {error && (
            <div className="error-message" style={{ marginBottom: "8px" }}>
              Error: {error}
            </div>
          )}
          {bookmarkError && (
            <div className="error-message" style={{ marginBottom: "8px" }}>
              Error: {bookmarkError}
            </div>
          )}

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
