document.addEventListener('DOMContentLoaded', function () {
  const splideVideo = new Splide('#video-carousel', { type: 'loop', i18n: { prev: 'Previous slide', next: 'Next slide', } });
  const splideBanner = new Splide('#banner-carousel', { type: 'loop', autoplay: 'play', resetProgress: false, interval: 12000 });

  splideVideo.mount();
  splideBanner.mount();
});

const btn = document.getElementById('mob-menu-btn');
btn.addEventListener('click', () => {
  btn.classList.toggle('active');
  btn.classList.toggle('not-active');
  btn.querySelector('i').classList.toggle('fa-bars');
  btn.querySelector('i').classList.toggle('fa-xmark');
});
document.addEventListener('DOMContentLoaded', function () {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
      const testimonialsList = document.querySelector('.testimonials-list');
      testimonialsList.innerHTML = '';
      data.forEach((item, idx) => {
        if (idx < 9) {
          testimonialsList.innerHTML += `<li class="testimonials-item splide__slide"><div class="w-11/12 p-4 flex flex-col gap-4 justify-center items-center border border-zinc-700 rounded-3xl"><h4 class="testimonials-person text-2xl font-serif">${item.email}</h4><img class="testimonials-avatar rounded-full border-4 border-stone-600/75" src="https://randomuser.me/api/portraits/women/${idx++}.jpg" alt="${item.email}" width="160"><p class="testimonials-comment text-lg">${item.body}</p></div></li>`;

        }
      });
      const splideTestimonials = new Splide('#testimonials-carousel', { type: 'loop', autoplay: 'play', resetProgress: false, perPage: 3, interval: 12000 });
      splideTestimonials.mount();
    })
    .catch(err => console.log(err));
});

const contactsForm = document.getElementById('contacts-form');

contactsForm.addEventListener('submit', (evt) => {
  // evt.preventDefault();
  const username = contactsForm.querySelector('#full-name');
  const email = contactsForm.querySelector('#email');
  const phone = contactsForm.querySelector('#phone-number');
  const message = contactsForm.querySelector('#message');
  const terms = contactsForm.querySelector('#policy');

  const formData = {
    [username.name]: username.value,
    [email.name]: email.value,
    [phone.name]: phone.value,
    [message.name]: message.value,
    [terms.name]: terms.value
  };

  fetch('/contact', {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      contactsForm.style.display = 'none';
      const sectionContacts = document.getElementById('contacts');
      sectionContacts.innerHTML += `<div class="container mx-auto p-6 w-full xl:w-1/2 py-16 text-5xl font-serif text-center bg-gradient-to-b from-zinc-800 rounded-3xl"><p class="mb-6">Response Status: <span class="text-rose-500 font-semibold">${data.status}</span></p><p class="text-4xl">Response Text: ${data.error}</p></div>`;
    })
    .catch(error => console.log(error));

  console.log(formData);
});