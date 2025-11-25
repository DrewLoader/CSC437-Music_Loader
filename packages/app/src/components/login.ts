import { Auth, define, Form} from "@calpoly/mustang";


define({
  "mu-auth": Auth.Provider,
  "login-form": Form.Element
});
setTimeout(() => {
  const loginForm = document.querySelector("login-form");
  
  if (loginForm && loginForm.shadowRoot) {
    const form = loginForm.shadowRoot.querySelector("form");
    
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Submit intercepted!");
        
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");
        
        console.log("Submitting:", { username, password });
        
        try {
          const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          });
          
          const data = await response.json();
          console.log("Login response:", data);
          
          if (data.token) {
            // Store the token
            localStorage.setItem("music:auth.token", data.token);
            // Redirect to app
            window.location.href = "/app";
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      });
    }
  }
}, 1000);