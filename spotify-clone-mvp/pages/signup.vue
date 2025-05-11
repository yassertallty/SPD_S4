<template>
  <div class="signup-page">
    <div class="signup-container">
      <h1>Create Account</h1>
      <p>Sign up is only available via Spotify. Please use the login page.</p>
      <NuxtLink to="/login">
        <button class="submit-btn">Go to Login</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// No signup logic needed, only redirect to login
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: #fff;
}

.signup-container {
  background: #282828;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.signup-container h1 {
  margin: 0 0 2rem;
  text-align: center;
  color: #1DB954;
}

.error-message {
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fff;
  color: #000;
  border: none;
  padding: 0.75rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1.5rem;
}

.google-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #b3b3b3;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #404040;
}

.divider span {
  padding: 0 1rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #b3b3b3;
  font-size: 0.875rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 4px;
  background: #404040;
  color: #fff;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #1DB954;
}

.submit-btn {
  background: #1DB954;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #1ed760;
}

.submit-btn:disabled {
  background: #404040;
  cursor: not-allowed;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #b3b3b3;
}

.login-link a {
  color: #1DB954;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
