const factions = ["Foundation", "Manus", "Zeno", "Laplace", "UTTU"];
const scores = Object.fromEntries(factions.map(f => [f, 0]));

const factionData = {
  Foundation: {
    title: "St. Pavlov Foundation",
    image: "foundation.png",
    description: "\"The Storm — a chaos that cannot be bargained with. Therefore, you do not bargain but regulate. In the silence of order, humanity survives.\""
  },
  Manus: {
    title: "Manus Vindictae",
    image: "manus.png",
    description: "\"The world is a masterpiece painted on a rotting canvas. In the purification of The Flood, all shall return to as it once was.\""
  },
  Zeno: {
    title: "Zeno Armed Force",
    image: "zeno.png",
    description: "\"A soldier's shadow is longer than the era they serve. Faced with total erasure, the rigid steel of your resolve remains for what follows.\""
  },
  Laplace: {
    title: "Laplace Scientific Computing Centre",
    image: "laplace.png",
    description: "\"Sentiment is a flaw in the engine of progress. You do not pray a miracle but stride to a future where the Storm is but a solved variable.\""
  },
  UTTU: {
    title: "UTTU",
    image: "uttu.png",
    description: "\"To record a moment is to rescue it from the abyss. You are an architect of remembrance, building a library of the heart in a world lost to time.\""
  }
};

const questions = [
{
  q: "The Storm is approaching. What is your first course of action?",
  a: [
    { t: "Get angry", p: { Manus:3, Laplace:1 }},
    { t: "Quietly grieve", p: { UTTU:3, Foundation:1 }},
    { t: "Focus on surviving", p: { Zeno:3, Foundation:1 }},
    { t: "Prepare contingencies", p: { Foundation:3, Laplace:1 }}
  ]
},
{
  q: "Someone denies the Storm exists. What do you do?",
  a: [
    { t: "Lash out", p: { Manus:3 }},
    { t: "Feel sadness", p: { UTTU:3 }},
    { t: "Observe them", p: { Laplace:3, Zeno:2 }},
    { t: "Let them be", p: { Zeno:3 }}
  ]
},
{
  q: "How do you feel about the future not being able to be changed?",
  a: [
    { t: "Keep fighting it", p: { Manus:3, Foundation:1 }},
    { t: "Grieve the inevitable", p: { UTTU:3 }},
    { t: "Try to understand why", p: { Laplace:3, Foundation:1 }},
    { t: "Ignore feelings, live in the present", p: { Zeno:3 }}
  ]
},
{
  q: "You have been given a mission, and need to form a team. What do you do?",
  a: [
    { t: "Randomly choose whoever is available", p: { UTTU:1, Laplace:3 }},
    { t: "Choose familiar, friendly people", p: { UTTU:3, Zeno:1 }},
    { t: "Select only top performers that go above and beyond", p: { Manus:3, Foundation:1 }},
    { t: "Analyze compatibility and roles", p: { Foundation:3, Manus:1 }}
  ]
},
{
  q: "What defines a successful mission?",
  a: [
    { t: "All objectives achieved, nothing else matters", p: { Zeno:3 }},
    { t: "Primary objectives achieved with minor losses", p: { Foundation:3 }},
    { t: "All objectives achieved with heavy losses", p: { Manus:3 }},
    { t: "Few primary objectives completed, but ensured everyone was safe", p: { UTTU:3, Laplace:1 }}
  ]
},
{
  q: "How would you like to celebrate the success of completing the mission?",
  a: [
    { t: "Treat yourself to a lavish meal and good drinks", p: { UTTU:1, Laplace:3 }},
    { t: "Low-key celebration with close allies and friends", p: { Foundation:3 }},
    { t: "Big party with the team", p: { Zeno:3 }},
    { t: "Grand, formal celebration with all associates", p: { Manus:3 }}
  ]
},
{
  q: "You have apprehended a high-ranking official leaking sensitive information. What is the appropriate correction?",
  a: [
    { t: "Detention - ensure they can no longer compromise the collective order", p: { Zeno:2, Foundation:2 }},
    { t: "Court-martial - if they cannot be an asset, then they are a liability and should be removed", p: { Zeno:3, Manus:2 }},
    { t: "Detailed interrogation - their motives and the reasoning behind them are fascinating to learn", p: { UTTU:3, Laplace:2 }},
    { t: "Public execution - betrayal of their own kind is an insult that can only be washed away in the Storm", p: { Manus:3 }}
  ]
},
{
  q: "Your team leader has replaced you halfway through a mission . How do you approach this sudden dismissal?",
  a: [
    { t: "Lash out and go on an explosive tirade - \"This must be agenda-driven\"", p: { Manus:3 }},
    { t: "Calmly approach and ask for the leader's reasoning - \"Maybe I've done something wrong\"", p: { Foundation:2, Laplace:2 }},
    { t: "Ignore the leader's orders and march forward with the mission - \"I can't leave my team behind\"", p: { Zeno:3, UTTU:1 }},
    { t: "Quietly leave the mission and plot your revenge - \"The war has just begun\"", p: { Manus:2, Laplace:1 }}
  ]
},
{
  q: "The Foundation issues an order that is strategically sound but morally questionable. How do you proceed?",
  a: [
    { t: "Follow without question", p: { Foundation:3 }},
    { t: "Do it but leave a record", p: { Laplace:3, Foundation:2, UTTU:1 }},
    { t: "Challenge the decision", p: { UTTU:3, Foundation:1, Laplace:1 }},
    { t: "Quietly sabotage it", p: { Manus:3, Zeno:1 }}
  ]
},
{
  q: "What is your definition of a perfect world?",
  a: [
    { t: "A world where every individual has a clear role, society is governed by rational and humane laws of coexistence", p: { Foundation:3, Laplace:1, Zeno:2 }},
    { t: "A world where the strong lead and those who oppressed us are suppressed or eradicated", p: { Manus:3, Zeno:1 }},
    { t: "A world where every truth is documented, no story, no matter how small is lost to time", p: { UTTU:3, Laplace:2 }},
    { t: "A world where the boundaries between magic and science are gone. Instead, all live as one singular race, free of borders and separation", p: { Laplace:3, Foundation:2 }}
  ]
}
];

