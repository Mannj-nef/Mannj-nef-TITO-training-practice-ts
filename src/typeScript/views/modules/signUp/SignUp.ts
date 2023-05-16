const SignUp = (): string => {
  return `
    <div class="form-wrapp">
    <form id="form-sign-up" class="form-login" autocomplete="off">
      <h2 class="form-title">Wellcome back</h2>
      <p class="form-sub-title">Wellcome back! Please enter your details.</p>
      <div class="form-wrapp-input">
        <label for="email-signUp" class="form-label">Email address</label>
        <input
          id="email-signUp"
          name="email"
          type="text"
          class="form-input"
          placeholder="Enter your email address..."
        />
        <p class="input-error">Email address is not valid</p>
      </div>
      <div class="form-wrapp-input">
        <label for="password-signUP" class="form-label">Password</label>
        <div class="form-wrapp-password">
          <input
            id="password-signUp"
            name="password"
            type="password"
            class="form-input"
            placeholder="Enter your password..."
          />
          <p class="input-error">Please enter at least 6 characters</p>
          <div class="show-password">
            <i class="ti-eye"></i>
          </div>
        </div>
      </div>
      <div class="form-wrapp-input">
        <label for="confirm-password" class="form-label">Confirm Password</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          class="form-input"
          placeholder="Enter your confirm password..."
        />
        <p class="input-error">Password does not match</p>
      </div>
      <button class="btn submit-form">
        <div class="loading d-none"></div>
        <span class="">Sign Up</span>
      </button>
      <p class="confirm-is-account">
        Don't have an account? <span class="login-link"> Sign In</span>
      </p>
    </form>
  </div>
    `;
};

export default SignUp;
