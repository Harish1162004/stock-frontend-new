import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function useWebSocketPrice() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/prices", (message) => {
        setPrices(JSON.parse(message.body));
      });
    });

    return () => stompClient.disconnect();
  }, []);

  return prices;
}