// Shuffle questions
questions.sort(() => Math.random() - 0.5);

const quiz = document.getElementById("quiz");
let current = 0;
let hasSelected = false;

questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question" + (i === 0 ? " active" : "");
  div.innerHTML = `<div class="question-title">${q.q}</div>
    <div class="options">
      ${q.a.map((opt, j) =>
        `<div class="option" onclick="select(${i},${j},this)">${opt.t}</div>`
      ).join("")}
    </div>`;
  quiz.appendChild(div);
});

function select(qi, ai, el) {
  const questionEl = document.querySelectorAll(".question")[qi];

  questionEl.querySelectorAll(".option")
    .forEach(o => o.classList.remove("selected"));

  el.classList.add("selected");
  questions[qi].selected = ai;

  // 🔓 allow moving forward
  hasSelected = true;
  nextBtn.disabled = false;
}

function show(i) {
  document.querySelectorAll(".question").forEach((q, idx) =>
    q.classList.toggle("active", idx === i)
  );

  prevBtn.disabled = i === 0;

  // reset selection requirement
  hasSelected = questions[i].selected !== undefined;
  nextBtn.disabled = !hasSelected;

  nextBtn.textContent =
    i === questions.length - 1 ? "Finish" : "Next";
}

nextBtn.onclick = () => {
  if (!hasSelected) return;

  if (current === questions.length - 1) {
    finish();
  } else {
    current++;
    show(current);
  }
};
prevBtn.onclick = () => { current--; show(current); };

function finish() {
  questions.forEach(q => {
    const ans = q.a[q.selected];
    for (const f in ans.p) scores[f] += ans.p[f];
  });

  const top = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  quiz.style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  const data = factionData[top];
  result.innerHTML = `
    <h2>Affiliation Confirmed</h2>
    <h3>${data.title}</h3>
    <img src="images/${data.image}" alt="${data.title}"
        style="max-width:260px;margin:1.5rem auto;display:block;">
    <p>${data.description}</p>
  `;
  result.style.display = "block";
}