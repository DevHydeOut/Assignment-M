"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";

const StatCounter = ({
  target,
  duration = 1500,
  start,
}: {
  target: number;
  duration?: number;
  start: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const stepTime = 20;
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, stepTime);

    return () => clearInterval(timer);
  }, [start, target, duration]);

  return <>{count.toLocaleString()}</>;
};

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "1:1 Access", text: "no middle\nlayers", isNumeric: false },
    { value: 94, text: "mentees found\nunmatched clarity", suffix: "%" },
    { value: 650, text: "mentors, one\nplatform", suffix: "+" },
    { value: 3, text: "result in one\nbreakthrough", suffix: " Calls" },
    { value: 14000, text: "completed\ncalls", suffix: "+" },
  ];

  return (
    <section ref={sectionRef} className={styles.statOuter}>
      <div className={`${styles.statInner} ${styles.inner}`}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItems}>
            <h4 className={styles.statH4}>
              {stat.isNumeric === false ? (
                stat.value
              ) : (
                <>
                  <StatCounter target={stat.value as number} start={startCount} />
                  {stat.suffix}
                </>
              )}
            </h4>
            <p className={styles.statPara}>
              {stat.text.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < stat.text.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}