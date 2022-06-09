const ONE_SECOND = 1_000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

export function getHMSFromMS(ms: number) {
  const hours = Math.trunc((ms / ONE_HOUR) % 24);
  const minutes = Math.trunc((ms / ONE_MINUTE) % 60);
  const seconds = Math.trunc((ms / ONE_SECOND) % 60);

  return `${hours} heure${hours > 1 ? "s" : ""}, ${minutes} minute${
    minutes > 1 ? "s" : ""
  } et ${seconds} seconde${seconds > 1 ? "s" : ""}`;
}
