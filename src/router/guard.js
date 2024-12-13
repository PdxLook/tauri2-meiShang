export default (router) => {
  router.beforeEach(beforeEach);
  router.afterEach(afterEach);
};

//前置路由
async function beforeEach(to, from, next) {
  // 判断是否登录，没登录就进入登录页面
  // const token = localStorage.getItem("token");
  // if (to.path !== "/login" && !token) {
  //   next("/login"); // 如果没有 token，就跳转到登录页面
  // } else {
  //   next(); // 继续路由
  // }
  next();
}

//后置路由
async function afterEach(to, from) {
  /*********动态修改keywords和description*************/
  /* 路由发生变化修改页面title */
  if (typeof to.meta.title === "string") {
    document.title = to.meta.title;
  }
  /* 路由发生变化修改页面keywords */
  if (typeof to.meta.keywords === "string") {
    document
      .querySelector('meta[name="keywords"]')
      ?.setAttribute("content", to.meta.keywords);
  }
  /* 路由发生变化修改页面description */
  if (typeof to.meta.description === "string") {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", to.meta.description);
  }
  /**********************************************/
}
