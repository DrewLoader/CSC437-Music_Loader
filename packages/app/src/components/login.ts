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
        
        // Get inputs from the light DOM (the actual page)
        const usernameInput = loginForm.querySelector('input[name="username"]') as HTMLInputElement;
        const passwordInput = loginForm.querySelector('input[name="password"]') as HTMLInputElement;
        
        const username = usernameInput?.value;
        const password = passwordInput?.value;
        
        console.log("Username value:", username);
        console.log("Password value:", password);
        
        if (!username || !password) {
          console.error("Username or password is empty!");
          return;
        }
        
        const payload = { username, password };
        console.log("Sending payload:", JSON.stringify(payload));
        
        try {
          const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          
          console.log("Response status:", response.status);
          
          const text = await response.text();
          console.log("Response text:", text);
          
          if (response.ok) {
            const data = JSON.parse(text);
            console.log("Login response:", data);
            
            if (data.token) {
              localStorage.setItem("music:auth.token", data.token);
              window.location.href = "/app";
            }
          } else {
            console.error("Login failed:", text);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      });
    }
  }
}, 1000);