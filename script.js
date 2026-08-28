document.querySelectorAll('.menu-button').forEach((button) => {
  button.addEventListener('click', () => {
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('open');
    button.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
});

const mojibakeReplacements = {
  'Р’В·': '·',
  'РІВВ°': '☰'
};
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let textNode;
while ((textNode = textWalker.nextNode())) {
  Object.entries(mojibakeReplacements).forEach(([broken, fixed]) => {
    textNode.nodeValue = textNode.nodeValue.replaceAll(broken, fixed);
  });
}

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
  ['index.html', 'research.html', 'design.html', 'tourism.html', 'map.html', 'glossary.html', 'quest.html'].forEach((href) => {
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
  if (image.src.includes('hydro-unit.jpg')) {
    image.src = 'Pics/гидроузел.png';
    image.classList.add('hydro-news');
  }
});

const designGallery = document.querySelector('.gallery');
if (designGallery) {
  const forestColumn = document.createElement('div');
  forestColumn.className = 'forest-column';

  [
    ['Pics/winter-forest.jpg', 'Frost-covered mixed forest near Nizhne-Ivkino', 'Forest · winter silence'],
    ['Pics/river-bank.jpg', 'Forest and river bank near Nizhne-Ivkino', 'Forest · river bank']
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
imageViewer.innerHTML = '<button class="image-viewer-close" type="button" aria-label="Close image">×</button><img alt="">';
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

const translations = {
  'School environmental project': 'Школьный экологический проект',
  'Living': 'Живая', 'territory': 'территория', Explore: 'Исследовать',
  'Where water meets the forest': 'Место, где вода встречается с лесом',
  'Territory news': 'Новости территории',
  'Small changes that help preserve the natural environment.': 'Небольшие изменения, которые помогают сохранить природную среду.',
  'Story of the place': 'История места', 'Video story coming soon': 'Видео-повествование скоро появится',
  'Research team': 'Исследовательская группа',
  'Who lives': 'Кто живёт', 'in this forest?': 'в этом лесу?',
  'Rare plants': 'Редкие растения', 'Rare animals': 'Редкие животные', 'Four threats': 'Четыре угрозы',
  Flora: 'Флора', Fauna: 'Фауна', Ecology: 'Экология',
  'Visual direction': 'Визуальная часть',
  'See the place': 'Показать', 'through images': 'место взглядом', 'Project archive': 'Архив проекта',
  'Nature photography and local materials come together in one calm gallery.': 'Изображения природы и локальные материалы собраны в одной спокойной галерее.',
  'Route map': 'Карта маршрута', 'Project materials': 'Материалы проекта',
  'Guidebook': 'Путеводитель', 'Walk gently': 'Идти бережно',
  'Route 01': 'Маршрут 01', 'Route 02': 'Маршрут 02',
  'From the sanatorium to the springs': 'От санатория к источникам', 'A quiet walk': 'Тихая прогулка',
  'Before you go': 'Перед выходом', 'Daylight': 'Световой день', 'Leave no trace': 'Без следов', 'Respect the place': 'Внимание к месту',
  'English · Ecology': 'English · Русский', 'Words': 'Слова', 'that protect': 'которые защищают',
  'Search the glossary': 'Поиск по словарю', 'For example, habitat': 'Например, habitat',
  'No terms match your search.': 'По этому запросу терминов не найдено.',
  'Home': 'Главная', Research: 'Исследования', Design: 'Дизайн', Ecotourism: 'Экотуризм', Glossary: 'Словарь',
  Map: 'Карта',
  'Quest (soon)': 'Квест (скоро)',
  'River between green banks': 'Река среди зелёных берегов', 'Forest path in sunlight': 'Лесная дорожка и солнечный свет',
  '2021 · water': '2021 · вода', 'local community': 'местное сообщество',
  'Hydro-unit on the Ivkina River repaired': 'Гидроузел на реке Ивкина отремонтирован',
  'Water-release structures were updated and the pond bed near the beach was cleaned.': 'Обновлены водосбросные сооружения и очищено дно пруда у пляжа.',
  'Silver Spring brings people together': '«Серебряный родник» объединяет жителей',
  'A cleanup around the spring and nearby paths helps keep the routes clean.': 'Уборка вокруг родника и ближайших дорожек помогает поддерживать чистоту маршрутов.',
  'Light in a coniferous forest': 'Свет в хвойном лесу', 'Bird perched on a branch in nature': 'Птица на ветке в природе',
  'Forest path leading to water': 'Тропинка через лес к воде',
  'Trail beside a river and waterfall': 'Тропа вдоль реки и водопад', 'Deer in a forest clearing': 'Олень в лесу на солнечной поляне',
  'A nature project about Nizhne-Ivkino · sources: INFO.txt and INFO2.txt': 'Проект о природе Нижнеивкино · материалы: INFO.txt и INFO2.txt',
  'Research page · Nizhne-Ivkino': 'Исследовательская страница · Нижне-Ивкино',
  'Visual project archive': 'Визуальная часть проекта',
  'Guidebook · coordinates: 58.198331, 49.515583': 'Путеводитель · координаты: 58.198331, 49.515583',
  'Environmental glossary · based on INFO.txt': 'Экологический словарь · составлен по материалам INFO.txt',
  'Nizhne-Ivkino is located in the Kumyon District of the Kirov Region. The Ivkina River, springs and mixed forests create a place for observation and careful recreation.': 'Нижнеивкино находится в Кумёнском районе Кировской области. Река Ивкина, источники и смешанные леса образуют пространство для наблюдения и бережного отдыха.',
  "Lady's slipper, Calypso orchid and bird's-nest orchid are associated with damp, shady forests.": 'Венерин башмачок, калипсо луковичная и гнездовка настоящая связаны с влажными, тенистыми лесами.',
  'White-tailed eagle, lesser spotted eagle, barn owl, beaver, garden dormouse and Apollo need protected habitats.': 'Орлан-белохвост, осоед, сипуха, бобр, садовая соня и аполлон требуют сохранения своих местообитаний.',
  'Habitat loss, pollution, illegal hunting and excessive tourism pressure disturb the natural balance.': 'Потеря местообитаний, загрязнение, незаконная охота и слишком сильная туристическая нагрузка нарушают баланс.',
  'Postcard · forest light': 'Открытка · лесной свет', 'Poster · territory begins at the horizon': 'Постер · территория начинается с горизонта',
  'QR block for a future interactive map link.': 'QR-блок для будущей ссылки на интерактивную карту.',
  'QR block for the presentation and research files.': 'QR-блок для презентации и исследовательских файлов.',
  'The springs are on the left bank of the Ivkina River, below the bridge near the settlement. Here are a route and guidelines for a thoughtful visit.': 'Источники находятся на левом берегу реки Ивкина, ниже моста у посёлка. Здесь собраны маршрут и правила для внимательного путешествия.',
  'Follow the path along the Ivkina to the rotunda. The springs are about a five-minute walk from there; signs mark the locations.': 'Идите по дорожке вдоль Ивкины до ротонды. От неё до источников около пяти минут пешком; на месте установлены таблички.',
  'Follow the maintained park area with paths, benches and evening lighting to the rotunda.': 'Пройдите по благоустроенной парковой зоне с дорожками, скамейками и вечерним освещением до ротонды.',
  'The springs and river do not freeze even in winter. Plan your visit around the weather and daylight.': 'Источники и река не замерзают даже зимой. Планируйте визит с учётом погоды и светового дня.',
  'Visit the springs during daylight hours.': 'Посещайте источники в светлое время суток.', 'Do not litter or damage plants and infrastructure.': 'Не мусорьте, не повреждайте растения и инфраструктуру.', 'Do not disrupt natural processes.': 'Не нарушайте естественный ход природных процессов.',
  'Search in English and build your own environmental vocabulary.': 'Ищите термин и соберите собственный экологический словарь.',
  'Animals or plants that might die out.': 'Животные или растения, которые могут исчезнуть.', 'The place where an animal or plant naturally lives.': 'Место, где животное или растение живёт естественно.', 'Land covered with water, such as marshes.': 'Земля, покрытая водой, например болота.', 'Protecting animals and plants from harm.': 'Защита животных и растений от вреда.', 'A community of organisms and their physical environment.': 'Сообщество организмов и среда, в которой они взаимодействуют.', 'The action of making air, water or soil dirty or poisonous.': 'Ухудшение состояния воздуха, воды или почвы.', 'The process by which a natural habitat can no longer support its native species.': 'Процесс, при котором территория больше не поддерживает местные виды.', 'To process used materials so they can be used again.': 'Перерабатывать использованные материалы, чтобы использовать их снова.', 'A person who works without pay to help people or the environment.': 'Человек, который без оплаты помогает людям или окружающей среде.',
  'eco-friendly improvements': 'экологические улучшения', 'Walking zones improved': 'Прогулочные зоны улучшены',
  'The town improved walking zones, added bins, and created recreation areas. This reduces harm to the ecosystem and encourages people to respect nature.': 'В посёлке благоустроили прогулочные зоны, установили урны и создали места для отдыха. Это уменьшает вред для экосистемы и помогает людям бережнее относиться к природе.',
  Language: 'Язык'
};

const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([english, russian]) => [russian, english]));
const languageLabels = { en: 'EN', ru: 'RU' };

function translatePage(language) {
  const dictionary = language === 'ru' ? translations : reverseTranslations;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    const value = textNode.nodeValue.trim();
    if (dictionary[value]) textNode.nodeValue = textNode.nodeValue.replace(value, dictionary[value]);
  }
  document.querySelectorAll('body *').forEach((element) => {
    if (element.children.length === 0 && dictionary[element.textContent.trim()]) {
      element.textContent = dictionary[element.textContent.trim()];
    }
    ['alt', 'aria-label', 'placeholder'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && dictionary[value]) element.setAttribute(attribute, dictionary[value]);
    });
  });
  document.documentElement.lang = language;
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.classList.toggle('active', button.dataset.language === language);
  });
  localStorage.setItem('site-language', language);
}

