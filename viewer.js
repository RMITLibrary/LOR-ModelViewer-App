// viewer.js
// All logic from the previous inline script in viewer.html

// Check if model-viewer is supported
function isModelViewerSupported() {
  return (
    "customElements" in window &&
    customElements.get("model-viewer") !== undefined
  );
}

// Show error message
function showError(message) {
  const container = document.getElementById("model-container");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = message;
  container.appendChild(errorDiv);
}

// Show loading message
function showLoading() {
  const container = document.getElementById("model-container");
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading";
  loadingDiv.textContent = "Loading 3D Model...";
  container.appendChild(loadingDiv);
}

// Load model-viewer script
function loadModelViewer() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error("Failed to load model-viewer script"));
    document.head.appendChild(script);
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Show loading state
    showLoading();

    // Load model-viewer if not already loaded
    if (!isModelViewerSupported()) {
      await loadModelViewer();
    }

    // Default configuration
    const defaults = {
      width: 16,
      height: 9,
      minZoom: 25,
      maxZoom: 200,
      fieldOfView: 45,
      minFieldOfView: 10,
      maxFieldOfView: 90,
      orbitSensitivity: 1,
      rotationSpeed: 30,
      autoRotate: true,
    };

    // Sanitise numeric values
    function sanitiseNumber(value, min, max, defaultValue) {
      const num = parseFloat(value);
      if (isNaN(num)) return defaultValue;
      return Math.min(Math.max(num, min), max);
    }

    // Get and sanitise URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Required parameters
    const modelUrl = urlParams.get("model");
    const title = urlParams.get("title");
    const description = urlParams.get("description");

    if (!modelUrl) {
      throw new Error("No model URL provided");
    }

    // Optional parameters with sanitisation
    const width = sanitiseNumber(
      urlParams.get("width"),
      1,
      100,
      defaults.width
    );
    const height = sanitiseNumber(
      urlParams.get("height"),
      1,
      100,
      defaults.height
    );
    const minZoom = sanitiseNumber(
      urlParams.get("minZoom"),
      10,
      100,
      defaults.minZoom
    );
    const maxZoom = sanitiseNumber(
      urlParams.get("maxZoom"),
      100,
      500,
      defaults.maxZoom
    );
    const fieldOfView = sanitiseNumber(
      urlParams.get("fieldOfView"),
      10,
      90,
      defaults.fieldOfView
    );
    const rotationSpeed = sanitiseNumber(
      urlParams.get("rotationSpeed"),
      0,
      360,
      defaults.rotationSpeed
    );
    const autoRotate = urlParams.get("autoRotate") !== "false";
    const arButton = urlParams.get("arButton") !== "false";
    const environmentImage = urlParams.get("environmentImage");
    const skyboxImage = urlParams.get("skyboxImage");
    const arButtonLabel = urlParams.get("arButtonLabel");
    const arPrompt = urlParams.get("arPrompt");
    const shadowIntensity = urlParams.get("shadowIntensity") !== null ? parseFloat(urlParams.get("shadowIntensity")) : 1;
    const altText = urlParams.get("alt");
    const a11yJson = urlParams.get("a11y");
    const usdzUrl = urlParams.get("usdz");

    // Set title if provided
    if (title) {
      document.title = decodeURIComponent(title);
    }

    // Validate model URL
    let validatedModelUrl;
    try {
      validatedModelUrl = new URL(modelUrl).toString();
    } catch (e) {
      throw new Error("Invalid model URL provided");
    }

    // Create model-viewer element
    const modelViewer = document.createElement("model-viewer");

    // Set all attributes
    modelViewer.setAttribute("id", "model-viewer");
    modelViewer.setAttribute("camera-controls", "");
    if (autoRotate) modelViewer.setAttribute("auto-rotate", "");
    modelViewer.setAttribute("min-camera-orbit", `auto auto ${minZoom}%`);
    modelViewer.setAttribute("max-camera-orbit", `auto auto ${maxZoom}%`);
    modelViewer.setAttribute("field-of-view", `${fieldOfView}deg`);
    modelViewer.setAttribute("rotation-per-second", `${rotationSpeed}deg`);
    modelViewer.setAttribute("touch-action", "pan-y pinch-zoom");
    modelViewer.setAttribute("interaction-prompt", "auto");
    modelViewer.setAttribute("interaction-prompt-style", "basic");
    modelViewer.setAttribute("interaction-prompt-threshold", "0");
    modelViewer.setAttribute("camera-orbit", "0deg 75deg 105%");
    modelViewer.setAttribute("min-field-of-view", "10deg");
    modelViewer.setAttribute("max-field-of-view", "90deg");
    modelViewer.setAttribute("interpolation-decay", "200");
    modelViewer.setAttribute("alt", altText || title || "3D model viewer");
    modelViewer.setAttribute("aria-label", title || "3D model viewer");
    modelViewer.setAttribute("src", validatedModelUrl);
    if (environmentImage) modelViewer.setAttribute("environment-image", environmentImage);
    if (skyboxImage) modelViewer.setAttribute("skybox-image", skyboxImage);
    modelViewer.setAttribute("shadow-intensity", isNaN(shadowIntensity) ? "1" : shadowIntensity.toString());
    if (usdzUrl) modelViewer.setAttribute("ios-src", usdzUrl);

    // AR button logic
    if (arButton) {
      modelViewer.setAttribute("ar", "");
      modelViewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");
      modelViewer.setAttribute("ar-scale", "fixed");
      modelViewer.setAttribute("ar-placement", "floor");
      if (arButtonLabel) {
        const arBtn = document.createElement("button");
        arBtn.setAttribute("slot", "ar-button");
        arBtn.textContent = arButtonLabel;
        modelViewer.appendChild(arBtn);
      }
      if (arPrompt) {
        const arPromptDiv = document.createElement("div");
        arPromptDiv.setAttribute("id", "ar-prompt");
        arPromptDiv.innerHTML = `<span>${arPrompt}</span>`;
        modelViewer.appendChild(arPromptDiv);
      }
    }

    // Add error handling for model loading
    modelViewer.addEventListener("error", (error) => {
      showError("Failed to load 3D model: " + error.message);
    });

    // Clear loading state and add viewer
    const container = document.getElementById("model-container");
    container.innerHTML = "";
    container.appendChild(modelViewer);

    // Set aspect ratio
    const ratio = (height / width) * 100;
    container.style.paddingBottom = `${ratio}%`;

    if (a11yJson) {
      try {
        const parsedA11y = JSON.parse(decodeURIComponent(a11yJson));
        modelViewer.a11y = parsedA11y;
      } catch (e) {
        // If JSON is invalid, fallback to no a11y
      }
    }
  } catch (error) {
    showError(error.message);
  }
});