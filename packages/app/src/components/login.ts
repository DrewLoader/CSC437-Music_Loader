import { Auth, define, Form} from "@calpoly/mustang";


define({
  "mu-auth": Auth.Provider,
  "login-form": Form.Element
});
setTimeout(() => {
  const form = document.querySelector("login-form");
  console.log("login-form element:", form);
  
  if (form) {
    const shadowRoot = form.shadowRoot;
    console.log("Shadow root:", shadowRoot);
    if (shadowRoot) {
      const actualForm = shadowRoot.querySelector("form");
      console.log("Actual <form> inside:", actualForm);
      
      // Listen for submit events
      if (actualForm) {
        actualForm.addEventListener("submit", (e) => {
          console.log("Form submit event detected!", e);
        });
      }
    }
  }
}, 1000);