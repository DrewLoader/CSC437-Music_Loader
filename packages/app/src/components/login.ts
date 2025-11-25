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
        
        console.log("Username value:", username);
        console.log("Password value:", password);
        console.log("Username type:", typeof username);
        console.log("Password type:", typeof password);
        
        // Log all form data
        console.log("All form data:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        
        const payload = { username, password };
        console.log("Sending payload:", payload);
        console.log("Payload JSON:", JSON.stringify(payload));
        
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
            let data;
            try {
              data = JSON.parse(text);
              console.log("Login response:", data);
              
              if (data.token) {
                localStorage.setItem("music:auth.token", data.token);
                window.location.href = "/app";
              }
            } catch {
              console.error("Response was not JSON:", text);
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