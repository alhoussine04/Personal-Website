(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = document.getElementById('contact-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();
    const body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
    const mailto =
      'mailto:housinekhallil@gmail.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailto;

    if (status) {
      status.hidden = false;
    }
  });
})();
