const search = document.getElementById('btn');
const mainContainer = document.querySelector('main');

function speakWord(word) {
    const speak = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(speak);
}

search.addEventListener('click', () => {
    const searchTerm = document.getElementById('search-term').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
            const existingResultSection = document.getElementById('result-section');
            if (existingResultSection) {
                existingResultSection.remove();
            }

            const resultSection = document.createElement('section');
            resultSection.id = 'result-section';
            resultSection.className = 'h-screen flex flex-col  border-t border-gray-300';


            const resultContent = document.createElement('div');
            resultContent.id = 'result-content';
            resultContent.className = 'mt-20 mx-4'
            resultSection.appendChild(resultContent);

            if (Array.isArray(data) && data.length > 0) {
                const v_word = data[0].word;
                const meanings = data[0].meanings;

                const wordElement = document.createElement('span');
                wordElement.className = 'inline-flex gap-4  p-3 font-extrabold text-4xl shadow-2 rounded bg-gray-400 mb-5';
                wordElement.innerHTML =
                    `
            <h1 class="text-4xl font-bold mr-2">${v_word}</h1>
            <i class="fa-solid fa-volume-high text-xl cursor-pointer  rounded-full bg-red-100 p-3 " onclick="speakWord('${v_word}')"></i>
            <i class="fa-solid fa-bookmark text-xl mr-2 cursor-pointer  rounded-full bg-red-100 p-3"></i>
            `
                resultContent.appendChild(wordElement);

                meanings.forEach((meaning) => {
                    const partOfSpeechElement = document.createElement('div');
                    partOfSpeechElement.className = 'part-of-speech text-xl italic mb-3';
                    partOfSpeechElement.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
                    resultContent.appendChild(partOfSpeechElement);

                    meaning.definitions.forEach((def, index) => {
                        const definitionElement = document.createElement('div');
                        definitionElement.className = 'definition mb-2';
                        definitionElement.textContent = `${index + 1}. ${def.definition}`;
                        resultContent.appendChild(definitionElement);

                        if (def.example) {
                            const exampleElement = document.createElement('span');
                            exampleElement.className = 'bg-gray-300';
                            exampleElement.textContent = `Example: ${def.example}`;
                            resultContent.appendChild(exampleElement);
                        }
                    });
                });
                mainContainer.appendChild(resultSection);
                resultSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // resultContent.innerHTML = '<p>No data found</p>';
                alert('no data found check the spelling or syntax')
            }
        })
        .catch((err) => {
            console.error(err);
        });
});



//query for popup
const joinButton = document.getElementById('join-btn');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-popup')

joinButton.addEventListener('click', () => {
    popup.classList.remove('hidden')
})

closeButton.addEventListener('click', () => {
    popup.classList.add('hidden')
})

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.add("hidden");
    }
});


//function for display paragraph