import { emit } from "@tauri-apps/api/event";

/**
 * @desc 创建新窗口
 * @param args {object} {label: 'new', url: '/new', width: 500, height: 300, ...}
 */
export async function createWin(args: any) {
  await emit("win-create", args);
}

// ...

/**
 * @desc 登录窗口
 */
export async function loginWin() {
  await createWin({
    label: "login",
    title: "登录",
    url: "/login",
    width: 960,
    height: 600,
    resizable: false,
    center: true,
    alwaysOnTop: true,
  });
}

export async function mainWin() {
  await createWin({
    label: "main",
    title: "每商公众号矩阵软件",
    url: "/dashboard",
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 800,
    center: true,
    decorations: false,
  });
}
