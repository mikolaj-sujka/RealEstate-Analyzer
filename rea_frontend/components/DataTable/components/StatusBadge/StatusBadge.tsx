import React from "react";
import * as classes from "../../styles";

export function StatusBadge({ status }: { status: string }) {
  const normalized = String(status).toUpperCase();
  const styling = {
    background: "#f5f5f5",
    color: "#555",
  };
  return (
    <div
      className={classes.statusBadge}
      style={{
        background: styling.background,
        color: styling.color,
      }}
    >
      {normalized}
    </div>
  );
}
