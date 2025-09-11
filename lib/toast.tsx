import * as React from "react";
import { toast as origin, ToastContainer, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toast(type: TypeOptions, children: React.ReactNode) {
  origin(children, {
    type,
    position: "top-right",
  });
}

export function toastSuccess(children: React.ReactNode = "success") {
  toast("success", children);
}

export function toastError(children: React.ReactNode = "error") {
  toast("error", children);
}

export const ToastInjection = ToastContainer;
