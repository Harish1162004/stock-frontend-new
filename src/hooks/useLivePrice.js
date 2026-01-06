import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useLivePrice() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/prices", (msg) => {
        const data = JSON.parse(msg.body);
        setPrices(data);
      });
    };

    stompClient.activate();

    return () => stompClient.deactivate();
  }, []);

  return prices;
}
