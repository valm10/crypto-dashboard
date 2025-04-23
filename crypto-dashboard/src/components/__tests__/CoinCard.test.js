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
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
      expect(screen.getByText(/\(BTC\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Price: €50000/)).toBeInTheDocument();
      expect(screen.getByText(/24h Change: 2.35%/)).toBeInTheDocument();
      expect(screen.getByText(/Market Cap: €1,000,000,000/)).toBeInTheDocument();
      expect(screen.getByText(/Volume: €300,000,000/)).toBeInTheDocument();
      expect(screen.getByText(/Rank: #1/)).toBeInTheDocument();
      expect(screen.getByText(/Supply: 19,000,000/)).toBeInTheDocument();
      expect(screen.getByTestId("mock-chart")).toBeInTheDocument();
    });
  });
  