const footer = document.querySelector('footer');
if (footer) {
  const sourcesLink = document.createElement('a');
  sourcesLink.className = 'footer-sources';
  sourcesLink.href = 'sources.html';
  sourcesLink.textContent = 'Sources';
  footer.prepend(sourcesLink);
}

const glossaryTerms = [
  { term: 'Industrial plant', transcription: '[ɪnˈdʌstriəl plɑːnt]', definition: 'A factory or other large building where goods are produced.' },
  { term: 'Natural monument', transcription: '[ˈnætʃrəl ˈmɒnjʊmənt]', definition: 'A natural feature or area protected because of its special value.' },
  { term: 'Residential district', transcription: '[ˌrezɪˈdenʃəl ˈdɪstrɪkt]', definition: 'An area of a town where people live.' },
  { term: 'Unorganized tourism', transcription: '[ʌnˈɔːɡənaɪzd ˈtʊərɪzəm]', definition: 'Travel without an organized group or a planned official route.' },
  { term: 'Foreign', transcription: '[ˈfɒrən]', definition: 'From another country.' },
  { term: 'Sporting', transcription: '[ˈspɔːtɪŋ]', definition: 'Connected with sports or physical activities.' },
  { term: 'Flora', transcription: '[ˈflɔːrə]', definition: 'All the plants found in a particular area.' },
  { term: 'Fauna', transcription: '[ˈfɔːnə]', definition: 'All the animals found in a particular area.' },
  { term: 'Population', transcription: '[ˌpɒpjuˈleɪʃən]', definition: 'All the animals or people living in a particular area.' },
  { term: 'Poaching', transcription: '[ˈpəʊtʃɪŋ]', definition: 'Illegal hunting or catching of wild animals.' },
  { term: 'Floodplain', transcription: '[ˈflʌdpleɪn]', definition: 'Flat land beside a river that can be covered by water during a flood.' },
  { term: 'Springs', transcription: '[sprɪŋz]', definition: 'Places where water naturally flows out from the ground.' },
  { term: 'Endangered species', transcription: '[ɪnˈdeɪndʒəd ˈspiːʃiːz]', definition: 'Animals or plants that might die out.' },
  { term: 'Natural habitat', transcription: '[ˈnætʃrəl ˈhæbɪtæt]', definition: 'The place where an animal or plant naturally lives.' },
  { term: 'Survive', transcription: '[səˈvaɪv]', definition: 'To stay alive.' },
  { term: 'Wetlands', transcription: '[ˈwɛt.lændz]', definition: 'Land that is covered with water, such as marshes.' },
  { term: 'Pollution', transcription: '[pəˈluːʃən]', definition: 'The action or state of making or being made dirty or poisonous, including air, water and soil.' },
  { term: 'Recycling', transcription: '[ˌriːˈsaɪklɪŋ]', definition: 'The process of collecting and changing used materials into new products.' },
  { term: 'Toxic fumes', transcription: '[ˈtɒksɪk fjuːmz]', definition: 'Poisonous gas emitted by factories.' },
  { term: 'Acid rain', transcription: '[ˈæsɪd reɪn]', definition: 'Rain mixed with acids that damages trees and lakes.' },
  { term: 'Conservation', transcription: '[ˌkɒnsəˈveɪʃən]', definition: 'Protecting animals and plants from being harmed.' },
  { term: 'Preserve', transcription: '[prɪˈzɜːv]', definition: 'To keep something safe and protected.' },
  { term: 'Ecosystem', transcription: '[ˈiːkəʊˌsɪstəm]', definition: 'A community of interacting organisms and their physical environment.' },
  { term: 'Volunteer', transcription: '[ˌvɒlənˈtɪə]', definition: 'A person who works without pay to help people or the environment.' },
  { term: 'Recycle', transcription: '[riːˈsaɪkəl]', definition: 'To process used materials such as cans or paper so they can be used again.' },
  { term: 'Collect rubbish', transcription: '[kəˈlekt ˈrʌbɪʃ]', definition: 'To pick up waste and throw it away properly.' },
  { term: 'Protect', transcription: '[prəˈtekt]', definition: 'To keep someone or something safe from harm.' },
  { term: 'Solar power', transcription: '[ˈsəʊlə ˈpaʊə]', definition: 'Energy from the sun, an environmentally friendly energy source.' },
  { term: 'Species extinction', transcription: '[ˈspiːʃiːz ɪkˈstɪŋkʃən]', definition: 'When a whole species of animal or plant dies out.' },
  { term: 'Plant flowers / trees', transcription: '[plɑːnt ˈflaʊəz / triːz]', definition: 'To put plants in the ground to help nature.' },
  { term: 'Natural environment', transcription: '[ˈnætʃrəl ɪnˈvaɪrənmənt]', definition: 'Nature as it exists without man-made changes.' },
  { term: 'Toxic', transcription: '[ˈtɒksɪk]', definition: 'Poisonous, very harmful.' },
  { term: 'Habitat destruction', transcription: '[ˈhæbɪtæt dɪˈstrʌkʃən]', definition: 'The process by which a natural habitat becomes incapable of supporting its native species.' }
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
    prevButton.textContent = '←';
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
    nextButton.textContent = '→';
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