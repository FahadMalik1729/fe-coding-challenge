import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import BurgerCard from "../components/burgerCard";
import {
  burgers,
  burgerSizes,
  customerCodeDiscountPercentage,
} from "../constants";
import { useEffect, useRef, useState, useReducer } from "react";
import { orderSummaryItemType, actionType } from "../types";
import CodeInput from "../components/codeInputs";
import OrderCard from "../components/orderCard";
import { twoDecimalPlace } from "../utils/functions";

//PROMO CODES ---> ['Promo12','Promo22']
//CUSTOMER CODES ---> ["Custo12", "Custo22"

const reducer = (
  state: orderSummaryItemType[],
  action: actionType
): orderSummaryItemType[] => {
  let burgerPrice = 0;
  switch (action.burger) {
    case "Hamburger":
      burgerPrice = burgers.hamburger;
      break;
    case "Cheese Burger":
      burgerPrice = burgers.cheeseBurger;
      break;
    case "Chilli Cheese Burger":
      burgerPrice = burgers.chilliCheeseBurger;
      break;
  }
  return state.map((order) => {
    if (order.name === action.burger && order.size === action.size) {
      if (action.type === "inc") {
        return {
          ...order,
          quantity: order.quantity + (action.promo && action.size === 'Large' ? 2 : 1),
          price: twoDecimalPlace(order.price + (burgerPrice * burgerSizes[action.size] * (action.promo && action.size === 'Large' ? 2 : 1)) ),
        };
      } else if (action.type === "dec" && order.quantity > 0) {
        return {
          ...order,
          quantity: order.quantity - 1,
          price: twoDecimalPlace(order.price - burgerPrice * burgerSizes[action.size]),
        };
      } else return order;
    }
    return order;
  });
};

const initialOrderSummary: orderSummaryItemType[] = [
  {
    name: "Hamburger",
    size: "Large",
    quantity: 0,
    price: 0,
  },
  {
    name: "Hamburger",
    size: "Medium",
    quantity: 0,
    price: 0,
  },
  {
    name: "Hamburger",
    size: "Small",
    quantity: 0,
    price: 0,
  },
  {
    name: "Cheese Burger",
    size: "Large",
    quantity: 0,
    price: 0,
  },
  {
    name: "Cheese Burger",
    size: "Medium",
    quantity: 0,
    price: 0,
  },
  {
    name: "Cheese Burger",
    size: "Small",
    quantity: 0,
    price: 0,
  },
  {
    name: "Chilli Cheese Burger",
    size: "Large",
    quantity: 0,
    price: 0,
  },
  {
    name: "Chilli Cheese Burger",
    size: "Medium",
    quantity: 0,
    price: 0,
  },
  {
    name: "Chilli Cheese Burger",
    size: "Small",
    quantity: 0,
    price: 0,
  },
];

export default function Home() {
  const myRef = useRef<boolean>(true);
  const [burgerKeys, setBurgerKeys] = useState<string[]>([]);
  const [orders, dispatch] = useReducer(reducer, initialOrderSummary);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [customerDiscount, setCustomerDiscount] = useState<number>(0);
  const [promoActivated, setPromoActivated] = useState<boolean>(false);
  const [promoAvailed, setPromoAvailed] = useState<boolean>(false);
  const [customerCodeAvailed, setCustomerCodeAvailed] = useState<boolean>(false);

  useEffect(() => {
    //The useRef is used here so that this piece of code is executed only once
    if (myRef && myRef.current) {
      let objKeys = Object.keys(burgers).filter((k) => isNaN(Number(k)));
      myRef.current = false;
      setBurgerKeys(objKeys);
    }
    let count = 0;
    let price = 0;
    for (let i = 0; i < orders.length; i++) {
      count += orders[i].quantity;
      price += orders[i].price;
    }
    setOrdersCount(count);
    setTotalPrice(twoDecimalPlace(price));
    if (customerCodeAvailed) setCustomerDiscount(twoDecimalPlace(price * (customerCodeDiscountPercentage / 100)));
    return () => {
    };
  });

  const handleOrder = (
    name: "Hamburger" | "Cheese Burger" | "Chilli Cheese Burger",
    size: "Small" | "Medium" | "Large",
    type: "dec" | "inc"
  ) => {
    dispatch({ burger: name, size: size, type: type, promo: promoActivated });
    if (promoActivated && size ==='Large'){
      setPromoActivated(false);
      setPromoAvailed(true);
      alert('Promo code availed.');
      if (name === "Hamburger"){
        setPromoDiscount(twoDecimalPlace(burgers.hamburger * burgerSizes.Large));
      }
      else if (name === "Cheese Burger"){
        setPromoDiscount(twoDecimalPlace(burgers.cheeseBurger * burgerSizes.Large));
      }
      else if (name === "Chilli Cheese Burger"){
       setPromoDiscount(twoDecimalPlace(burgers.chilliCheeseBurger * burgerSizes.Large));
      }
    }
  };

  const discountHandler = (type: "Promotion" | "Customer") => {
    if (type === "Promotion") {
      setPromoActivated(true);
    } else {
      setCustomerCodeAvailed(true);
      alert(customerCodeDiscountPercentage + '% Customer code discount availed.');
    }
  };

  return (
    <>
      <Head>
        <title>Finstreet Burger Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.heading}>Finstreet Burger Challenge</div>
          <div className={styles.orderArea}>
            <div className={styles.order}>
              <div className={styles.heading}>Order</div>
              <ul className={styles.menu}>
                {burgerKeys.map((item) => (
                  <li key={item}>
                    <BurgerCard burgerName={item} eventHandler={handleOrder} />
                  </li>
                ))}
              </ul>
              {!promoActivated && !promoAvailed && (
                <CodeInput
                  label="Promotion Code"
                  codeLength={7}
                  eventHandler={discountHandler}
                />
              )}
              {!customerCodeAvailed && (
                <CodeInput
                  label="Customer Code"
                  codeLength={7}
                  eventHandler={discountHandler}
                />
              )}
            </div>
            <div className={styles.summary}>
              <div className={styles.heading}>Order Summary</div>
              <ul className={styles.orders}>
                {orders.map((item) =>
                  item.quantity ? (
                    <li key={item.name + item.size}>
                      <OrderCard
                        burger={item.name}
                        size={item.size}
                        quantity={item.quantity}
                        price={item.price}
                      />
                    </li>
                  ) : null
                )}
              </ul>
              {ordersCount > 0 && <div className={styles.total}>Total: $ {totalPrice}</div>}
              {ordersCount > 0 && (
                <div className={styles.discount}>Promotion Discount: $ {promoDiscount}</div>
              )}
              {ordersCount > 0 && (
                <div  className={styles.discount}>Customer Discount: $ {customerDiscount} </div>
              )}
              {ordersCount > 0 && (
                <div className={styles.total}>
                  Total After Discounts: ${" "}
                  {twoDecimalPlace(totalPrice - promoDiscount - customerDiscount)}
                </div>
              )}
              
            </div>
          </div>
          <Link href={{ pathname: '/checkout'  }} className={styles.checkout} onClick={(e) => {
            if (ordersCount < 1){
              e.preventDefault();
              e.stopPropagation();
              alert('No order placed yet.');
              return;
            }
            let confirmed = confirm(`Pay $${twoDecimalPlace(totalPrice - promoDiscount - customerDiscount)} and confirm order?`);
            if (!confirmed){
              e.preventDefault();
              e.stopPropagation();
            }
          }}>Checkout</Link>
        </div>
      </main>
    </>
  );
}
