class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) throw new Error(`Form with ID "${formId}" not found.`);
    this.inputs = {
      fname: {
        field: this.form.querySelector("#fname"),
        error: this.form.querySelector("#fnameError"),
        rules: [
          {
            validate: (value) => value.trim() !== "",
            errorMessage: "Name is required.",
          },
        ],
      },
      age: {
        field: this.form.querySelector("#age"),
        error: this.form.querySelector("#ageError"),
        rules: [
          {
            validate: (value) =>
              value.trim() !== "" && /^[1-9]\d*$/.test(value),
            errorMessage: "Please enter a valid age (positive integer).",
          },
        ],
      },
      address: {
        field: this.form.querySelector("#address"),
        error: this.form.querySelector("#addressError"),
        rules: [
          {
            validate: (value) => value.trim() !== "",
            errorMessage: "Address is required.",
          },
        ],
      },
      email: {
        field: this.form.querySelector("#email"),
        error: this.form.querySelector("#emailError"),
        rules: [
          {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            errorMessage: "Please enter a valid email address.",
          },
        ],
      },
    };
    for (const [key, config] of Object.entries(this.inputs)) {
      if (!config.field || !config.error)
        throw new Error(
          `Field or error element for "${key}" is missing in the form.`
        );
    }
    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    Object.values(this.inputs).forEach(({ field }) =>
      field.addEventListener("input", () => this.clearError(field))
    );
  }

  clearError(field) {
    const inputConfig = Object.values(this.inputs).find(
      (input) => input.field === field
    );
    if (inputConfig) {
      inputConfig.error.textContent = "";
      field.classList.remove("is-invalid");
    }
  }

  showError(field, message) {
    const inputConfig = Object.values(this.inputs).find(
      (input) => input.field === field
    );
    if (inputConfig) {
      inputConfig.error.textContent = message;
      field.classList.add("is-invalid");
    }
  }

  validateField(field, rules) {
    for (const rule of rules) {
      if (!rule.validate(field.value)) return rule.errorMessage;
    }
    return null;
  }

  handleSubmit(event) {
    let isValid = true;
    Object.values(this.inputs).forEach(({ field, rules }) => {
      const errorMessage = this.validateField(field, rules);
      if (errorMessage) {
        this.showError(field, errorMessage);
        isValid = false;
      }
    });
    if (!isValid) event.preventDefault();
    return isValid;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    new FormValidator("myForm");
  } catch (error) {
    console.error(error.message);
  }
});

function addData() {
  const formValidator = new FormValidator("myForm");
  if (!formValidator.handleSubmit(new Event("submit", { cancelable: true })))
    return;

  const myForm = document.getElementById("myForm");
  const fname = myForm.fname.value.trim();
  const age = myForm.age.value.trim();
  const address = myForm.address.value.trim();
  const email = myForm.email.value.trim();
  const peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");

  if (myForm.dataset.editIndex) {
    peopleList[myForm.dataset.editIndex] = { name: fname, age, address, email };
    delete myForm.dataset.editIndex;
    document.getElementById("updateData").style.display = "none";
    document.getElementById("submit").style.display = "inline-block";
  } else {
    peopleList.push({ name: fname, age, address, email });
  }

  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  clearForm();
}

function clearForm() {
  const myForm = document.getElementById("myForm");
  myForm.fname.value = "";
  myForm.age.value = "";
  myForm.address.value = "";
  myForm.email.value = "";
  delete myForm.dataset.editIndex;
  document.getElementById("updateData").style.display = "none";
  document.getElementById("submit").style.display = "inline-block";
}

function clearAllData() {
  localStorage.removeItem("peopleList");
}
