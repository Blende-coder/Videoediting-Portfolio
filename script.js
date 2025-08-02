// Simple front-end handler for the contact form (optional, can be extended)
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  // Integrate with an email API or Google Forms for real submission.
  this.reset();
});
