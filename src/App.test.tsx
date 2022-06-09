import { render } from "@testing-library/react";
import * as React from "react";

import { App } from "./App";

it("App should render correctly", () => {
  const { getByText } = render(<App />);

  expect(getByText(/Hello world/i)).toBeTruthy();
});
