import { Auth, define, Form} from "@calpoly/mustang";


define({
  "mu-auth": Auth.Provider,
  "login-form": Form.Element
});

console.log("Defined elements:");
console.log("mu-auth:", customElements.get("mu-auth"));
console.log("login-form:", customElements.get("login-form"));