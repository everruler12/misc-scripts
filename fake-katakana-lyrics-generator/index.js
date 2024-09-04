const { kana } = require('./kana.json');

// const katakana = {
//     "a": ["ア", "カ", "ガ", "キャ", "ギャ", "サ", "シャ", "ザ", "ジャ", "タ", "ダ", "チャ", "ヂャ", "ナ", "ニャ", "ハ", "バ", "パ", "ヒャ", "ビャ", "ピャ", "マ", "ミャ", "ヤ", "ラ", "リャ", "ワ", "ヴァ"],
//     "i": ["イ", "キ", "ギ", "シ", "ジ", "チ", "ヂ", "ニ", "ヒ", "ビ", "ピ", "ミ", "リ", "ヰ", "ヴィ"],
//     "u": ["ウ", "ク", "グ", "キュ", "ギュ", "ス", "シュ", "ズ", "ジュ", "ツ", "ヅ", "チュ", "ヂュ", "ヌ", "ニュ", "フ", "ブ", "プ", "ヒュ", "ビュ", "ピュ", "ム", "ミュ", "ユ", "ル", "リュ", "ヴュ"],
//     "e": ["エ", "ケ", "ゲ", "セ", "ゼ", "テ", "デ", "ネ", "ヘ", "ベ", "ペ", "メ", "レ", "ヱ", "ヴェ"],
//     "o": ["オ", "コ", "ゴ", "キョ", "ギョ", "ソ", "ショ", "ゾ", "ジョ", "ト", "ド", "チョ", "ヂョ", "ノ", "ニョ", "ホ", "ボ", "ポ", "ヒョ", "ビョ", "ピョ", "モ", "ミョ", "ヨ", "ロ", "リョ", "ヲ", "ヴォ"],
// }

const songStructureDefinition = {
    "V": "[Verse]",
    "C": "[Chorus]",
    "I": "[Instrumental Break]",
    "B": "[Bridge]",
    "O": "[Outro]",
}

function generateLyrics(lineLength, rhymePattern, songStructure) {
    const stanzaLength = rhymePattern.length;
    let lyrics = "";
    let chorusLines = [];

    // Helper function to generate a line
    function generateLine(lastVowel) {
        return Array.from({ length: lineLength }, () => katakana[lastVowel][Math.floor(Math.random() * katakana[lastVowel].length)]).join('');
    }

    // Generate chorus first if present in the song structure
    if (songStructure.includes('C')) {
        for (let i = 0; i < stanzaLength; i++) {
            const vowel = rhymePattern[i].toLowerCase();
            chorusLines.push(generateLine(vowel));
        }
    }

    // Process the song structure
    songStructure.split('').forEach(part => {
        switch (part) {
            case 'V': // Verse
            case 'B': // Bridge
                for (let i = 0; i < stanzaLength; i++) {
                    const vowel = rhymePattern[i].toLowerCase();
                    lyrics += generateLine(vowel) + "\n";
                }
                break;
            case 'C': // Chorus
                chorusLines.forEach(line => {
                    lyrics += line + "\n";
                });
                break;
            case 'I': // Instrumental Break
                lyrics += "[Instrumental Break]\n";
                break;
            case 'O': // Outro
                lyrics += "[Outro]\n";
                break;
        }
        lyrics += "\n"; // Add space between sections
    });

    return lyrics.trim(); // Remove the last newline for a clean finish
}




function init() {
    const lineLength = 12
    const rhymePattern = "AABB"
    const songStructure = "VCVCIBCO"

    const lyrics = generateLyrics(lineLength, rhymePattern, songStructure)
    console.log(lyrics)
}

init()