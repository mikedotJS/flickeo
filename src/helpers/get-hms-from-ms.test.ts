import { ONE_HOUR, ONE_MINUTE, ONE_SECOND } from "../constants";
import { getHMSFromMS } from "./get-hms-from-ms";

describe("get-hms-from-ms", () => {
  it("should return hours minutes and second from millisecond corretcly", () => {
    const TWO_HOURS = ONE_HOUR * 2;

    expect(getHMSFromMS(TWO_HOURS)).toBe("2 heures, 0 minute et 0 seconde");
    expect(getHMSFromMS(ONE_HOUR + ONE_MINUTE * 2)).toBe(
      "1 heure, 2 minutes et 0 seconde"
    );
    expect(getHMSFromMS(TWO_HOURS + ONE_MINUTE * 48 + ONE_SECOND * 23)).toBe(
      "2 heures, 48 minutes et 23 secondes"
    );
    expect(getHMSFromMS(TWO_HOURS + ONE_MINUTE * 63 + ONE_SECOND * 62)).toBe(
      "3 heures, 4 minutes et 2 secondes"
    );
  });
});
