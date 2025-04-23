import axios from "axios";
import { getTopCoins } from "../api";

jest.mock("axios");
//correct case
test("getTopCoins returns coin data", async () => {
    const fakeCoins = [{ id: "bitcoin", name: "Bitcoin" }];
    axios.get.mockResolvedValue({ data: fakeCoins });
  
    const data = await getTopCoins();
  
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "eur",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: true,
        },
      }
    );
  
    expect(data).toEqual(fakeCoins);
  });
  //error case (api fail)
  test("getTopCoins throws an error if request fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));
  
    await expect(getTopCoins()).rejects.toThrow("API Error");
  });
  
  
