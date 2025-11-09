// src/backend/coins/coinValueStore.js
import { useEffect, useState } from "react";
import CoinsValue from "./coinsValue";

// 🔥 Shared state across app (Singleton)
let globalCoinValue = 0;
let globalChangePercent = "+0.00%";
let subscribers = [];

// helper to notify all listeners
const notify = () => {
  subscribers.forEach((cb) =>
    cb({ coinValue: globalCoinValue, changePercent: globalChangePercent })
  );
};

// Function to fetch the base value from API once
const fetchInitialCoinValue = async () => {
  try {
    const res = await CoinsValue();
    if (Array.isArray(res) && res.length > 0) {
      globalCoinValue = parseFloat(res[0].Coinvalue);
      notify();
    }
  } catch (err) {
    console.error("❌ Failed to fetch coin value:", err);
  }
};

// 🧮 Random fluctuation logic
const startAutoUpdate = () => {
  setInterval(() => {
    const sign = Math.random() < 0.5 ? 1 : -1;
    const randomPercent = (Math.random() * 2).toFixed(2);
    const percentChange = sign * parseFloat(randomPercent);
    const signStr = percentChange >= 0 ? "+" : "-";
    globalCoinValue += (globalCoinValue * percentChange) / 100;
    globalCoinValue = parseFloat(globalCoinValue.toFixed(2));
    globalChangePercent = `${signStr}${Math.abs(percentChange).toFixed(2)}%`;
    notify();
  }, 3000);
};

// Run once when the app first imports this file
fetchInitialCoinValue();
startAutoUpdate();

// ✅ Custom Hook that subscribes to shared globalCoinValue
export const useSharedCoinValue = () => {
  const [state, setState] = useState({
    coinValue: globalCoinValue,
    changePercent: globalChangePercent,
  });

  useEffect(() => {
    subscribers.push(setState);
    // cleanup on unmount
    return () => {
      subscribers = subscribers.filter((cb) => cb !== setState);
    };
  }, []);

  return state;
};
