function LoginPage(SignInPage: any, SignUpPage: any) {
  return ` <div class="login">
    ${SignInPage ? SignInPage() : ""}
    ${SignUpPage ? SignUpPage() : ""}
      <div class="login-bg login-bg-right">
        <img
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          alt=""
        />
      </div>
    </div>`;
}

export default LoginPage;
