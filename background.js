chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.settings?.newValue) {
        let message = {
            furigana: changes.settings.newValue.furigana,
            coloring: changes.settings.newValue.coloring,
            dictionary: changes.settings.newValue.dictionary
        }

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                console.log(response);
            });
        });
    }
});