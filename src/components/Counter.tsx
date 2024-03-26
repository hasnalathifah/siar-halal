import { CountUp } from 'use-count-up';

type CounterProps = {
  range: [number, number];
  duration: number;
};

export default function Counter({ range, duration }: CounterProps) {
  return (
    <CountUp isCounting start={range[0]} end={range[1]} duration={duration} />
  );
}
