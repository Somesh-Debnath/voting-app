import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

const Countdown = ({targetDate}) => {

  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetDatetime = dayjs(targetDate); // Set your target datetime here
    // console.log(targetDatetime, "here")
    console.log(dayjs().diff(targetDatetime), "here1")

    const interval = setInterval(() => {
      const currentDatetime = dayjs(); // Get the current datetime
      const remainingTime = targetDatetime.diff(currentDatetime); // Calculate the difference in milliseconds

      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown('Election Ended');
      } else {
        const duration = dayjs.duration(remainingTime, 'milliseconds'); // Convert the remaining time to a duration object

        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        const countdownString = `Election ends in ${days ? `${days} day ` : ''}${hours ? `${hours} hours ` : ''}${minutes ? `${minutes} minutes ` : ''}${seconds} seconds`;
        setCountdown(countdownString);
      }
    }, 1000); // Update the countdown every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, []);

  return (
    <div>{countdown}</div>
  )
}

export default Countdown