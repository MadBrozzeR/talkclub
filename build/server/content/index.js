"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexPage = void 0;
const STYLES = `
:root {
  --bg-bright: #ffe;
  --bg-bright-text: #002;
  --bg-dark: #224;
  --bg-dark-text: #eed;
}
html,body {
  margin: 0;
  height: 100%;
}
body {
  font-family: sans-serif;
  color: var(--bg-bright-text);
  background-color: var(--bg-bright);
}
.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
}
.dark {
  background-color: var(--bg-dark);
  color: var(--bg-dark-text);
}
header {
  padding: 16px 0;
}
h1 {
  text-align: center;
  margin: 0;
}
.motto {
  text-align: center;
}
section {
  padding: 32px 0;
}

h2 {
  margin: 0 0 20px;
}
p {
  margin: 0 0 20px;
}
.is-comming-stub {
  font-size: 40px;
  padding: 160px 0;
  text-align: center;
}
`;
const TEXT = {
    documentTitle: 'OnlineTalk Club - find your random topic to speak about',
    title: 'OnlineTalk Club',
    subTitle: 'Find your topic and people to speak today',
    descrition: 'Online conference aggregator to speak about whatever topic you like',
    prepareStub: 'Prepare for conversation!',
    about: {
        title: 'What is OnlineTalk Club',
        description: 'Basically, TalkClub is conference aggregator for people who want to speak to other people. And it is totally okay to speak to total strangers. You can find conference room of your taste, or you can create your conference in any application you like and register it here with topic and language of your choice, with set of rules you would like for people to follow in your meeting room. Have a great conversation!',
        why: 'Why would I need it?',
        answerWhy: 'Here\'s some examples:',
        examples: [
            'share or listen to oppinion on some particular topic;',
            'practice foreign language;',
            'meet with people with similar problems, not to feel alone;',
            'meet new people;',
            'just spend some time in conversation about random topic.',
        ],
    },
};
function formatList(list) {
    return list.reduce(function (result, item) {
        return `${result}<li>${item}</li>`;
    }, '');
}
const ABOUT = `
  <h2>${TEXT.about.title}</h2>
  <p>${TEXT.about.description}</p>
  <h2>${TEXT.about.why}</h2>
  <p>
    ${TEXT.about.answerWhy}
    <ul>
      ${formatList(TEXT.about.examples)}
    </ul>
  </p>
`;
const CONTENT = `
  <div id="board">
    <div class="is-comming-stub">
      ${TEXT.prepareStub}
    </div>
  </div>
`;
const PAGE_CONTENT = `
  <div class="page">
    <header class="dark">
      <div class="content">
        <h1>${TEXT.title}</h1>
        <div class="motto">${TEXT.subTitle}</div>
      </div>
    </header>

    <main>
      <section>
        <div class="content">
          ${CONTENT}
        </div>
      </section>
      <section class="dark">
        <div class="content">
          ${ABOUT}
        </div>
      </section>
    </main>
  </div>
`;
exports.indexPage = `
<!DOCTYPE html>
<html>
<head>
<title>${TEXT.documentTitle}</title>
<meta name="descrition" content="${TEXT.descrition}" />
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
<script type="importmap">
{
  "imports": {
    "splux": "/lib/splux.js"
  }
}
</script>
<script src="/src/main" type="module"></script>
<style>
${STYLES}
</style>
</head>
<body>
${PAGE_CONTENT}
</body>
</html>
`;
