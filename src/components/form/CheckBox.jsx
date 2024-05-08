/* eslint-disable react/prop-types */
const CheckBox = ({ value, title, onChange, formData }) => {
    return (
      <li>
        <label>
          <input
            name="spentTime"
            type="checkbox"
            value={value}
            onChange={onChange}
            checked={formData["spentTime"].includes(value) ? true : false}
          />
          {title}
        </label>
      </li>
    );
  };
  
  export default CheckBox;
  