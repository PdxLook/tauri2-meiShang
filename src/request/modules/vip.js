import axiosInit from "@/request/index";

export function pullVip(data) {
  return axiosInit.post("/h5_vip.html", data);
}

export function pullPay(data) {
  return axiosInit.post("/h5_pay.html", data);
}

export function pullBalance(data) {
  return axiosInit.post("/h5_balance.html", data);
}

export function pullExpansion(data) {
  return axiosInit.post("/h5_expansion.html", data);
}
