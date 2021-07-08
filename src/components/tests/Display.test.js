import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display.js";

const testShow = {
  name: "Breaking Bad",
  image: null,
  summary: "I the one who knocks.",
  seasons: [
    { episodes: [], id: 0, name: "Season 0" },
    { episodes: [], id: 1, name: "Season 1" },
  ],
};
const displayFun = (data) => {
  console.log(data);
};
test("Test if it can render display component", () => {
  render(<Display />);
});

test("Test that the component will display", async () => {
  render(<Display displayFun={displayFun} />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("Test options rendered equals the amount of seasons in your test data.", async () => {
  render(<Display show={testShow} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  waitFor(() =>
    expect(screen.getAllByTestId("season-option")).toHaveLength(
      testShow.seasons.length
    )
  );
});
test("Test that the optional functional", async () => {
  const mockDisplay = jest.fn();
  render(<Display handleClick={mockDisplay} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  waitFor(() => {
    expect(mockDisplay).toHaveBeenCalled();
  });
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
