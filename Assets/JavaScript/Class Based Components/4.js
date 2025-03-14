class counter {
  constructor(initialValue = 0) {
    this.value = parseInt(localStorage.getItem("counterValue")) || initialValue;
  }

  saveToLocalStorage() {
    localStorage.setItem("counterValue", this.value);
  }

  increment() {
    this.value++;
    this.saveToLocalStorage();
  }

  decrement() {
    this.value--;
    this.saveToLocalStorage();
  }

  reset() {
    this.value = 0;
    this.saveToLocalStorage();
  }

  getValue() {
    return this.value;
  }
}

const myCounter = new counter();

function counterUi() {
  const container = document.createElement("div");
  container.className = "container text-center";
  const counterDisplay = document.createElement("p");
  counterDisplay.id = "counterValue";
  counterDisplay.textContent = `counter: ${myCounter.getValue()}`;

  const incrementButton = document.createElement("button");
  incrementButton.type = "button";
  incrementButton.className = "btn btn-success";
  incrementButton.textContent = "Increment";
  incrementButton.addEventListener("click", () => {
    myCounter.increment();
    updateDisplay();
  });

  const decrementButton = document.createElement("button");
  decrementButton.type = "button";
  decrementButton.className = "btn btn-danger ms-2";
  decrementButton.textContent = "Decrement";
  decrementButton.addEventListener("click", () => {
    myCounter.decrement();
    updateDisplay();
  });

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "btn btn-primary ms-2";
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", () => {
    myCounter.reset();
    updateDisplay();
  });

  document.body.appendChild(container);
  container.appendChild(counterDisplay);
  container.appendChild(incrementButton);
  container.appendChild(decrementButton);
  container.appendChild(resetButton);
}

function updateDisplay() {
  const counterDisplay = document.querySelector("#counterValue");
  counterDisplay.textContent = `counter: ${myCounter.getValue()}`;
}

counterUi();
