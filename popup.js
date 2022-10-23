'use strict';

const settings = {
    furigana: true,
    coloring: true,
    dictionary: true
};

chrome.storage.sync.get('settings', (data) => {
    Object.assign(settings, data.settings);
    settingsForm.furigana.checked = Boolean(settings.furigana);
    settingsForm.coloring.checked = Boolean(settings.coloring);
    settingsForm.dictionary.checked = Boolean(settings.dictionary);
});

settingsForm.furigana.addEventListener('change', (event) => {
    settings.furigana = event.target.checked;
    chrome.storage.sync.set({settings});
});

settingsForm.coloring.addEventListener('change', (event) => {
    settings.coloring = event.target.checked;
    chrome.storage.sync.set({settings});
});

settingsForm.dictionary.addEventListener('change', (event) => {
    settings.dictionary = event.target.checked;
    chrome.storage.sync.set({settings});
});