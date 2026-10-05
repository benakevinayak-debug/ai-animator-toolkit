let shots = JSON.parse(localStorage.getItem("animatorShots") || "[]");

function renderShots() {
  const box = document.getElementById("shots");
  if (!shots.length) {
    box.innerHTML = '<p class="empty">No shots added yet.</p>';
    return;
  }
  box.innerHTML = shots.map((s, i) => `
    <div class="shot">
      <div class="number">S${String(i + 1).padStart(2, "0")}</div>
      <div>${escapeHtml(s.description)}<div class="meta">${escapeHtml(s.camera)}</div></div>
      <div>${s.duration}s</div>
    </div>
  `).join("");
}

function addShot() {
  const description = document.getElementById("shot").value.trim();
  const duration = Number(document.getElementById("duration").value) || 5;
  const camera = document.getElementById("camera").value;
  if (!description) return alert("Add a shot description first.");
  shots.push({ description, duration, camera });
  localStorage.setItem("animatorShots", JSON.stringify(shots));
  document.getElementById("shot").value = "";
  renderShots();
}

function clearShots() {
  shots = [];
  localStorage.removeItem("animatorShots");
  renderShots();
}

function buildPrompt() {
  const subject = document.getElementById("subject").value || "2D cartoon character";
  const action = document.getElementById("action").value || "performs a simple expressive action";
  const style = document.getElementById("style").value || "clean 2D animation";
  document.getElementById("prompt").value =
    `${subject} ${action}, ${style}, consistent character design, clear readable motion, smooth timing, clean composition, no unnecessary camera movement.`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

renderShots();
