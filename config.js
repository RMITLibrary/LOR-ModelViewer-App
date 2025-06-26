/**
 * Configuration settings for the 3D Model Viewer Builder
 *
 * @property {string[]} allowedDomains - List of allowed domains for model URLs
 *   - Empty array: All domains allowed (default)
 *   - Populated array: Only listed domains allowed
 */
const config = {
    allowedDomains: [
        // Add your trusted domains here
        // 'models.rmit.edu.au',
        // 'cdn.rmit.edu.au'
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
}