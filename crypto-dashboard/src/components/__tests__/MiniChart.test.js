import React from "react";
import { render } from "@testing-library/react";
import MiniChart from "../MiniChart";
import '@testing-library/jest-dom';


//mock of line component 
jest.mock("react-chartjs-2", () => ({
  Line: () => <div>Mocked Line Chart</div>,
}));
//render test
test("renders MiniChart with sparkline data", () => {
    const fakeSparkline = [1, 2, 3, 4, 5];
  
    const { getByText } = render(<MiniChart sparkline={fakeSparkline} />);
  
    expect(getByText("Mocked Line Chart")).toBeInTheDocument();
  });
  