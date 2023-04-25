function SignIn() {
  return `
    <div class="form-wrapp">
    <form id="form-sign-in" class="form-login" autocomplete="off">
      <h2 class="form-title">Wellcome</h2>
      <p class="form-sub-title">Wellcome! Please enter your details.</p>
      <div class="form-wrapp-input">
        <label for="email-signIn" class="form-label">Email address</label>
        <input
          id="email-signIn"
          name="email"
          type="text"
          class="form-input"
          placeholder="Enter your email address..."
        />
        <p class="input-error">Email address is not valid</p>
      </div>
      <div class="form-wrapp-input">
        <label for="password-signIn" class="form-label">Password</label>
        <div class="form-wrapp-password">
          <input
            id="password-signIn"
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
      <button class="btn submit-form">
        <div class="loading"></div>
        <span class="">Sign In</span>
      </button>
      <p class="confirm-is-account">
        You have an account <span class="register-link">Sign Up</span>
      </p>
    </form>
  </div>
    `;
}
export default SignIn;
