import React, { createContext, useContext, useState, ReactNode } from "react";
import GeneratedText from "../components/GeneratedText";

type Notification = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  fading?: boolean;
};

type NotificationContextType = {
  notify: (message: string, type?: "success" | "error" | "info") => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, type: "success" | "error" | "info" = "info") => {
  const id = Date.now() + Math.random(); // unikalniejsze ID, gdy powiadomienia są szybkie
  setNotifications(prev => [...prev, { id, message, type }]);

  // Fade-out po 4s
  setTimeout(() => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, fading: true } : n))
    );

    // Usuń po 300 ms od rozpoczęcia fade-out
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  }, 7000);
};

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="notification-container">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`notification notification--${n.type} ${n.fading ? "notification--fadeout" : ""}`}
          >
            <GeneratedText wordDelay={0.3}>{n.message}</GeneratedText>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};