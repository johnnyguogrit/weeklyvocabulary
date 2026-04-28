#!/usr/bin/env node
/**
 * Generate G1 questions in individual keyword format
 * Based on vocabularyData.ts and embedded questions in explanations
 */

const fs = require('fs');
const path = require('path');

// G1 vocabulary data (from vocabularyData.ts)
const G1_DATA = {
  "Maths": {
    "2": ["triangle"],
    "3": ["square"],
    "4": ["minus"],
    "5": ["number"],
    "7": ["plus"],
    "8": ["minus"],
    "9": ["more"],
    "10": ["less"],
    "11": ["together"],
    "12": ["difference"],
    "13": ["price"],
    "14": ["money"],
    "15": ["total"]
  },
  "Science": {
    "2": ["observe"],
    "3": ["measure"],
    "4": ["compare"],
    "5": ["sort"],
    "7": ["plant"],
    "8": ["water"],
    "9": ["sunlight"],
    "10": ["grow"],
    "11": ["record"],
    "12": ["test"],
    "13": [" conclude"],
    "14": ["result"],
    "15": ["evidence"]
  },
  "Tally Chart": {
    "2": ["tally chart"],
    "3": ["mark"],
    "4": ["count"],
    "5": ["data"],
    "7": ["collect"],
    "8": ["picture"],
    "9": ["pictogram"],
    "10": ["block"],
    "11": ["graph"],
    "12": ["most"],
    "13": ["least"],
    "14": ["bar graph"],
    "15": ["interpret"]
  },
  "Music": {
    "2": ["Instrument"],
    "3": ["shake"],
    "4": ["tap"],
    "5": ["pattern"],
    "7": ["count"],
    "8": ["follow"],
    "9": ["start"],
    "10": ["finish"],
    "11": ["practice"],
    "12": ["stage"],
    "13": ["bow"],
    "14": ["audience"],
    "15": ["perform"]
  },
  "Performing Arts": {
    "2": ["Gymnastics"],
    "3": ["cartwheel"],
    "4": ["Cartwheel"],
    "5": ["cartwheel"],
    "7": ["cartwheel"],
    "8": ["Cartwheel"],
    "9": ["Stretch"],
    "10": ["cartwheel"],
    "11": ["Stretch"],
    "12": ["Stretch"],
    "13": ["stretch"],
    "14": ["stretch"],
    "15": ["Stretch"]
  },
  "Drama": {
    "2": ["character"],
    "3": ["dialogue"],
    "4": ["hot seating"],
    "5": ["Character"],
    "7": ["emotions"],
    "8": ["actor"],
    "9": ["play"],
    "10": ["play"],
    "11": ["sing"],
    "12": ["facial expression"],
    "13": ["stage directions"],
    "14": ["stage directions"],
    "15": ["lines"]
  },
  "Visual Arts": {
    "2": ["character"],
    "3": ["setting"],
    "4": ["sculpture"],
    "5": ["sculpture"],
    "7": ["oval"],
    "8": ["spiral"],
    "9": ["sculpture"],
    "10": ["spiral"],
    "11": ["collage"],
    "12": ["layout"],
    "13": ["yarn"],
    "14": ["yarn"],
    "15": ["thread"]
  },
  "PE": {
    "2": ["together"],
    "3": ["cheer"],
    "4": ["teamwork"],
    "5": ["teamwork"],
    "7": ["communication"],
    "8": ["hoop"],
    "9": ["bounce"],
    "10": ["bounce"],
    "11": ["practice"],
    "12": ["team"],
    "13": ["save"],
    "14": ["practice"],
    "15": ["relay"]
  }
};

