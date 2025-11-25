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
        
        // Get inputs from the light DOM
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
          
          if (response.ok) {
            const data = await response.json();
            console.log("Login response:", data);
            
            if (data.token) {
              // Dispatch auth event so mu-auth can handle it
              const authEvent = new CustomEvent("auth:message", {
                bubbles: true,
                composed: true,
                detail: ["auth/signin", { token: data.token, redirect: "/app" }]
              });
              
              loginForm.dispatchEvent(authEvent);
            }
          } else {
            const text = await response.text();
            console.error("Login failed:", text);
            alert("Login failed: " + text);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      });
    }
  }
}, 1000);