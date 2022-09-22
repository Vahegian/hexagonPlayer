import React from "react";
import { render } from "@testing-library/react";

import { Player } from "./Player";

describe("Player", () => {
  test("renders the Player component", () => {
    render(<Player src="https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4"/>);
  });
});