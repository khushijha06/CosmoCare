const button = document.getElementById("checkButton");

button.addEventListener("click", function () {

  const heart = Number(document.getElementById("heart").value);
  const oxygen = Number(document.getElementById("oxygen").value);
  const sleep = Number(document.getElementById("sleep").value);
  const stress = Number(document.getElementById("stress").value);

  const result = document.getElementById("result");
  const title = document.getElementById("statusTitle");
  const statusText = document.getElementById("statusText");
  const dot = document.getElementById("statusDot");

  if (
    !Number.isFinite(heart) || heart <= 0 ||
    !Number.isFinite(oxygen) || oxygen <= 0 ||
    !Number.isFinite(sleep) || sleep < 0 ||
    !Number.isFinite(stress) || stress < 1 ||
    stress > 10 || heart > 250 || oxygen > 100 || sleep > 24
  ) {
    result.textContent = "Please enter valid readings.";
    return;
  }

  // Illustrative personal baseline
  const baseline = {
    heart: 72,
    oxygen: 98,
    sleep: 8,
    stress: 3
  };

  let flags = [];

  if (Math.abs(heart - baseline.heart) / baseline.heart > 0.15) {
    flags.push("Heart rate differs from the illustrative baseline.");
  }

  if (Math.abs(oxygen - baseline.oxygen) >= 2) {
    flags.push("Blood oxygen differs from the illustrative baseline.");
  }

  if (Math.abs(sleep - baseline.sleep) >= 1) {
    flags.push("Sleep duration differs from the illustrative baseline.");
  }

  if (stress - baseline.stress >= 3) {
    flags.push("Self-reported stress has increased.");
  }

  if (flags.length > 0) {
    title.textContent = "Changes detected";
    statusText.textContent = "Review the indicators below.";
    dot.style.color = "#ffbd69";
  } else {
    title.textContent = "No major deviations detected";
    statusText.textContent = "No selected thresholds were crossed.";
    dot.style.color = "#8ce9db";
  }

  result.innerHTML = `
    <div class="result-item">
      <span class="result-label">HEART RATE</span><br>
      ${heart} BPM
    </div>

    <div class="result-item">
      <span class="result-label">BLOOD OXYGEN</span><br>
      ${oxygen}%
    </div>

    <div class="result-item">
      <span class="result-label">SLEEP</span><br>
      ${sleep} hours
    </div>

    <div class="result-item">
      <span class="result-label">STRESS</span><br>
      ${stress}/10
    </div>

    <h3>Analysis</h3>

    ${flags.length
      ? flags.map(flag => `<p>⚠ ${flag}</p>`).join("")
      : "<p>✓ No selected baseline deviations detected.</p>"
    }

    <p>These are illustrative thresholds for demonstration,
    not clinically validated alerts or medical advice.</p>
  `;

});
