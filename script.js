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
  ['index.html', 'research.html', 'tourism.html', 'map.html', 'dictionary.html', 'quest.html'].forEach((href) => {
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

const dictionaryTerms = [
  { term: 'Industrial plant', transcription: '[ɪnˈdʌstriəl plɑːnt]', definition: 'A factory or other large building where goods are produced.' },
  { term: 'Natural monument', transcription: '[ˈnætʃərəl ˈmɒnjʊmənt]', definition: 'A natural feature or area protected because of its special value.' },
  { term: 'Residential district', transcription: '[ˌrezɪˈdenʃəl ˈdɪstrɪkt]', definition: 'An area of a town where people live.' },
  { term: 'Unorganized tourism', transcription: '[ʌnˈɔːɡənaɪzd ˈtʊərɪzəm]', definition: 'Travel without an organized group or a planned official route.' },
  { term: 'Foreign', transcription: '[ˈfɒrən]', definition: 'From another country.' },
  { term: 'Sporting', transcription: '[ˈspɔːtɪŋ]', definition: 'Connected with sports or physical activities.' },
  { term: 'Flora', transcription: '[ˈflɔːrə]', definition: 'All the plants found in a particular area.' },
  { term: 'Fauna', transcription: '[ˈfɔːnə]', definition: 'All the animals found in a particular area.' },
  { term: 'Population', transcription: '[ˌpɒpjʊˈleɪʃən]', definition: 'All the animals or people living in a particular area.' },
  { term: 'Poaching', transcription: '[ˈpəʊtʃɪŋ]', definition: 'Illegal hunting or catching of wild animals.' },
  { term: 'Floodplain', transcription: '[ˈflʌdpleɪn]', definition: 'Flat land beside a river that can be covered by water during a flood.' },
  { term: 'Springs', transcription: '[sprɪŋz]', definition: 'Places where water naturally flows out from the ground.' },
  { term: 'Endangered species', transcription: '[ɪnˈdeɪndʒəd ˈspiːʃiːz]', definition: 'Animals or plants that might die out.' },
  { term: 'Natural habitat', transcription: '[ˈnætʃərəl ˈhæbɪtæt]', definition: 'The place where an animal or plant naturally lives.' },
  { term: 'Survive', transcription: '[səˈvaɪv]', definition: 'To stay alive.' },
  { term: 'Wetlands', transcription: '[ˈwetləndz]', definition: 'Land that is covered with water, such as marshes.' },
  { term: 'Pollution', transcription: '[pəˈluːʃən]', definition: 'The action or state of making or being made dirty or poisonous, including air, water and soil.' },
  { term: 'Recycling', transcription: '[ˌriːˈsaɪklɪŋ]', definition: 'The process of collecting and changing used materials into new products.' },
  { term: 'Toxic fumes', transcription: '[ˈtɒksɪk fjuːmz]', definition: 'Poisonous gas emitted by factories.' },
  { term: 'Acid rain', transcription: '[ˈæsɪd reɪn]', definition: 'Rain mixed with acids that damages trees and lakes.' },
  { term: 'Conservation', transcription: '[ˌkɒnsəˈveɪʃən]', definition: 'Protecting animals and plants from being harmed.' },
  { term: 'Preserve', transcription: '[prɪˈzɜːv]', definition: 'To keep something safe and protected.' },
  { term: 'Ecosystem', transcription: '[ˈiːkəʊˌsɪstəm]', definition: 'A community of interacting organisms and their physical environment.' },
  { term: 'Volunteer', transcription: '[ˌvɒlənˈtɪə]', definition: 'A person who works without pay to help people or the environment.' },
  { term: 'Recycle', transcription: '[ˌriːˈsaɪkəl]', definition: 'To process used materials such as cans or paper so they can be used again.' },
  { term: 'Collect rubbish', transcription: '[kəˈlekt ˈrʌbɪʃ]', definition: 'To pick up waste and throw it away properly.' },
  { term: 'Protect', transcription: '[prəˈtekt]', definition: 'To keep someone or something safe from harm.' },
  { term: 'Solar power', transcription: '[ˈsəʊlə ˈpaʊə]', definition: 'Energy from the sun, an environmentally friendly energy source.' },
  { term: 'Species extinction', transcription: '[ˈspiːʃiːz ɪkˈstɪŋkʃən]', definition: 'When a whole species of animal or plant dies out.' },
  { term: 'Plant flowers / trees', transcription: '[plɑːnt ˈflaʊəz / triːz]', definition: 'To put plants in the ground to help nature.' },
  { term: 'Natural environment', transcription: '[ˈnætʃərəl ɪnˈvaɪərənmənt]', definition: 'Nature as it exists without man-made changes.' },
  { term: 'Toxic', transcription: '[ˈtɒksɪk]', definition: 'Poisonous, very harmful.' },
  { term: 'Habitat destruction', transcription: '[ˈhæbɪtæt dɪˈstrʌkʃən]', definition: 'The process by which a natural habitat becomes incapable of supporting its native species.' }
];

const search = document.querySelector('#term-search');
if (search) {
  const termsGrid = document.querySelector('.terms');
  if (termsGrid) {
    termsGrid.innerHTML = dictionaryTerms.map(({ term, transcription, definition }) => `
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
  pagination.setAttribute('aria-label', 'Dictionary pages');
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

  function renderDictionary() {
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
    prevButton.textContent = '←';
    prevButton.disabled = currentPage === 1 || filteredTerms.length === 0;
    prevButton.setAttribute('aria-label', 'Previous page');
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderDictionary();
      }
    });

    const status = document.createElement('span');
    status.className = 'page-status';
    status.textContent = filteredTerms.length === 0 ? '0 / 0' : `${currentPage} / ${totalPages}`;

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'page-button';
    nextButton.textContent = '→';
    nextButton.disabled = currentPage === totalPages || filteredTerms.length === 0;
    nextButton.setAttribute('aria-label', 'Next page');
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage += 1;
        renderDictionary();
      }
    });

    pagination.append(prevButton, status, nextButton);
    pagination.hidden = filteredTerms.length <= pageSize;
    emptyState.hidden = filteredTerms.length !== 0;
  }

  search.addEventListener('input', () => {
    currentPage = 1;
    renderDictionary();
  });

  renderDictionary();
}
