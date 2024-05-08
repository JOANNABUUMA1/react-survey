/* eslint-disable no-undef */
import { useState } from "react";
import CheckBoxes from "./form/CheckBoxes";
import RadioButtons from "./form/RadioButtons";
import AnswersList from "./AnswersList";
import { useEffect } from "react";

function Survey() {
  const initForm = {
    email: "",
    username: "",
    review: "",
    spentTime: [],
    color: "",
  };

  const [formData, setFormData] = useState({ ...initForm });
  const [answers, setAnswers] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const loadData = async () => {
    const response = await fetch("http://localhost:3000/surveys", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    let data = await response.json();
    console.log(data);
    setAnswers(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleFormDataChanged = (event) => {
    const newData = { ...formData };
    newData[event.target.name] = event.target.value;
    setFormData(newData);
  };

  const handleSubmitSurvey = (event) => {
    event.preventDefault();

    const apiPostRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const apiPutRequest = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    if (
      formData.email.trim() === "" ||
      formData.username.trim() === "" ||
      formData.review.trim() === "" ||
      formData.spentTime.length < 1 ||
      formData.color === ""
    ) {
      return;
    }
    if (editIndex == -1) {
      fetch("http://localhost:3000/surveys", apiPostRequest);
    } else {
      fetch(
        "http://localhost:3000/surveys/" + answers[editIndex].id,
        apiPutRequest
      );
      setEditIndex(-1);
    }

    loadData();
    setFormData({ ...initForm });
  };

  const handleDeleteAnswer = async (event) => {
    const apiDeleteRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    await fetch(
      "http://localhost:3000/surveys/" + answers[event.target.id].id,
      apiDeleteRequest
    );
    await loadData();
    setIsEdit(false);
    setFormData({ ...initForm });
  };

  const handleEditAnswer = (event) => {
    let index = event.target.id;
    setEditIndex(index);
    setFormData(answers[index]);
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList
          answersList={answers}
          editAnswer={handleEditAnswer}
          deleteAnswer={handleDeleteAnswer}
        />
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmitSurvey}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            <RadioButtons
              onChange={handleFormDataChanged}
              color={formData.color}
            />
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              <CheckBoxes setFormData={setFormData} formData={formData} />
            </ul>
          </div>
          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              value={formData.review}
              onChange={handleFormDataChanged}
            ></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormDataChanged}
            />
          </label>
          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChanged}
            />
          </label>
          <input
            className="form__submit"
            type="submit"
            value="Submit Survey!"
          />
        </form>
      </section>
    </main>
  );
}

export default Survey;
