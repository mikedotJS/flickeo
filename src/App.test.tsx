import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import * as React from "react";

import { App } from "./App";

describe("App", () => {
  process.env.NOEMBED_API_URL = "https://noembed.com";

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render correctly", () => {
    const { getByText } = render(<App />);

    expect(getByText(/Flickeo/i)).toBeTruthy();
  });

  it("should show an error if an unauthorized provider is called", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        thumbnail_width: 480,
        width: 200,
        provider_name: "YouTube",
        provider_url: "https://www.youtube.com/",
        height: 113,
        type: "video",
        html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/VqhRpF_vTBM?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        author_url: "https://www.youtube.com/c/TPGCShorts",
        author_name: "TPGC Highlights",
        thumbnail_url: "https://i.ytimg.com/vi/VqhRpF_vTBM/hqdefault.jpg",
        title: "Jimmy Butler’s Insane Dribbling Drill! 😳",
        thumbnail_height: 360,
        version: "1.0",
        url: "https://www.youtube.com/watch?v=VqhRpF_vTBM",
      })
    );

    const { getByPlaceholderText, getByText } = render(<App />);

    const urlInput = getByPlaceholderText("Type URL here");

    expect(urlInput).toBeDefined();

    await userEvent.click(urlInput);

    await userEvent.paste("https://www.youtube.com/watch?v=VqhRpF_vTBM");

    await waitForElementToBeRemoved(getByText("Loading..."));

    const submitButton = getByText("Submit");
    expect(submitButton).toBeDefined();

    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText(
        "Error: Flickr and Vimeo are the only authorized providers"
      );

      expect(errorMessage).toBeDefined();
    });
  });

  it("should have a bookmark with a the correct text according to a certain url", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          video_id: 155572038,
          version: "1.0",
          duration: 233,
          width: 426,
          provider_name: "Vimeo",
          thumbnail_url:
            "https://i.vimeocdn.com/video/556410132-08a97d38dbd08e5dfbf2aeb00deadb6ec91a3a8a19a69c48f4bec8df09d9717c-d_295x166",
          author_url: "https://vimeo.com/user1103116",
          title: "Shiny",
          is_plus: "0",
          description:
            'A damsel in distress gets undressed when a man from the mid west puts to rest a world that\'s obsessed with the priceless, also know as, "The Shiny." \n\nWritten & Directed by - Daniel Cloud Campos & Spencer Susser\nEdited by - Daniel Cloud Campos & Spencer Susser\nProduced by - Daniel Cloud Campos & Spencer Susser\nProduction Company - Blue Tongue Films\nDirector of Photography - Spencer Susser\nLead Animation by - Daniel Cloud Campos\nAdditional Animation by - Spencer Susser\nComposer - Michael Yezerski\nSound Design/Re-recording Mix by - Derek Vanderhorst\nSound Effects Editor - Marc Glassman\nSound Editor - Jacob Houchen\nColor by - Trevor Durstchi \nOriginal song "It\'s So Shiny" Written & Performed by - Paul Musso\nVisual Effects by - Spencer Susser & Daniel Cloud Campos\nVoices by - Daniel Cloud Campos, Spencer Susser, Tamara Levinson-Campos & Stormi Henley\nSpecial Thanks - Michael Gracey, Gavin Millette, Dineh Mohajer, Liinda Garisto, Aaron Downing',
          html: '<iframe src="https://player.vimeo.com/video/155572038?h=67dcd95ed6&amp;app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Shiny"></iframe>',
          url: "https://vimeo.com/155572038",
          account_type: "basic",
          thumbnail_height: 166,
          uri: "/videos/155572038",
          thumbnail_width: 295,
          upload_date: "2016-02-16 14:35:32",
          author_name: "Daniel Cloud Campos",
          thumbnail_url_with_play_button:
            "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F556410132-08a97d38dbd08e5dfbf2aeb00deadb6ec91a3a8a19a69c48f4bec8df09d9717c-d_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png",
          height: 240,
          provider_url: "https://vimeo.com/",
          type: "video",
        },
      })
    );

    const { getByPlaceholderText, getByText, findByText } = render(<App />);

    const urlInput = getByPlaceholderText("Type URL here");

    expect(urlInput).toBeDefined();

    await userEvent.click(urlInput);

    await userEvent.paste("https://vimeo.com/155572038");

    await waitForElementToBeRemoved(getByText("Loading..."));

    const submitButton = getByText("Submit");
    expect(submitButton).toBeDefined();

    await userEvent.click(submitButton);

    const bookmark = await findByText("Shiny");

    expect(bookmark).toBeDefined();
  });

  it("bookmarks should be unique", async () => {
    const { getByPlaceholderText, getByText, findAllByText } = render(<App />);

    const urlInput = getByPlaceholderText("Type URL here");
    expect(urlInput).toBeDefined();

    await userEvent.click(urlInput);

    await userEvent.paste("https://vimeo.com/155572038");

    await waitForElementToBeRemoved(getByText("Loading..."));

    const submitButton = getByText("Submit");
    expect(submitButton).toBeDefined();

    await userEvent.click(submitButton);
    await userEvent.click(submitButton);

    const bookmarks = await findAllByText("Shiny");

    expect(bookmarks).toHaveLength(1);
  });
});
