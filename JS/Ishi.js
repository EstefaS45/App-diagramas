const contentData = [];

function addTitle() {
    const titleInput = document.getElementById('title-input');
    const titleText = titleInput.value.trim();

    if (titleText) {
        const titleObj = {
            title: titleText,
            subtitles: []
        };
        contentData.push(titleObj);

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = titleText;

        const subtitleInput = document.createElement('input');
        subtitleInput.type = 'text';
        subtitleInput.placeholder = 'Agregar subtítulo';

        const subtitleButton = document.createElement('button');
        subtitleButton.textContent = 'Agregar';
        subtitleButton.onclick = function() {
            addSubtitle(titleObj, titleElement, subtitleInput.value);
            subtitleInput.value = '';
        };

        titleElement.appendChild(subtitleInput);
        titleElement.appendChild(subtitleButton);

        const contentContainer = document.getElementById('content-container');
        contentContainer.appendChild(titleElement);

        titleInput.value = '';
    }
}

function addSubtitle(titleObj, titleElement, subtitleText) {
    if (subtitleText) {
        const subtitleObj = {
            subtitle: subtitleText,
            themes: []
        };
        titleObj.subtitles.push(subtitleObj);

        const subtitleElement = document.createElement('div');
        subtitleElement.classList.add('subtitle');
        subtitleElement.textContent = subtitleText;

        const themeInput = document.createElement('input');
        themeInput.type = 'text';
        themeInput.placeholder = 'Agregar tema';

        const themeButton = document.createElement('button');
        themeButton.textContent = 'Agregar';
        themeButton.onclick = function() {
            addTheme(subtitleObj, subtitleElement, themeInput.value);
            themeInput.value = '';
        };

        subtitleElement.appendChild(themeInput);
        subtitleElement.appendChild(themeButton);

        titleElement.appendChild(subtitleElement);
    }
}

function addTheme(subtitleObj, subtitleElement, themeText) {
    if (themeText) {
        subtitleObj.themes.push(themeText);

        const themeElement = document.createElement('div');
        themeElement.classList.add('theme');
        themeElement.textContent = themeText;

        subtitleElement.appendChild(themeElement);
    }
}

function generateDiagram() {
    const diagramContainer = document.getElementById('diagram-container');
    diagramContainer.innerHTML = '';

    const diagramList = document.createElement('ul');
    contentData.forEach(titleObj => {
        const titleItem = document.createElement('li');
        titleItem.textContent = titleObj.title;

        if (titleObj.subtitles.length > 0) {
            const subtitleList = document.createElement('ul');
            titleObj.subtitles.forEach(subtitleObj => {
                const subtitleItem = document.createElement('li');
                subtitleItem.textContent = subtitleObj.subtitle;

                if (subtitleObj.themes.length > 0) {
                    const themeList = document.createElement('ul');
                    subtitleObj.themes.forEach(theme => {
                        const themeItem = document.createElement('li');
                        themeItem.textContent = theme;
                        themeList.appendChild(themeItem);
                    });
                    subtitleItem.appendChild(themeList);
                }

                subtitleList.appendChild(subtitleItem);
            });
            titleItem.appendChild(subtitleList);
        }

        diagramList.appendChild(titleItem);
    });

    diagramContainer.appendChild(diagramList);
}
