import CheckBox from "./CheckBox";

const CheckBoxes = ({ setFormData, formData }) => {
  const checkBoxes = [
    {
      value: "swimming",
      title: "Swimming",
    },
    {
      value: "bathing",
      title: "Bathing",
    },
    {
      value: "chatting",
      title: "Chatting",
    },
    {
      value: "noTime",
      title: "I don't like to spend time with it",
    },
  ];

  const onChange = (event) => {
    let newSpentTime = [];
    if (event.target.value === "noTime") {
      newSpentTime = [event.target.value];
    } else if (formData[event.target.name].includes(event.target.value)) {
      newSpentTime = formData[event.target.name].filter(
        (x) => x !== event.target.value
      );
    } else {
      newSpentTime = [
        ...formData[event.target.name].filter((x) => x !== "noTime"),
        event.target.value,
      ];
    }
    setFormData({ ...formData, spentTime: newSpentTime });
  };

  return checkBoxes.map((box) => (
    <CheckBox
      key={box.value}
      value={box.value}
      title={box.title}
      onChange={onChange}
      formData={formData}
    />
  ));
};

export default CheckBoxes;
