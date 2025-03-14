class LightDarkToggle {
  constructor(container) {
    this.container = container;
    this.isDarkMode = localStorage.getItem("theme") === "dark";
    this.setupContainer();
    this.render();
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    this.updateStyles();
    this.updateButtonText();
  }

  updateStyles() {
    const bodyStyle = document.body.style;
    bodyStyle.backgroundColor = this.isDarkMode ? "#121212" : "#ffffff";
    bodyStyle.color = this.isDarkMode ? "#ffffff" : "#000000";
    bodyStyle.transition = "background-color 0.3s ease, color 0.3s ease";
  }

  updateButtonText() {
    this.button.textContent = this.isDarkMode
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  }

  setupContainer() {
    const containerStyle = this.container.style;
    containerStyle.display = "flex";
    containerStyle.justifyContent = "center";
    containerStyle.alignItems = "center";
    containerStyle.height = "100vh";
    containerStyle.width = "100vw";

    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapCSS);
  }

  render() {
    this.container.innerHTML = "";
    this.button = document.createElement("button");
    this.button.className = "btn btn-lg btn-primary shadow-lg";
    this.updateButtonText();
    this.button.addEventListener("click", () => this.toggleMode());
    this.container.appendChild(this.button);
    this.updateStyles();
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
new LightDarkToggle(container);
