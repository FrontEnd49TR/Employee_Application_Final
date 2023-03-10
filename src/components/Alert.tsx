import React from "react";
type AlertProps = {
    type: "warn" | "info" | "error";
    message: string;
}
export const Alert: React.FC<AlertProps> = ({ type, message }) => {
    let backGround: "red" | "green" | "yellow";
    switch (type) {
        case "error": backGround = "red"; break;
        case "info": backGround = "green"; break;
        case "warn": backGround = "yellow"
    }
    return <p style={{ backgroundColor: backGround, color: "white", fontWeight: "bold" }}>{message}</p>
}