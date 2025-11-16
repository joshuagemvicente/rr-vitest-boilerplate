import { render, screen } from "@testing-library/react";
import { Welcome } from "./welcome";

describe("Welcome", () => {
  it("renders the title?", () => {
    render(<Welcome />);

    expect(screen.getByText("What's next?")).toBeInTheDocument();
  });

  it("renders the React Router docs link", () => {
    render(<Welcome />);

    expect(screen.getByText("React Router Docs")).toBeInTheDocument();
  });

  it("renders the Discord link", () => {
    render(<Welcome />);

    expect(screen.getByText("Join Discord")).toBeInTheDocument();
  });
});
