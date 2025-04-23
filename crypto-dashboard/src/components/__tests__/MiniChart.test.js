import React from "react";
import { render } from "@testing-library/react";
import MiniChart from "../MiniChart";

//mock of line component 
jest.mock("react-chartjs-2", () => ({
  Line: () => <div>Mocked Line Chart</div>,
}));
