import { useTimer } from "react-timer-hook";

export const Timer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "20px" }}>
        <span>{seconds}</span>
      </div>
    </div>
  );
};
