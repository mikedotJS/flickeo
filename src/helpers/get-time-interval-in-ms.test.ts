import { ONE_HOUR } from "../constants";
import { getTimeIntervalInMillisecond } from "./get-time-interval-in-ms";

describe("get-time-interval-in-ms", () => {
  it("should return the correct interval between now and a given time", () => {
    expect(getTimeIntervalInMillisecond(new Date(Date.now() - ONE_HOUR))).toBe(
      ONE_HOUR
    );

    expect(
      getTimeIntervalInMillisecond(new Date(Date.now() - ONE_HOUR * 25))
    ).toBe(ONE_HOUR * 25);
  });
});