// Questions extracted from explanations
const QUESTIONS = {
  "Maths": {
    "triangle": {
      question: "A _______ has three corners and three sides.",
      options: ["square", "triangle", "circle", "star"],
      answer: "B",
      explanation: 'triangle意为"三角形"'
    },
    "square": {
      question: "A _______ has four equal straight sides.",
      options: ["triangle", "square", "circle", "dot"],
      answer: "B",
      explanation: `"square"意"正方形"`
    },
    "minus": {
      question: "When you _______ two numbers, the answer gets smaller.",
      options: ["plus", "minus", "equal", "more"],
      answer: "B",
      explanation: `"minus"意"减"`
    },
    "number": {
      question: "A _______ tells us how many things there are.",
      options: ["shape", "color", "number", "size"],
      answer: "C",
      explanation: `"number"意"数字"`
    },
    "plus": {
      question: "When you _______ two numbers, you get a bigger number.",
      options: ["plus", "minus", "take away", "less"],
      answer: "A",
      explanation: `"plus"意"加"`
    },
    "more": {
      question: "Five is _______ than three.",
      options: ["less", "more", "smaller", "fewer"],
      answer: "B",
      explanation: `"more"意"更多"`
    },
    "less": {
      question: "Two is _______ than five.",
      options: ["more", "bigger", "less", "greater"],
      answer: "C",
      explanation: `"less"意"更少"`
    },
    "together": {
      question: "When we put two groups _______ we add them.",
      options: ["apart", "together", "away", "separate"],
      answer: "B",
      explanation: `"together"意"一起"`
    },
    "difference": {
      question: "The _______ between 5 and 3 is 2.",
      options: ["sum", "difference", "total", "product"],
      answer: "B",
      explanation: `"difference"意"差值"`
    },
    "price": {
      question: "The _______ tells us how much something costs.",
      options: ["size", "color", "price", "shape"],
      answer: "C",
      explanation: `"price"意"价格"`
    },
    "money": {
      question: "We use _______ to buy things at the shop.",
      options: ["money", "paper", "leaves", "rocks"],
      answer: "A",
      explanation: `"money"意"钱"`
    },
    "total": {
      question: "The _______ of 3 and 4 is 7.",
      options: ["price", "money", "difference", "total"],
      answer: "D",
      explanation: `"total"意"总和"`
    }
  },
  "Science": {
    "observe": {
      question: "When you _______ you look carefully at something.",
      options: ["observe", "eat", "sleep", "run"],
      answer: "A",
      explanation: `"observe"意"观察"`
    },
    "measure": {
      question: "We use a ruler to _______ how long something is.",
      options: ["eat", "measure", "break", "throw"],
      answer: "B",
      explanation: `"measure"意"测量"`
    },
    "compare": {
      question: "When you _______ two things, you see how they are different.",
      options: ["compare", "break", "eat", "hide"],
      answer: "A",
      explanation: `"compare"意"比较"`
    },
    "sort": {
      question: "We can _______ leaves by their color.",
      options: ["sort", "break", "eat", "plant"],
      answer: "A",
      explanation: `"sort"意"分类"`
    },
    "plant": {
      question: "A _______ needs water and sunlight to grow.",
      options: ["rock", "plant", "toy", "book"],
      answer: "B",
      explanation: `"plant"意"植物"`
    },
    "water": {
      question: "Plants need _______ to stay alive.",
      options: ["juice", "water", "milk", "soda"],
      answer: "B",
      explanation: `"water"意"水"`
    },
    "sunlight": {
      question: "Plants need _______ to make food.",
      options: ["sunlight", "darkness", "moon", "stars"],
      answer: "A",
      explanation: `"sunlight"意"阳光"`
    },
    "grow": {
      question: "A small seed will _______ into a big plant.",
      options: ["shrink", "die", "grow", "fly"],
      answer: "C",
      explanation: `"grow"意"生长"`
    },
    "record": {
      question: "We _______ what we see in our notebook.",
      options: ["record", "forget", "lose", "throw"],
      answer: "A",
      explanation: `"record"意"记录"`
    },
    "test": {
      question: "A _______ helps us find the answer.",
      options: ["test", "game", "movie", "song"],
      answer: "A",
      explanation: `"test"意"实验/测试"`
    },
    "conclude": {
      question: "At the end, we _______ what we learned.",
      options: ["conclude", "start", "begin", "ignore"],
      answer: "A",
      explanation: `"conclude"意"总结/结论"`
    },
    "result": {
      question: "The _______ tells us what happened in the test.",
      options: ["result", "guess", "story", "joke"],
      answer: "A",
      explanation: `"result"意"结果"`
    },
    "evidence": {
      question: " _______ shows us that something is true.",
      options: ["Evidence", "Fiction", "Stories", "Lies"],
      answer: "A",
      explanation: `"evidence"意"证据"`
    }
  },
  "Tally Chart": {
    "tally chart": {
      question: "A _______ uses marks to count things.",
      options: ["chart", "tally chart", "picture", "book"],
      answer: "B",
      explanation: `"tally chart"意"计数图"`
    },
    "mark": {
      question: "Each _______ stands for one thing we count.",
      options: ["letter", "mark", "word", "page"],
      answer: "B",
      explanation: `"mark"意"计数标记"`
    },
    "count": {
      question: "We _______ all the marks to find the total.",
      options: ["count", "ignore", "erase", "lose"],
      answer: "A",
      explanation: `"count"意"数数"`
    },
    "data": {
      question: "The information we collect is called _______.",
      options: ["stories", "jokes", "data", "pictures"],
      answer: "C",
      explanation: `"data"意"数据"`
    },
    "collect": {
      question: "We _______ information to make a chart.",
      options: ["collect", "throw", "lose", "break"],
      answer: "A",
      explanation: `"collect"意"收集"`
    },
    "picture": {
      question: "A pictogram uses a _______ to show data.",
      options: ["number", "letter", "picture", "word"],
      answer: "C",
      explanation: `"picture"意"图片"`
    },
    "pictogram": {
      question: "A _______ uses pictures to show information.",
      options: ["pictogram", "book", "map", "story"],
      answer: "A",
      explanation: `"pictogram"意"象形图"`
    },
    "block": {
      question: "A _______ graph uses blocks to show data.",
      options: ["circle", "block", "line", "dot"],
      answer: "B",
      explanation: `"block"意"方块"`
    },
    "graph": {
      question: "A _______ helps us see information clearly.",
      options: ["game", "graph", "toy", "food"],
      answer: "B",
      explanation: `"graph"意"图表"`
    },
    "most": {
      question: "The _______ common item appears the most times.",
      options: ["least", "most", "rare", "uncommon"],
      answer: "B",
      explanation: `"most"意"最多"`
    },
    "least": {
      question: "The _______ common item appears the fewest times.",
      options: ["most", "least", "big", "huge"],
      answer: "B",
      explanation: `"least"意"最少"`
    },
    "bar graph": {
      question: "A _______ shows data with tall bars.",
      options: ["bar graph", "circle", "line", "dot"],
      answer: "A",
      explanation: `"bar graph"意"条形图"`
    },
    "interpret": {
      question: "When we _______ data, we understand what it means.",
      options: ["interpret", "break", "lose", "ignore"],
      answer: "A",
      explanation: `"interpret"意"解读"`
    }
  },
  "Music": {
    "Instrument": {
      question: "A drum or a piano is a musical _______.",
      options: ["stage", "Instrument", "audience", "bow"],
      answer: "B",
      explanation: `"Instrument"意"乐器"`
    },
    "shake": {
      question: "You can _______ a tambourine to make a sound.",
      options: ["bow", "stage", "shake", "finish"],
      answer: "C",
      explanation: `"shake"意"摇晃"`
    },
    "tap": {
      question: "You can _______ a drum with your hands.",
      options: ["bow", "tap", "audience", "stage"],
      answer: "B",
      explanation: `"tap"意"轻敲"`
    },
    "pattern": {
      question: "When music repeats the same notes again and again, it makes a _______.",
      options: ["pattern", "shake", "tap", "bow"],
      answer: "A",
      explanation: `"pattern"意"节奏型/模式"`
    },
    "count": {
      question: "We _______ 1, 2, 3, 4 to keep the beat.",
      options: ["count", "bow", "stage", "perform"],
      answer: "A",
      explanation: `"count"意"数数"`
    },
    "follow": {
      question: "We must _______ the teacher's hand to play together.",
      options: ["follow", "shake", "tap", "finish"],
      answer: "A",
      explanation: `"follow"意"跟随"`
    },
    "start": {
      question: "When the teacher points to us, we _______ playing.",
      options: ["finish", "start", "bow", "stage"],
      answer: "B",
      explanation: `"start"意"开始"`
    },
    "finish": {
      question: "We stop playing when we _______ the song.",
      options: ["start", "finish", "count", "practice"],
      answer: "B",
      explanation: `"finish"意"结束/完成"`
    },
    "practice": {
      question: "To get better at music, we must _______ every day.",
      options: ["finish", "stage", "practice", "bow"],
      answer: "C",
      explanation: `"practice"意"练习"`
    },
    "stage": {
      question: "We stand up on the big _______ to sing for everyone.",
      options: ["pattern", "instrument", "stage", "count"],
      answer: "C",
      explanation: `"stage"意"舞台"`
    },
    "bow": {
      question: "At the end of the show, we bend forward to _______ and say thank you.",
      options: ["bow", "start", "tap", "count"],
      answer: "A",
      explanation: `"bow"意"鞠躬"`
    },
    "audience": {
      question: "The people who watch and clap for us are the _______.",
      options: ["stage", "instrument", "audience", "pattern"],
      answer: "C",
      explanation: `"audience"意"观众"`
    },
    "perform": {
      question: "To sing or play music for people is to _______ for them.",
      options: ["finish", "perform", "count", "tap"],
      answer: "B",
      explanation: `"perform"意"表演"`
    }
  },
  "Performing Arts": {
    "Gymnastics": {
      question: "In _______ class, we learn to jump, roll, and balance.",
      options: ["Gymnastics", "audience", "dialogue", "stage"],
      answer: "A",
      explanation: `"Gymnastics"意"体操"`
    },
    "cartwheel": {
      question: "A _______ is a move where you turn sideways on your hands.",
      options: ["bow", "cartwheel", "stage", "stretch"],
      answer: "B",
      explanation: `"cartwheel"意"侧手翻"`
    },
    "Cartwheel": {
      question: "You need strong arms to do a good sideways _______.",
      options: ["bow", "cartwheel", "audience", "dialogue"],
      answer: "B",
      explanation: `"cartwheel"意"侧手翻"`
    },
    "Stretch": {
      question: "Reach your arms up high to _______ your body.",
      options: ["Stretch", "cartwheel", "sing", "bow"],
      answer: "A",
      explanation: `"Stretch"意"伸展/拉伸"`
    },
    "stretch": {
      question: "If you feel tight, you need a good _______ to loosen up.",
      options: ["cartwheel", "stretch", "lines", "emotions"],
      answer: "B",
      explanation: `"stretch"意"伸展/拉伸"`
    }
  },
  "Drama": {
    "character": {
      question: "A person or animal you pretend to be in a story is a _______.",
      options: ["stage", "character", "stretch", "dialogue"],
      answer: "B",
      explanation: `"character"意"角色"`
    },
    "Character": {
      question: "The _______ is who you pretend to be in a play.",
      options: ["stage", "dialogue", "Character", "hot seating"],
      answer: "C",
      explanation: `"Character"意"角色"`
    },
    "dialogue": {
      question: "When two actors talk to each other, it is a _______.",
      options: ["cartwheel", "dialogue", "stage", "stretch"],
      answer: "B",
      explanation: `"dialogue"意"对话/对白"`
    },
    "hot seating": {
      question: "In _______, you sit in a chair and answer questions as your character.",
      options: ["hot seating", "stage", "cartwheel", "stretch"],
      answer: "A",
      explanation: "hot seating是戏剧中的"焦点人物法""
    },
    "emotions": {
      question: "Happy and sad are different _______ we show on our face.",
      options: ["lines", "actors", "emotions", "stages"],
      answer: "C",
      explanation: `"emotions"意"情绪"`
    },
    "actor": {
      question: "A person who performs in a show is an _______.",
      options: ["emotions", "actor", "lines", "stage"],
      answer: "B",
      explanation: `"actor"意"演员"`
    },
    "play": {
      question: "A story acted out on a stage is a _______.",
      options: ["play", "actor", "lines", "stretch"],
      answer: "A",
      explanation: `"play在戏剧语境中"意"戏剧/舞台剧"`
    },
    "sing": {
      question: "In a musical play, actors talk and _______ songs.",
      options: ["sing", "stretch", "bow", "stage"],
      answer: "A",
      explanation: `"sing"意"唱歌"`
    },
    "facial expression": {
      question: "A smile is a _______ that shows you are happy.",
      options: ["dialogue", "facial expression", "stage", "lines"],
      answer: "B",
      explanation: `"facial expression"意"面部表情"`
    },
    "stage directions": {
      question: "_______ tell actors where to walk on the stage.",
      options: ["Stage directions", "Lines", "Emotions", "Characters"],
      answer: "A",
      explanation: `"stage directions"意"舞台走位指示"`
    },
    "lines": {
      question: "Actors memorize their _______ so they know what words to say.",
      options: ["stage directions", "lines", "emotions", "stages"],
      answer: "B",
      explanation: `"lines"意"台词"`
    }
  },
  "Visual Arts": {
    "character": {
      question: "The hero in your drawing is the main _______.",
      options: ["setting", "sculpture", "character", "oval"],
      answer: "C",
      explanation: `"美术故事创作中的character同样"意"角色"`
    },
    "setting": {
      question: "The place or background in the art is the _______.",
      options: ["setting", "character", "sculpture", "line"],
      answer: "A",
      explanation: "setting指画作的"背景/环境""
    },
    "sculpture": {
      question: "A 3D art piece made of clay is a _______.",
      options: ["setting", "character", "sculpture", "spiral"],
      answer: "C",
      explanation: `"sculpture"意"雕塑"`
    },
    "oval": {
      question: "An egg shape is called an _______.",
      options: ["square", "triangle", "oval", "spiral"],
      answer: "C",
      explanation: `"oval"意"椭圆形"`
    },
    "spiral": {
      question: "A curvy line that goes round and round is a _______.",
      options: ["square", "oval", "spiral", "collage"],
      answer: "C",
      explanation: `"spiral"意"螺旋形"`
    },
    "collage": {
      question: "Art made by gluing cut paper together is a _______.",
      options: ["spiral", "sculpture", "collage", "oval"],
      answer: "C",
      explanation: `"collage"意"拼贴画"`
    },
    "layout": {
      question: "The way we place the cut paper on the page is our good _______.",
      options: ["spiral", "layout", "character", "oval"],
      answer: "B",
      explanation: `"layout"意"布局/排版"`
    },
    "yarn": {
      question: "A thick, soft string used for knitting or art is _______.",
      options: ["yarn", "sculpture", "oval", "layout"],
      answer: "A",
      explanation: `"yarn"意"毛线/粗纱"`
    },
    "thread": {
      question: "A very thin string used for sewing is a _______.",
      options: ["collage", "yarn", "thread", "oval"],
      answer: "C",
      explanation: `"thread"意"细线/缝线"`
    }
  },
  "PE": {
    "together": {
      question: "In PE, we play the game _______ with our friends.",
      options: ["together", "cheer", "bounce", "hoop"],
      answer: "A",
      explanation: `"together"意"一起"`
    },
    "cheer": {
      question: "We shout and _______ for our team to win!",
      options: ["bounce", "cheer", "save", "relay"],
      answer: "B",
      explanation: `"cheer"意"欢呼/加油"`
    },
    "teamwork": {
      question: "Working nicely in a group is called good _______.",
      options: ["bounce", "teamwork", "hoop", "save"],
      answer: "B",
      explanation: `"teamwork"意"团队合作"`
    },
    "communication": {
      question: "Talking and listening to your team is good _______.",
      options: ["bounce", "communication", "relay", "hoop"],
      answer: "B",
      explanation: `"communication"意"沟通"，在体育团队配合中至关重要`
    },
    "hoop": {
      question: "We try to throw the basketball into the net or _______.",
      options: ["relay", "save", "hoop", "cheer"],
      answer: "C",
      explanation: `"hoop"意"篮筐或呼啦圈"`
    },
    "bounce": {
      question: "When a ball hits the floor and comes up, it will _______.",
      options: ["cheer", "bounce", "save", "teamwork"],
      answer: "B",
      explanation: `"bounce"意"弹跳/拍球"`
    },
    "practice": {
      question: "To get better at running, you must _______ every day.",
      options: ["save", "practice", "bounce", "hoop"],
      answer: "B",
      explanation: `"practice"意"练习"`
    },
    "team": {
      question: "A group of players playing a game together is a _______.",
      options: ["bounce", "hoop", "team", "save"],
      answer: "C",
      explanation: `"team"意"队伍"`
    },
    "save": {
      question: "When a goalie stops the ball from going in the net, it is a _______.",
      options: ["relay", "bounce", "save", "team"],
      answer: "C",
      explanation: "save在此处特指守门员的"扑救""
    },
    "relay": {
      question: "A race where runners take turns passing a stick is a _______.",
      options: ["save", "bounce", "relay", "hoop"],
      answer: "C",
      explanation: `"relay"意"接力赛"`
    }
  }
};

