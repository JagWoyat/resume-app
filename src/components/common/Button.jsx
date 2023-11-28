import "./Button.css";

export default function Button({
  children,
  Icon,
  mode = "filled",
  size = "small",
  ...props
}) {
  let styles =
    "button-component " +
    size +
    "-button-component " +
    mode +
    "-button-component";

  if (Icon) {
    styles += " icon-button-component";
  }

  if (props.className) {
    styles += " " + props.className;
  }

  return (
    <button className={styles} {...props}>
      {Icon && <span className="button-icon-component">{Icon}</span>}
      <span>{children}</span>
    </button>
  );
}
