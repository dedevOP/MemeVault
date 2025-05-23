// MemeVault Homepage

"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.solana) {
      window.solana.on("connect", () => {
        setWalletConnected(true);
        setPublicKey(window.solana.publicKey.toString());
      });
      window.solana.on("disconnect", () => {
        setWalletConnected(false);
        setPublicKey("");
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.solana) {
      try {
        await window.solana.connect();
      } catch (err) {
        console.error("Wallet connection error:", err);
      }
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", background: "#fffbe6" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#eab308" }}>MemeVault</h1>
      <p style={{ marginBottom: "1rem", color: "#4b5563" }}>Earn fees by locking meme coins on Solana</p>
      {walletConnected ? (
        <>
          <p style={{ color: "green", marginBottom: "0.5rem" }}>Wallet connected:</p>
          <p>{publicKey}</p>
        </>
      ) : (
        <button onClick={connectWallet} style={{ padding: "10px 20px", backgroundColor: "#eab308", color: "white", border: "none", borderRadius: "5px" }}>
          Connect Wallet
        </button>
      )}
    </main>
  );
}
