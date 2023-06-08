const LoginPage = (
  SignInPage: () => string,
  SignUpPage: () => string
): string => {
  return ` <div class="login">
    ${SignInPage?.()}
    ${SignUpPage?.()}
      <div class="login-bg login-bg-right">
      <img src="https://images.unsplash.com/photo-1615714365596-be5fc1ef73a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="">
      </div>
    </div>`;
};

export default LoginPage;
