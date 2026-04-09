import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PortfolioApp from "../src/app/PortfolioApp";

describe("PortfolioApp", () => {
  it("renders the main sections", () => {
    render(<PortfolioApp />);

    expect(screen.getByRole("heading", { name: "MARKUS" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sobre mí" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Experiencia" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Proyectos" }),
    ).toBeInTheDocument();
  });
});
