const form = document.getElementById('guest-form');
const reviewSection = document.getElementById('review-section');
const sentSection = document.getElementById('sent-section');
const invitationCard = document.getElementById('invitation-card');
const confirmButton = document.getElementById('confirm-button');
const editButton = document.getElementById('edit-button');
const sentMessage = document.getElementById('sent-message');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

const navLinks = document.querySelectorAll('.topnav a');
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

let currentGuest = {};

function buildInvitationHtml(guest) {
  return `
    <h3>Dear ${guest.name},</h3>
    <p>We are delighted to invite you and your party of ${guest.count} to celebrate our wedding day.</p>
    <p><strong>Event:</strong> Saturday, July 4 · 5:00 PM</p>
    <p><strong>Location:</strong> Champions Event Center Ikpokpan</p>
    ${guest.message ? `<p>“${guest.message}”</p>` : ''}
    <p>Please let us know if you will join us for dinner, music and celebration.</p>
  `;
}

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const count = document.getElementById('guestCount').value;
    const message = document.getElementById('guestMessage').value.trim();

    currentGuest = { name, email, count, message };
    invitationCard.innerHTML = buildInvitationHtml(currentGuest);
    reviewSection.classList.remove('hidden');
    sentSection.classList.add('hidden');
    invitationCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (confirmButton) {
  confirmButton.addEventListener('click', () => {
    reviewSection.classList.add('hidden');

    // Build email content and open user's mail client using mailto
    const to = 'saliuadamsweb@gmail.com';
    const subject = `RSVP from ${currentGuest.name || 'Guest'}`;
    const bodyLines = [];
    bodyLines.push(`Name: ${currentGuest.name || ''}`);
    bodyLines.push(`Email: ${currentGuest.email || ''}`);
    bodyLines.push(`Number of guests: ${currentGuest.count || ''}`);
    bodyLines.push(`Event: Saturday, July 4 · 5:00 PM`);
    bodyLines.push(`Location: Champions Event Center Ikpokpan`);
    if (currentGuest.message) bodyLines.push(`Message: ${currentGuest.message}`);
    bodyLines.push('\n--\nSent from wedding website');
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    // Open mail client
    window.location.href = mailto;

    // Show confirmation UI
    if (sentSection && sentMessage) {
      sentSection.classList.remove('hidden');
      sentMessage.textContent = `RSVP prepared for ${currentGuest.name}. Please send the email from your mail client to complete.`;
    } else {
      alert(`RSVP prepared for ${currentGuest.name}. Please send the email from your mail client.`);
    }
  });
}

if (editButton) {
  editButton.addEventListener('click', () => {
    reviewSection.classList.add('hidden');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function openLightbox(image) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt || 'Gallery image';
  lightbox.classList.remove('hidden');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lightboxImg) {
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }
}

const galleryImages = document.querySelectorAll('.gallery-grid img, .couple-photos img');
galleryImages.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(img));
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
