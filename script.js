// Simple front-end handler for the contact form (optional, can be extended)
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  // Integrate with an email API or Google Forms for real submission.
  this.reset();
});
window.addEventListener('DOMContentLoaded', () => {
  // Find the 3D container
  const container = document.getElementById('threejs-canvas');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.offsetWidth, 400);
  container.appendChild(renderer.domElement);

  // Geometry and material
  const geometry = new THREE.TorusKnotGeometry(60, 18, 100, 12);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera.position.z = 250;

  // Responsive resize
  window.addEventListener('resize', () => {
    const width = container.offsetWidth;
    camera.aspect = width / 400;
    camera.updateProjectionMatrix();
    renderer.setSize(width, 400);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});
