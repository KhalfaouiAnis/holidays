// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);
  const eventHandlers = useRef({}); // Store event-specific handlers

  useEffect(() => {
    // Create WebSocket connection
    wsRef.current = new WebSocket(url);

    // Handle connection open
    wsRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    // Handle incoming messages
    wsRef.current.onmessage = (event) => {
      try {
        const { event: eventType, data } = JSON.parse(event.data);
        // Add to messages (for general display)
        setMessages((prev) => [...prev, { event: eventType, data }]);
        // Call event-specific handler if registered
        if (eventHandlers.current[eventType]) {
          eventHandlers.current[eventType](data);
        }
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    };

    // Handle connection close
    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Handle errors
    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  // Function to send messages
  const sendMessage = (type, data) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, ...data }));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  // Function to register event handlers
  const onEvent = (eventType, handler) => {
    eventHandlers.current[eventType] = handler;
  };

  return { messages, sendMessage, onEvent };
};

export default useWebSocket;