function generateG1Markdown() {
  let output = '## G1\n\n';

  const subjects = ["Maths", "Science", "Tally Chart", "Music", "Performing Arts", "Drama", "Visual Arts", "PE"];

  for (const subject of subjects) {
    output += `### Subject: ${subject}\n\n`;

    const weeks = G1_DATA[subject];
    for (const [weekNum, keywords] of Object.entries(weeks)) {
      for (const keyword of keywords) {
        const key = keyword.toLowerCase();
        // Find matching question (case-insensitive match)
        let questionData = QUESTIONS[subject][key];
        if (!questionData) {
          // Try exact match
          questionData = QUESTIONS[subject][keyword];
        }

        if (questionData) {
          output += `**Week ${weekNum}: ${keyword}**\n\n`;
          output += `**Question:** ${questionData.question}\n\n`;
          output += `**Options:**\n`;
          for (let i = 0; i < questionData.options.length; i++) {
            const letter = String.fromCharCode(65 + i);
            output += `- ${letter}) ${questionData.options[i]}\n`;
          }
          output += `\n**Answer:** ${questionData.answer}\n\n`;
          output += `**Explanation:** ${questionData.explanation}\n\n`;
          output += `---\n\n`;
        } else {
          console.warn(`Missing question for ${subject} - ${keyword}`);
        }
      }
    }
  }

  return output;
}

// Main execution
const markdown = generateG1Markdown();
console.log(markdown);
