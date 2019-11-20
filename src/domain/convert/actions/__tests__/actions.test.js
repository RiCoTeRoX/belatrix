import { convertCurrency } from "..";

it("Should convert euros to dollars", () => {
  const dollars = "10.50";
  const euros = "1000";
  const currentTotal = "10500";
  expect(convertCurrency(euros, dollars).toString()).toEqual(currentTotal);
});
