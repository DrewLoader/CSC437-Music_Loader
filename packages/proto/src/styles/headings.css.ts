import { css } from "lit";

const styles = css`
  h1, h2, h3 {
    font-family: var(--font-display, serif);
    color: var(--color-accent, currentColor);
    line-height: 1.2;
    margin: 0 0 var(--size-spacing-medium, 12px);
  }

  h1 { font-size: clamp(24px, 3vw, 32px); }
  h2 { font-size: clamp(20px, 2.4vw, 26px); }
  h3 { font-size: clamp(18px, 2vw, 22px); }
`;

export default { styles };