"use client";
import { Session, User } from "lucia";
import React, { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used withing a SessionProvider");
  }
  return context;
};

export { SessionProvider, useSession };
