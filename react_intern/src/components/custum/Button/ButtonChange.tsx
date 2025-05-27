import "./css.css";

export const ButtonChange = () => {
  return (
    <label className="switch" aria-label="Toggle Filter">
      <input type="checkbox" id="filter" />
      <span>VN</span>
      <span>EN</span>
    </label>
  );
};
