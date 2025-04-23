import React from "react";
import { render, screen } from "@testing-library/react";
import CoinCard from "../CoinCard";

//minichart mock
jest.mock("../MiniChart", () => () => <div data-testid="mock-chart" />);
