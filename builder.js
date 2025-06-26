// Check if config is loaded
if (typeof config === 'undefined') {
  console.warn('Config not loaded. Loading default configuration...');
  const config = { allowedDomains: [] };
}

// Validate URLs against whitelist
function validateUrl(url, type = 'model') {
  if (!url) return { valid: true }; // Empty URLs are valid (optional fields)

  try {
    const urlHost = new URL(url).hostname;
    if (config.allowedDomains.length > 0 && !config.allowedDomains.includes(urlHost)) {
      return {
        valid: false,
        message: `${type} URL not allowed. Please use a URL from the whitelist.`
      };
    }
    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      message: `Invalid ${type} URL format`
    };
  }
}

// Improved validation feedback: use Bootstrap v5 classes
function addValidationFeedback(input, validation) {
  // Remove any existing feedback
  let feedback = input.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.remove();
  input.classList.remove('is-valid', 'is-invalid');

  // Only show error if the field is non-empty and invalid
  if (input.value && !validation.valid) {
    input.classList.add('is-invalid');
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = validation.message;
    input.parentElement.appendChild(feedback);
  } else if (input.value && validation.valid) {
    input.classList.add('is-valid');
  }
}

// Remove input event listeners for validation
// Only keep blur event listeners for validation feedback

document.getElementById('modelUrl').removeEventListener('input', function(){});
document.getElementById('usdzUrl').removeEventListener('input', function(){});

// Validation on blur only (already present)
document.getElementById('modelUrl').addEventListener('blur', function(e) {
  const validation = validateUrl(e.target.value, 'model');
  addValidationFeedback(e.target, validation);
});

document.getElementById('usdzUrl').addEventListener('blur', function(e) {
  const validation = validateUrl(e.target.value, 'USDZ');
  addValidationFeedback(e.target, validation);
});

// Validate all URLs and return overall validity
function validateAllUrls() {
  const modelUrl = document.getElementById('modelUrl').value;
  const usdzUrl = document.getElementById('usdzUrl').value;

  const modelValidation = validateUrl(modelUrl, 'model');
  const usdzValidation = validateUrl(usdzUrl, 'USDZ');

  // Add feedback for both fields
  addValidationFeedback(document.getElementById('modelUrl'), modelValidation);
  addValidationFeedback(document.getElementById('usdzUrl'), usdzValidation);

  // Return true only if all validations pass
  return modelValidation.valid && usdzValidation.valid;
}

// Update the generate embed code function to check URLs first
function generateEmbedCode() {
  // Validate all URLs before generating
  if (!validateAllUrls()) {
    // Show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'Please fix the URL validation errors before generating the embed code.';

    // Remove any existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add the error message
    document.querySelector('.embed-code-container').prepend(errorDiv);
    return;
  }

  // Rest of your existing generateEmbedCode function...
  // ... existing code ...
}