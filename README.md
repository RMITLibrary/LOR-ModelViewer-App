# 3D Model Viewer Builder

A modern, open source web tool for generating accessible, embeddable 3D model viewers using [Google Model Viewer](https://modelviewer.dev/). Designed for educators, content creators, and developers to easily create iframe embed codes for interactive 3D models, with support for AR (including iOS Quick Look), accessibility, and local environment/skybox images.

**Important:**
To use the generated embed code and ensure the 3D viewer works for everyone, this project (including the viewer and any 3D model or image assets) must be hosted on a publicly accessible web server. Local files or localhost URLs will not work for embedding in other sites or for sharing with others. Please deploy the entire project to a web host or cloud service (such as GitHub Pages, Netlify, Vercel, or your institution's web server).

---

## Features
- **Live Builder UI**: Configure model, title, description, aspect ratio, lighting, skybox, AR, accessibility, and more.
- **Live Preview**: See exactly how your embed will look and behave.
- **Embed Code Generator**: One-click copy of a ready-to-use iframe code.
- **AR Support**: Enable AR on Android and iOS (with USDZ file support for iOS Quick Look).
- **Accessibility**: Add alt text and a11y JSON for screen readers and improved navigation.
- **Custom Lighting & Skybox**: Use local JPG images for environment and skybox backgrounds.
- **Shadow & Zoom Controls**: Fine-tune shadow intensity and zoom behavior.
- **Open Source**: MIT licensed, easy to extend and contribute.

---

## Tools & Technologies Used
- [Google Model Viewer](https://modelviewer.dev/) (Web Component)
- HTML5, CSS3, JavaScript (Vanilla, no frameworks)
- [KhronosGroup](https://github.com/KhronosGroup/glTF-Sample-Environments) for sample environment/skybox images

---

## Getting Started

### 1. **Clone or Download**
```sh
git clone https://github.com/yourusername/3d-model-viewer-builder.git
cd 3d-model-viewer-builder
```
Or download the ZIP and extract it.

### 2. **Run Locally**
You can use any static file server. For example, with Python:
```sh
python3 -m http.server
```
Then open [http://localhost:8000/builder.html](http://localhost:8000/builder.html) in your browser.

### 3. **Usage**
- Open `builder.html` in your browser.
- Fill in the required fields (Model URL, etc.).
- Adjust advanced and accessibility settings as needed.
- Copy the generated embed code and use it in your website, LMS, or CMS.
- Use the live preview to test your configuration.

### 4. **AR & iOS Support**
- To enable AR on iOS, provide a USDZ file URL in the "USDZ File URL" field when AR is enabled.
- The builder will add the correct `ios-src` attribute for iOS Quick Look.

### 5. **Accessibility**
- Use the Accessibility tab to add alt text and a11y JSON for screen readers.
- Example a11y JSON:
  ```json
  {
    "front": "The front of the 3D model.",
    "back": "The back of the 3D model."
  }
  ```

### 6. **Local Assets**
- JPG images for environment and skybox backgrounds are included in the `assets/` directory.
- You can add your own JPGs to this folder and they will appear in the builder dropdowns.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add new feature' && git push origin feature/your-feature`)
5. Open a pull request

Please ensure your code is clean, well-documented, and tested.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Credits & Attribution
- [Google Model Viewer](https://modelviewer.dev/)
- [KhronosGroup](https://github.com/KhronosGroup/glTF-Sample-Environments) for sample HDRI/JPG images
- [Duck.glb sample model](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb)

---

## Questions or Support?
Open an issue or start a discussion on GitHub!


### © RMIT University Library

###### Developed by RMIT Library Digital Learning

## Contact

- Contact: Karl Ervine ([karl.ervine@rmit.edu.au](mailto:karl.ervine@rmit.edu.au))
- Repo Admin: Jack Dunstan ([jack.dunstan@rmit.edu.au](mailto:jack.dunstan@rmit.edu.au))
- Additional Contact: [digital.learning.library@rmit.edu.au](mailto:digital.learning.library@rmit.edu.au)

## Resources

- [Active RMIT Library GitHub](https://github.com/RMITLibrary)
- [Archived RMIT Library GitHub](https://github.com/RMITLibrary-Archived)