import Image from "next/image";
import styles from "@/app/page.module.css";

export default function OrbitAnimation() {
  return (
    <div className={styles.orbitContainer}>

      <div className={styles.outerOrbit}>
        <div className={styles.outerSpin}>
          <div className={styles.orbitLine}></div>

          {["1","2","3","4","5","6"].map((n, i) => (
            <div key={n} className={`${styles.avatarWrapper} ${styles[`avatar${i+1}Outer`]}`}>
              <div className={styles.spinFixOuter}>
                <Image src={`/hero/${n}.png`} width={80} height={80} alt="mentor image" className={styles.avatar} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.innerOrbit}>
        <div className={styles.innerSpin}>
          <div className={styles.orbitLineSmall}></div>

          {["7","8","9","10","11","12"].map((n, i) => (
            <div key={n} className={`${styles.avatarWrapper} ${styles[`avatar${i+1}Inner`]}`}>
              <div className={styles.spinFixInner}>
                <Image src={`/hero/${n}.png`} width={80} height={80} alt="mentor image" className={styles.avatar} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
