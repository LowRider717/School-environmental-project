document.querySelectorAll('.menu-button').forEach((button) => {
  button.addEventListener('click', () => {
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('open');
    button.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
});

document.querySelectorAll('.nav-links').forEach((navigation) => {
  const questLink = navigation.querySelector('.quest');
  if (questLink) {
    questLink.href = 'quest.html';
    questLink.textContent = 'Quest';
  }
  if (!navigation.querySelector('a[href="map.html"]')) {
    const mapLink = document.createElement('a');
    mapLink.href = 'map.html';
    mapLink.textContent = 'Map';
    navigation.insertBefore(mapLink, navigation.querySelector('.quest'));
  }
  ['index.html', 'research.html', 'tourism.html', 'map.html', 'glossary.html', 'quest.html'].forEach((href) => {
    const link = navigation.querySelector(`a[href="${href}"]`);
    if (link) navigation.append(link);
  });
});

document.querySelectorAll('img').forEach((image) => {
  if (image.alt.includes('Placeholder for a rare animal')) {
    image.src = 'Pics/moose-wildlife.jpg';
    image.alt = 'Moose in a forest, supplied project photograph';
  }
  if (image.alt.includes('Water, bridge and green shore')) {
    image.src = 'Pics/hydro-unit.jpg';
  }
  if (image.src.includes('hydro-unit.jpg')) image.classList.add('hydro-news');
});

const designGallery = document.querySelector('.gallery');
if (designGallery) {
  const forestColumn = document.createElement('div');
  forestColumn.className = 'forest-column';

  [
    ['Pics/winter-forest.jpg', 'Frost-covered mixed forest near Nizhne-Ivkino', 'Forest В· winter silence'],
    ['Pics/river-bank.jpg', 'Forest and river bank near Nizhne-Ivkino', 'Forest В· river bank']
  ].forEach(([src, alt, caption]) => {
    const item = document.createElement('figure');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${src}" alt="${alt}"><figcaption class="caption">${caption}</figcaption>`;
    forestColumn.append(item);
  });

  designGallery.append(forestColumn);
}

const latestNews = document.querySelector('.news-card.no-image .news-copy');
if (latestNews) {
  latestNews.querySelector('small').textContent = 'eco-friendly improvements';
  latestNews.querySelector('h3').textContent = 'Walking zones improved';
  latestNews.querySelector('p').textContent = 'The town improved walking zones, added bins, and created recreation areas. This reduces harm to the ecosystem and encourages people to respect nature.';
}

const imageViewer = document.createElement('div');
imageViewer.className = 'image-viewer';
imageViewer.hidden = true;
imageViewer.innerHTML = '<button class="image-viewer-close" type="button" aria-label="Close image">Г—</button><img alt="">';
document.body.append(imageViewer);

function closeImageViewer() {
  imageViewer.hidden = true;
  document.body.classList.remove('image-viewer-open');
}

document.addEventListener('click', (event) => {
  const image = event.target.closest('img');
  if (image && !imageViewer.contains(image)) {
    const viewerImage = imageViewer.querySelector('img');
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    imageViewer.hidden = false;
    document.body.classList.add('image-viewer-open');
  }

  if (event.target === imageViewer || event.target.closest('.image-viewer-close')) {
    closeImageViewer();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !imageViewer.hidden) closeImageViewer();
});

const glossaryTerms = [
  { term: 'Industrial plant', transcription: '[ЙЄnЛ€dКЊstriЙ™l plЙ‘Лђnt]', definition: 'A factory or other large building where goods are produced.' },
  { term: 'Natural monument', transcription: '[Л€nГ¦tКѓrЙ™l Л€mЙ’njКЉmЙ™nt]', definition: 'A natural feature or area protected because of its special value.' },
  { term: 'Residential district', transcription: '[ЛЊrezЙЄЛ€denКѓЙ™l Л€dЙЄstrЙЄkt]', definition: 'An area of a town where people live.' },
  { term: 'Unorganized tourism', transcription: '[КЊnЛ€Й”ЛђЙЎЙ™naЙЄzd Л€tКЉЙ™rЙЄzЙ™m]', definition: 'Travel without an organized group or a planned official route.' },
  { term: 'Foreign', transcription: '[Л€fЙ’rЙ™n]', definition: 'From another country.' },
  { term: 'Sporting', transcription: '[Л€spЙ”ЛђtЙЄЕ‹]', definition: 'Connected with sports or physical activities.' },
  { term: 'Flora', transcription: '[Л€flЙ”ЛђrЙ™]', definition: 'All the plants found in a particular area.' },
  { term: 'Fauna', transcription: '[Л€fЙ”ЛђnЙ™]', definition: 'All the animals found in a particular area.' },
  { term: 'Population', transcription: '[ЛЊpЙ’pjuЛ€leЙЄКѓЙ™n]', definition: 'All the animals or people living in a particular area.' },
  { term: 'Poaching', transcription: '[Л€pЙ™КЉtКѓЙЄЕ‹]', definition: 'Illegal hunting or catching of wild animals.' },
  { term: 'Floodplain', transcription: '[Л€flКЊdpleЙЄn]', definition: 'Flat land beside a river that can be covered by water during a flood.' },
  { term: 'Springs', transcription: '[sprЙЄЕ‹z]', definition: 'Places where water naturally flows out from the ground.' },
  { term: 'Endangered species', transcription: '[ЙЄnЛ€deЙЄndК’Й™d Л€spiЛђКѓiЛђz]', definition: 'Animals or plants that might die out.' },
  { term: 'Natural habitat', transcription: '[Л€nГ¦tКѓrЙ™l Л€hГ¦bЙЄtГ¦t]', definition: 'The place where an animal or plant naturally lives.' },
  { term: 'Survive', transcription: '[sЙ™Л€vaЙЄv]', definition: 'To stay alive.' },
  { term: 'Wetlands', transcription: '[Л€wЙ›t.lГ¦ndz]', definition: 'Land that is covered with water, such as marshes.' },
  { term: 'Pollution', transcription: '[pЙ™Л€luЛђКѓЙ™n]', definition: 'The action or state of making or being made dirty or poisonous, including air, water and soil.' },
  { term: 'Recycling', transcription: '[ЛЊriЛђЛ€saЙЄklЙЄЕ‹]', definition: 'The process of collecting and changing used materials into new products.' },
  { term: 'Toxic fumes', transcription: '[Л€tЙ’ksЙЄk fjuЛђmz]', definition: 'Poisonous gas emitted by factories.' },
  { term: 'Acid rain', transcription: '[Л€Г¦sЙЄd reЙЄn]', definition: 'Rain mixed with acids that damages trees and lakes.' },
  { term: 'Conservation', transcription: '[ЛЊkЙ’nsЙ™Л€veЙЄКѓЙ™n]', definition: 'Protecting animals and plants from being harmed.' },
  { term: 'Preserve', transcription: '[prЙЄЛ€zЙњЛђv]', definition: 'To keep something safe and protected.' },
  { term: 'Ecosystem', transcription: '[Л€iЛђkЙ™КЉЛЊsЙЄstЙ™m]', definition: 'A community of interacting organisms and their physical environment.' },
  { term: 'Volunteer', transcription: '[ЛЊvЙ’lЙ™nЛ€tЙЄЙ™]', definition: 'A person who works without pay to help people or the environment.' },
  { term: 'Recycle', transcription: '[riЛђЛ€saЙЄkЙ™l]', definition: 'To process used materials such as cans or paper so they can be used again.' },
  { term: 'Collect rubbish', transcription: '[kЙ™Л€lekt Л€rКЊbЙЄКѓ]', definition: 'To pick up waste and throw it away properly.' },
  { term: 'Protect', transcription: '[prЙ™Л€tekt]', definition: 'To keep someone or something safe from harm.' },
  { term: 'Solar power', transcription: '[Л€sЙ™КЉlЙ™ Л€paКЉЙ™]', definition: 'Energy from the sun, an environmentally friendly energy source.' },
  { term: 'Species extinction', transcription: '[Л€spiЛђКѓiЛђz ЙЄkЛ€stЙЄЕ‹kКѓЙ™n]', definition: 'When a whole species of animal or plant dies out.' },
  { term: 'Plant flowers / trees', transcription: '[plЙ‘Лђnt Л€flaКЉЙ™z / triЛђz]', definition: 'To put plants in the ground to help nature.' },
  { term: 'Natural environment', transcription: '[Л€nГ¦tКѓrЙ™l ЙЄnЛ€vaЙЄrЙ™nmЙ™nt]', definition: 'Nature as it exists without man-made changes.' },
  { term: 'Toxic', transcription: '[Л€tЙ’ksЙЄk]', definition: 'Poisonous, very harmful.' },
  { term: 'Habitat destruction', transcription: '[Л€hГ¦bЙЄtГ¦t dЙЄЛ€strКЊkКѓЙ™n]', definition: 'The process by which a natural habitat becomes incapable of supporting its native species.' }
];

const search = document.querySelector('#term-search');
if (search) {
  const termsGrid = document.querySelector('.terms');
  if (termsGrid) {
    termsGrid.innerHTML = glossaryTerms.map(({ term, transcription, definition }) => `
      <article class="term">
        <div class="term-header">
          <h3>${term}</h3>
          <span class="term-transcription">${transcription}</span>
        </div>
        <p>${definition}</p>
      </article>
    `).join('');
  }

  const terms = [...document.querySelectorAll('.term')];
  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.setAttribute('aria-label', 'Glossary pages');
  const emptyState = document.createElement('p');
  emptyState.className = 'empty';
  emptyState.textContent = 'No terms match your search.';
  emptyState.hidden = true;

  if (termsGrid) {
    termsGrid.insertAdjacentElement('afterend', emptyState);
    emptyState.insertAdjacentElement('afterend', pagination);
  }

  const pageSize = 6;
  let currentPage = 1;

  function renderGlossary() {
    const query = search.value.trim().toLowerCase();
    const filteredTerms = terms.filter((term) => term.textContent.toLowerCase().includes(query));
    const totalPages = Math.max(1, Math.ceil(filteredTerms.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);

    terms.forEach((term) => {
      term.hidden = true;
    });

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    filteredTerms.slice(start, end).forEach((term) => {
      term.hidden = false;
    });

    pagination.innerHTML = '';
    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'page-button';
    prevButton.textContent = 'в†ђ';
    prevButton.disabled = currentPage === 1 || filteredTerms.length === 0;
    prevButton.setAttribute('aria-label', 'Previous page');
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderGlossary();
      }
    });

    const status = document.createElement('span');
    status.className = 'page-status';
    status.textContent = filteredTerms.length === 0 ? '0 / 0' : `${currentPage} / ${totalPages}`;

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'page-button';
    nextButton.textContent = 'в†’';
    nextButton.disabled = currentPage === totalPages || filteredTerms.length === 0;
    nextButton.setAttribute('aria-label', 'Next page');
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage += 1;
        renderGlossary();
      }
    });

    pagination.append(prevButton, status, nextButton);
    pagination.hidden = filteredTerms.length <= pageSize;
    emptyState.hidden = filteredTerms.length !== 0;
  }

  search.addEventListener('input', () => {
    currentPage = 1;
    renderGlossary();
  });

  renderGlossary();
}
