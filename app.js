const $ = (selector) => document.querySelector(selector);

$("#year").textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const chatMessages = $("#chatMessages");
const chatForm = $("#chatForm");
const chatInput = $("#chatInput");

function addMessage(text, type) {
  const row = document.createElement("div");
  row.className = `message ${type === "user" ? "user-message" : "bot-message"}`;
  const avatar = document.createElement("span");
  avatar.className = "message-avatar";
  avatar.textContent = type === "user" ? "Y" : "H";
  const p = document.createElement("p");
  p.textContent = text;
  row.append(avatar, p);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, "user");
  chatInput.value = "";
  chatInput.disabled = true;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "The demo service could not answer.");
    addMessage(data.reply, "bot");
  } catch (_error) {
    addMessage("The demo backend is not reachable. If you opened this page as a file, deploy/run the Node.js project to use the demo chat.", "bot");
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});

const lessonPanel = $("#lessonPanel");
const lessonTitle = $("#lessonTitle");
const lessonContent = $("#lessonContent");

const courses = {
  python: {
    title: "Python Foundations",
    lessons: [
      ["Meet Python", "Python is a programming language used for websites, automation, data, and AI.", "print(\"Hello, world!\")"],
      ["Variables", "Variables give names to values so your program can reuse them.", "name = \"Hauly\"\nprint(name)"],
      ["Numbers and text", "Numbers can be used for calculations. Text is usually written inside quotes.", "age = 15\nlanguage = \"Python\"\nprint(language)"],
      ["Get user input", "input() lets a program ask a person to type something.", "name = input(\"What is your name? \")\nprint(\"Hello\", name)"],
      ["Make decisions", "An if statement runs code only when a condition is true.", "score = 80\nif score >= 50:\n    print(\"You passed!\")"],
      ["Repeat with loops", "A for loop repeats an action for each item in a sequence.", "for number in range(1, 4):\n    print(number)"]
    ]
  },
  web: {
    title: "Web Development Preview",
    lessons: [
      ["HTML", "HTML defines the structure and content of a web page.", "<h1>Hello, world!</h1>"],
      ["CSS", "CSS controls the visual design, spacing, and layout of a web page.", "h1 { color: cyan; }"],
      ["JavaScript", "JavaScript adds behaviour and interactivity to websites.", "console.log(\"Hello!\");"]
    ]
  },
  ai: {
    title: "AI Explorer Preview",
    lessons: [
      ["What is AI?", "Artificial intelligence describes computer systems designed to perform tasks such as recognizing patterns or generating language.", "Learn the idea before choosing a tool."],
      ["Give clear instructions", "Good prompts explain the goal, context, and format you need.", "Goal + context + desired output"],
      ["Use AI responsibly", "Check important answers, protect private information, and be transparent about limitations.", "Human judgement still matters."]
    ]
  }
};

document.querySelectorAll(".lesson-open").forEach((button) => {
  button.addEventListener("click", () => {
    const course = courses[button.dataset.lesson];
    lessonTitle.textContent = course.title;
    lessonContent.replaceChildren();
    course.lessons.forEach(([title, description, code], index) => {
      const item = document.createElement("article");
      item.className = "lesson-item";
      const number = document.createElement("div");
      number.className = "lesson-number";
      number.textContent = String(index + 1).padStart(2, "0");
      const body = document.createElement("div");
      const heading = document.createElement("h4");
      heading.textContent = title;
      const para = document.createElement("p");
      para.textContent = description;
      const sample = document.createElement("code");
      sample.className = "lesson-code";
      sample.textContent = code;
      body.append(heading, para, sample);
      item.append(number, body);
      lessonContent.appendChild(item);
    });
    lessonPanel.classList.remove("hidden");
    lessonPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
$("#closeLesson").addEventListener("click", () => lessonPanel.classList.add("hidden"));
