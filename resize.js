// Handle iframe resizing for Canvas/LTI integration
window.addEventListener('load', function() {
    function sendHeight() {
        const height = document.body.scrollHeight;
        window.parent.postMessage({
            subject: 'lti.frameResize',
            height: height
        }, '*');
    }

    // Send initial height
    sendHeight();

    // Send height on window resize
    window.addEventListener('resize', sendHeight);

    // Send height when model loads
    const modelViewer = document.getElementById('model-viewer');
    if (modelViewer) {
        modelViewer.addEventListener('load', sendHeight);
    }
});