import React from "react";
import { render, screen } from "@testing-library/react";
import CoinCard from "../CoinCard";

//minichart mock
jest.mock("../MiniChart", () => () => <div data-testid="mock-chart" />);
//coin fake + render
describe("CoinCard component", () => {
    test("renders coin data correctly", () => {
      const fakeCoin = {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "https://example.com/bitcoin.png",
        current_price: 50000,
        price_change_percentage_24h: 2.3456,
        market_cap: 1000000000,
        total_volume: 300000000,
        market_cap_rank: 1,
        circulating_supply: 19000000,
        sparkline_in_7d: {
          price: [100, 200, 300, 400, 500]
        },
      };
  
      render(<CoinCard coin={fakeCoin} />);
  