let drankjeOp = false;

function init() {
  if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      document.getElementById("requestPermission").style.display = "block";
      document
        .getElementById("requestPermission")
        .addEventListener("click", function () {
          DeviceOrientationEvent.requestPermission()
            .then(function (permissionState) {
              if (permissionState === "granted") {
                window.addEventListener("deviceorientation", handleOrientation);
                document.getElementById("requestPermission").style.display =
                  "none";
              } else {
                document.getElementById("message").innerText =
                  "Permission denied";
              }
            })
            .catch(console.error);
        });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }
  } else {
    document.getElementById("message").innerText =
      "Apparaatoriëntatie niet ondersteund";
  }
}

function handleOrientation(event) {
  let beta = event.beta;
  if (beta > 90) beta = 90;
  if (beta < -90) beta = -90;
  if (!drankjeOp) {
    let beerLevel = (Math.abs(beta) / 90) * 100;
    document.getElementById("beer").style.height = beerLevel + "%";
    if (beerLevel <= 1) {
      document.getElementById("message").innerText = "Je hebt je drankje op!";
      drankjeOp = true;
      return;
    } else if (beerLevel >= 100) {
      document.getElementById("message").innerText = "Je glas is vol!";
    } else {
      document.getElementById("message").innerText =
        "Kantel je apparaat om te drinken!";
    }
  }

  let foamHeight = (beta + 90) / 12;
  document.querySelector(".foam").style.height = foamHeight + "%";
  let bubblesContainer = document.querySelector(".bubbles");
  bubblesContainer.innerHTML = "";
  let numBubbles = Math.round(Math.abs(beta) / 5);
  for (let i = 0; i < numBubbles; i++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.bottom = Math.random() * 100 + "%";
    bubblesContainer.appendChild(bubble);
  }
}

window.onload = init;
