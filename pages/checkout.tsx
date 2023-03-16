import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();
  const totalPrice = router.query.totalPrice;

  return (
    <div className={styles.success}>
      Your order has been successfully placed and the amount has been paid. You will receive your order shortly. Thank you.
    </div>
  );
}
