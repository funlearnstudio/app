(function(global){
    'use strict';

    // 1. 初始化英文避難所
    if (!window.__ENGLISH_REPO__) window.__ENGLISH_REPO__ = {};
    console.log("🚀 [English V9.5] 英文題庫 (課綱標籤精準對齊版) 啟動...");

    const Utils = {
        shuffle: (arr) => arr.sort(() => Math.random() - 0.5)
    };

    // ==========================================
    // 📚 英文文法資料庫 (完全對應 curriculum_integrated.js)
    // ==========================================
    const grammarDB = [
        // --- 單字與片語 (Vocabulary & Phrases) ---
      { 
        q: "I used to ______ this store, but I sold it when business started going down.", 
        a: "own", 
        o: ["pass", "visit", "buy"], 
        t: ["英文", "九年級", "單字", "動詞"] 
      },
      { 
        q: "I saw a ______ bug in the garden. It had bright colors and a funny shape. I've never seen anything like it before.", 
        a: "strange", 
        o: ["wrong", "difficult", "blank"], 
        t: ["英文", "九年級", "單字", "形容詞"] 
      },
      { 
        q: "Doris: How was your date with Johnny?\nStella: It couldn't be worse. I don't ______ want to talk about it.", 
        a: "even", 
        o: ["never", "also", "then"], 
        t: ["英文", "九年級", "副詞", "對話"] 
      },
      { 
        q: "I ______ my homework at home. I had to go back to get it before class started.", 
        a: "left", 
        o: ["grew", "dried", "broke"], 
        t: ["英文", "九年級", "單字", "動詞"] 
      },
      { 
        q: "The little girl shouted, \"That's not your toy car! It's ______!\"", 
        a: "mine", 
        o: ["that", "there", "it"], 
        t: ["英文", "九年級", "代名詞", "所有格代名詞"] 
      },
      { 
        q: "The Japanese built the ______ castle more than one ______ ago.", 
        a: "century", 
        o: ["inch", "soldier", "age"], 
        t: ["英文", "九年級", "單字", "名詞"] 
      },
      { 
        q: "I was so happy when my parents gave me a puppy as a birthday ______. I never thought I could have a pet.", 
        a: "surprise", 
        o: ["snack", "chance", "service"], 
        t: ["英文", "九年級", "單字", "名詞"] 
      },
      { 
        q: "Ben: Do you know what happened at school today?\nAmy: No. Tell me the ______! I can't wait to hear it.", 
        a: "news", 
        o: ["type", "area", "reason"], 
        t: ["英文", "九年級", "單字", "名詞"] 
      },
      { 
        q: "In Taiwan, it's very ______ to see people riding scooters on the street. It's the main way for people to get from place to place.", 
        a: "common", 
        o: ["angry", "successful", "national"], 
        t: ["英文", "九年級", "單字", "形容詞"] 
      },
      { 
        q: "Jack: We have three desserts today: ice cream, cake, and fruit. Which one is your ______?\nCindy: I'd like ice cream because it's my favorite.", 
        a: "choice", 
        o: ["choose", "island", "tip"], 
        t: ["英文", "九年級", "單字", "名詞"] 
      },

      // --- 文法與時態 (Grammar & Tenses) ---
      { 
        q: "She will wait until I ______ at the station. Then, we will take the train together.", 
        a: "arrive", 
        o: ["will arrive", "arrived", "am arriving"], 
        t: ["英文", "九年級", "文法", "連接詞與時態"] 
      },
      { 
        q: "When I saw the boy, he ______ basketball happily with his friends at the park.", 
        a: "was playing", 
        o: ["played", "will play", "is playing"], 
        t: ["英文", "九年級", "文法", "過去進行式"] 
      },
      { 
        q: "______ a new language, he practices speaking with his friends every day.", 
        a: "To learn", 
        o: ["Learn", "Learning", "Learns"], 
        t: ["英文", "九年級", "文法", "不定詞"] 
      },
      { 
        q: "Paul forgot ______ the book last Friday, and he bought the same book again today.", 
        a: "buying", 
        o: ["to buy", "buy", "bought"], 
        t: ["英文", "九年級", "文法", "動名詞"] 
      },
      { 
        q: "Wearing a face mask ______ you from getting sick easily.", 
        a: "keeps", 
        o: ["to keep", "keep", "keeping"], 
        t: ["英文", "九年級", "文法", "動詞"] 
      },
      { 
        q: "Lily has ______ finished her homework. She is watching TV now.", 
        a: "already", 
        o: ["yet", "ever", "never"], 
        t: ["英文", "九年級", "文法", "現在完成式"] 
      },
      { 
        q: "My brother has never ______ France one day.", 
        a: "been to", 
        o: ["gone to", "been", "gone"], 
        t: ["英文", "九年級", "文法", "現在完成式"] 
      },
      { 
        q: "Nancy: ______ have you studied at this school?\nPaul: I've studied here since 2022.", 
        a: "How long", 
        o: ["How often", "When", "What time"], 
        t: ["英文", "九年級", "文法", "疑問詞"] 
      },
      { 
        q: "Leo: ______ you ever eaten stinky tofu?\nRyan: No, but I will try it next week.", 
        a: "Have", 
        o: ["Has", "Did", "Will"], 
        t: ["英文", "九年級", "文法", "現在完成式"] 
      },
      { 
        q: "Andy ______ in Kaohsiung three years ago, but now he ______ to Taipei. He works in a big company near Taipei Train Station.", 
        a: "lived; has moved", 
        o: ["has lived; moved", "lived; moved", "has lived; has moved"], 
        t: ["英文", "九年級", "文法", "時態比較"] 
      },
      { 
        q: "This story is really ______. I couldn't stop reading it, and I am never ______ with it.", 
        a: "interesting; bored", 
        o: ["interesting; boring", "interested; boring", "interested; bored"], 
        t: ["英文", "九年級", "文法", "情緒形容詞"] 
      },
      { 
        q: "Although Tom didn't pass the driving test several times, he believed he ______ it one day.", 
        a: "would pass", 
        o: ["passed", "has passed", "is passing"], 
        t: ["英文", "九年級", "文法", "助動詞"] 
      },
      { 
        q: "Everyone was surprised ______ his high score on the test and thought he might cheat(作弊) on tests.", 
        a: "at", 
        o: ["in", "with", "about"], 
        t: ["英文", "九年級", "文法", "介系詞"] 
      },
      { 
        q: "From the weather chart, we know ______ will be heavy rain by the end of the week, so we should bring umbrellas.", 
        a: "there", 
        o: ["that", "it", "we"], 
        t: ["英文", "九年級", "文法", "存在句"] 
      },
      { 
        q: "I think ______ meeting new people is ______ because you can learn new things and hear different ideas.", 
        a: "that; exciting", 
        o: ["when; exciting", "when; excited", "that; excited"], 
        t: ["英文", "九年級", "文法", "子句與形容詞"] 
      },
        // ==========================================
      // 【第二次段考】單字、文法、被動語態
      // ==========================================
      { 
        q: "There was heavy ______ on the road this morning, so I was late for work.", 
        a: "traffic", 
        o: ["time", "area", "ground"], 
        t: ["英文", "九年級", "第二次段考", "單字"] 
      },
      { 
        q: "Ben always uses his birthday as a(n) ______ to ask Dad to buy him something expensive.", 
        a: "excuse", 
        o: ["rule", "action", "prize"], 
        t: ["英文", "九年級", "第二次段考", "單字"] 
      },
      { 
        q: "They sold their house, so they ______ to a new apartment next month.", 
        a: "are moving", 
        o: ["would move", "were going to move", "moved"], 
        t: ["英文", "九年級", "第二次段考", "時態"] 
      },
      { 
        q: "Penny: How much does it cost ______ in this area?\nJoyce: Twenty NT dollars an hour.", 
        a: "to park", 
        o: ["parking", "park", "cost"], 
        t: ["英文", "九年級", "第二次段考", "不定詞"] 
      },
      { 
        q: "Sam lives near the metro station. He ______ the metro to school every day.", 
        a: "takes", 
        o: ["rides", "drives", "rows"], 
        t: ["英文", "九年級", "第二次段考", "動詞"] 
      },
      { 
        q: "The beach near our town is a very ______ place. Every summer at least one kid dies there.", 
        a: "dangerous", 
        o: ["exciting", "popular", "lonely"], 
        t: ["英文", "九年級", "第二次段考", "單字"] 
      },
      { 
        q: "The movie was ______ than I expected. I almost fell asleep during the second hour.", 
        a: "a lot longer", 
        o: ["very long", "less long", "the longest"], 
        t: ["英文", "九年級", "第二次段考", "比較級"] 
      },
      { 
        q: "This blanket feels ______. It's great for a cold winter night.", 
        a: "so warm", 
        o: ["terribly", "well", "a cute cat"], 
        t: ["英文", "九年級", "第二次段考", "感官動詞"] 
      },
      { 
        q: "Both of my brothers are teachers. One teaches English, and ______ teaches math.", 
        a: "the other", 
        o: ["another", "the second", "the next"], 
        t: ["英文", "九年級", "第二次段考", "代名詞"] 
      },
      { 
        q: "Our daughter is already a grown-up and able to take care of ______.", 
        a: "herself", 
        o: ["her", "hers", "she"], 
        t: ["英文", "九年級", "第二次段考", "反身代名詞"] 
      },
      { 
        q: "The story about three little pigs ______ more than ten times, so each of us knows it very well.", 
        a: "has been told", 
        o: ["told", "has told", "were told"], 
        t: ["英文", "九年級", "第二次段考", "被動語態"] 
      },
      { 
        q: "Paul: There's going to be a party to welcome new workers, ______?", 
        a: "isn't there", 
        o: ["hasn't there", "is there", "has there"], 
        t: ["英文", "九年級", "第二次段考", "附加問句"] 
      },
      { 
        q: "The bus is arriving in town soon. We have to leave now, ______?", 
        a: "don't we", 
        o: ["haven't we", "have we", "do we"], 
        t: ["英文", "九年級", "第二次段考", "附加問句"] 
      },
      { 
        q: "To keep it cold and fresh, the milk should ______ in the fridge after you get home.", 
        a: "be put", 
        o: ["puts", "put", "be putting"], 
        t: ["英文", "九年級", "第二次段考", "被動語態"] 
      },
      { 
        q: "Mandy: Who's going to finish all this cleaning?\nRobert: Don't worry. All of the housework ______ by someone later.", 
        a: "will be done", 
        o: ["does", "is going to do", "were done"], 
        t: ["英文", "九年級", "第二次段考", "被動語態"] 
      },
      { 
        q: "If you ______ to Taiwan, please let me know. I need to check if I will have time to pick you up.", 
        a: "come", 
        o: ["will come", "came", "are coming"], 
        t: ["英文", "九年級", "第二次段考", "條件句"] 
      },
      { 
        q: "Tom: Do you know ______ the city buses run on the weekend?\nRachel: Yes, they run every 20 minutes.", 
        a: "how often", 
        o: ["how long", "what time", "how"], 
        t: ["英文", "九年級", "第二次段考", "疑問詞"] 
      },
      { 
        q: "I have no idea ______ in this area? I want to find out as soon as possible.", 
        a: "what happened to Vicky", 
        o: ["how to do", "who the letter sent", "how do I get to the museum"], 
        t: ["英文", "九年級", "第二次段考", "間接問句"] 
      },
      { 
        q: "The girl ______ the white dress is my sister. She loves to ______ by her friends.", 
        a: "in; be cheered", 
        o: ["in; cheer", "with; cheer", "with; be cheered"], 
        t: ["英文", "九年級", "第二次段考", "介系詞與被動"] 
      },
      { 
        q: "This new library is very ______. It has computers, smart screens, and you can even meet a robot.", 
        a: "modern", 
        o: ["stupid", "blind", "mad"], 
        t: ["英文", "九年級", "第二次段考", "單字"] 
      },
      { 
        q: "Reading stories before bed is a great ______ because it makes them feel safe and ready to sleep.", 
        a: "pleasure", 
        o: ["interview", "ending", "sentence"], 
        t: ["英文", "九年級", "第二次段考", "單字"] 
      },
      { 
        q: "Vincent: Who did you ______ to win first place in last week's race?\nSteven: Lucy. But to my surprise, Mary won instead.", 
        a: "expect", 
        o: ["except", "define", "explain"], 
        t: ["英文", "九年級", "第二次段考", "單字"] 
      },
      { 
        q: "Jeffery broke the expensive vase ______ while he was reaching for the milk on the table.", 
        a: "by accident", 
        o: ["thank goodness", "to be honest", "on the other hand"], 
        t: ["英文", "九年級", "第二次段考", "片語"] 
      },
      { 
        q: "Cindy felt ______ when she lost her phone in a foreign city and didn't know what to do.", 
        a: "helpless", 
        o: ["powerful", "lovely", "limited"], 
        t: ["英文", "九年級", "第二次段考", "形容詞"] 
      },
        { 
        q: "She had to make a difficult ______ between two good jobs. One job was close to her home, but the other was more interesting.", 
        a: "choice", 
        o: ["chance", "change", "file"], 
        t: ["英文", "九年級", "第三次段考", "單字"] 
      },
      { 
        q: "The knife doesn't cut very well. It's not as ______ as before.", 
        a: "sharp", 
        o: ["quick", "bright", "heavy"], 
        t: ["英文", "九年級", "第三次段考", "單字"] 
      },
      { 
        q: "If it ______ rain tomorrow, we will play basketball at the park.", 
        a: "doesn't", 
        o: ["didn't", "won't", "isn't"], 
        t: ["英文", "九年級", "第三次段考", "文法", "假設語氣"] 
      },
      { 
        q: "Judy is the best dancer in our school. She dances ______ than all the other students.", 
        a: "more beautifully", 
        o: ["more beautiful", "beautiful", "the most beautifully"], 
        t: ["英文", "九年級", "第三次段考", "文法", "比較級"] 
      },
      { 
        q: "He saw a monkey take a banana ______ it up when I went hiking in the mountains.", 
        a: "and eat", 
        o: ["eat", "ate", "and ate"], 
        t: ["英文", "九年級", "第三次段考", "文法", "感官動詞"] 
      },
      { 
        q: "It's hard to clearly ______ what love is. You can't see or touch it. You can only feel it.", 
        a: "define", 
        o: ["learn", "buy", "reach"], 
        t: ["英文", "九年級", "第三次段考", "單字"] 
      },
      { 
        q: "I didn't ______ to meet Louis, one of my old friends, on the street. I felt very excited.", 
        a: "expect", 
        o: ["appear", "happen", "invite"], 
        t: ["英文", "九年級", "第三次段考", "單字"] 
      },
      { 
        q: "You have finished a drawing for the art class, ______ you?", 
        a: "haven't", 
        o: ["don't", "didn't", "won't"], 
        t: ["英文", "九年級", "第三次段考", "文法", "附加問句"] 
      },
      { 
        q: "We heard from the news ______ there will be heavy rain tomorrow, so we decided not to go hiking in the mountains.", 
        a: "that", 
        o: ["which", "what", "where"], 
        t: ["英文", "九年級", "第三次段考", "文法", "名詞子句"] 
      },
      { 
        q: "Mom: Have you done ______ of your homework? Lydia: Sure. I finished it yesterday.", 
        a: "all", 
        o: ["each", "both", "a few"], 
        t: ["英文", "九年級", "第三次段考", "片語"] 
      },
      { 
        q: "I want to buy that big white house ______ a garden full of red roses.", 
        a: "which has", 
        o: ["that with", "who has", "in"], 
        t: ["英文", "九年級", "第三次段考", "文法", "關係代名詞"] 
      },
      { 
        q: "The noisy children ______ playing games in the park behind the school are very happy.", 
        a: "that are", 
        o: ["that is", "whose", "which is"], 
        t: ["英文", "九年級", "第三次段考", "文法", "關係代名詞"] 
      },
      { 
        q: "The movie ______ interests my younger brother is Toy Story 2.", 
        a: "which", 
        o: ["whose", "X", "who"], 
        t: ["英文", "九年級", "第三次段考", "文法", "關係代名詞"] 
      },
      { 
        q: "The expensive old books that ______ by my grandmother many years ago are kept in the study room.", 
        a: "were bought", 
        o: ["bought", "were buying", "buy"], 
        t: ["英文", "九年級", "第三次段考", "文法", "被動語態"] 
      },
      { 
        q: "Look at the cute dog ______ ears are much longer than its head. Do you know who it belongs to?", 
        a: "whose", 
        o: ["who", "which", "X"], 
        t: ["英文", "九年級", "第三次段考", "文法", "關係代名詞"] 
      },
      { 
        q: "The old woman that Jack met in America last week ______ worked here for 20 years, and we all like her very much.", 
        a: "has", 
        o: ["have", "is", "are"], 
        t: ["英文", "九年級", "第三次段考", "文法", "現在完成式"] 
      },
      { 
        q: "Is that the girl ______ at the party?", 
        a: "you were talking to", 
        o: ["that you were talking", "you were talking to her", "which are talking"], 
        t: ["英文", "九年級", "第三次段考", "文法", "關係代名詞"] 
      },
      { 
        q: "Should the homework the math teacher gave us yesterday ______ by this Friday?", 
        a: "be finished", 
        o: ["finished", "finish", "was finished"], 
        t: ["英文", "九年級", "第三次段考", "文法", "被動語態"] 
      },
      { 
        q: "Tom falls in love with the girl ______.", 
        a: "whose bag is on the chair", 
        o: ["who live near the school", "who sitting next to the door", "that are very kind"], 
        t: ["英文", "九年級", "第三次段考", "文法", "關係代名詞"] 
      },
        // --- 單字 (Vocabulary) ---
      { 
        q: "I used to ______ this store, but I sold it when business started going down.", 
        a: "own", 
        o: ["pass", "visit", "buy"], 
        t: ["英文", "九年級", "第一次段考", "單字"] 
      },
      { 
        q: "I saw a ______ bug in the garden. It had bright colors and a funny shape. I've never seen anything like it before.", 
        a: "strange", 
        o: ["wrong", "difficult", "blank"], 
        t: ["英文", "九年級", "第一次段考", "單字"] 
      },
      { 
        q: "Doris: How was your date with Johnny? Stella: It couldn't be worse. I don't ______ want to talk about it.", 
        a: "even", 
        o: ["never", "also", "then"], 
        t: ["英文", "九年級", "第一次段考", "副詞"] 
      },
      { 
        q: "I ______ my homework at home. I had to go back to get it before class started.", 
        a: "left", 
        o: ["grew", "dried", "broke"], 
        t: ["英文", "九年級", "第一次段考", "單字"] 
      },
      { 
        q: "The little girl shouted, \"That's not your toy car! It's ______!\"", 
        a: "mine", 
        o: ["me", "my", "I"], 
        t: ["英文", "九年級", "第一次段考", "所有格代名詞"] 
      },
      
      // --- 文法 (Grammar) ---
      { 
        q: "If you ______ to Taiwan, please let me know. I need to check if ______ time to pick you up at the airport.", 
        a: "come; have", 
        o: ["will come; will have", "will come; have", "come; will have"], 
        t: ["英文", "九年級", "第一次段考", "文法", "連接詞 if"] 
      },
      { 
        q: "Although Tom didn't pass the driving test several times, he believed he ______ it one day.", 
        a: "would pass", 
        o: ["passed", "has passed", "is passing"], 
        t: ["英文", "九年級", "第一次段考", "文法", "時態一致性"] 
      },
      { 
        q: "Everyone was surprised ______ his high score on the test and thought he might cheat on tests.", 
        a: "at", 
        o: ["in", "with", "about"], 
        t: ["英文", "九年級", "第一次段考", "片語", "介系詞"] 
      },
        // --- 單選題 (Grammar & Vocabulary) ---
      { 
        q: "It's ______ and ______ in December in New York.", 
        a: "snowy; windy", 
        o: ["snowy; wind", "snow; windy", "snow; wind"], 
        t: ["英文", "八年級", "第一次段考", "天氣"] 
      },
      { 
        q: "______ the weather ______ ______ December?", 
        a: "What's; like; in", 
        o: ["How's; like; on", "How's; x; on", "What's; x; at"], 
        t: ["英文", "八年級", "第一次段考", "天氣"] 
      },
      { 
        q: "Let's ______ that topic. I don't want to talk about it anymore.", 
        a: "drop", 
        o: ["daily", "meaning", "open"], 
        t: ["英文", "八年級", "第一次段考", "片語"] 
      },
      { 
        q: "A: ______ toy car is this? B: It's ______.", 
        a: "Whose; mine", 
        o: ["Who; my", "Who; mine", "Whose; my"], 
        t: ["英文", "八年級", "第一次段考", "所有格代名詞"] 
      },
      { 
        q: "______ an umbrella with you when it is cloudy.", 
        a: "Take", 
        o: ["To take", "Taking", "Took"], 
        t: ["英文", "八年級", "第一次段考", "祈使句"] 
      },

      // --- 克漏字測驗 (Cloze) ---
      { 
        q: "Tim decided ______ a club last year.", 
        a: "to join", 
        o: ["join", "joining", "joins"], 
        t: ["英文", "八年級", "第一次段考", "克漏字", "不定詞"] 
      },
      { 
        q: "There were many different clubs at his school, but he thought the movie club ______ the most interesting.", 
        a: "was", 
        o: ["were", "is", "are"], 
        t: ["英文", "八年級", "第一次段考", "克漏字", "時態"] 
      },
      { 
        q: "He enjoyed ______ to the club every week.", 
        a: "going", 
        o: ["go", "went", "goes"], 
        t: ["英文", "八年級", "第一次段考", "克漏字", "動名詞"] 
      },
      { 
        q: "He was very ______ in making movies.", 
        a: "interested", 
        o: ["interesting", "interest", "interests"], 
        t: ["英文", "八年級", "第一次段考", "克漏字", "情緒形容詞"] 
      },
      { 
        q: "He practiced ______ movies with his friends.", 
        a: "making", 
        o: ["make", "makes", "made"], 
        t: ["英文", "八年級", "第一次段考", "克漏字", "動名詞"] 
      },

      // --- 文意字彙 (Vocabulary in Context) ---
      { 
        q: "Mom was m______d because Tom played online games on the cellphone for five hours and didn't do his homework.", 
        a: "mad", 
        o: ["mud", "mid", "bad"], 
        t: ["英文", "八年級", "第一次段考", "文意字彙"] 
      },
      { 
        q: "My uncle designs computer games in a big company. He is a game e______er.", 
        a: "engineer", 
        o: ["energy", "engine", "enjoy"], 
        t: ["英文", "八年級", "第一次段考", "文意字彙"] 
      },
      { 
        q: "There are four s______ns in a year like spring and summer.", 
        a: "seasons", 
        o: ["sessions", "sons", "seas"], 
        t: ["英文", "八年級", "第一次段考", "文意字彙"] 
      },
      { 
        q: "Drinking water and exercising every day are good for your h______th.", 
        a: "health", 
        o: ["heart", "heat", "wealth"], 
        t: ["英文", "八年級", "第一次段考", "文意字彙"] 
      },
      { 
        q: "Amy: I would like to o______er some cookies and hot chocolate, please.", 
        a: "order", 
        o: ["other", "offer", "odor"], 
        t: ["英文", "八年級", "第一次段考", "文意字彙"] 
      },
        { 
        q: "The boy ______ falling asleep on the stairs when he waited for his mom. He said he was tired.", 
        a: "remembered", 
        o: ["allowed", "decided", "checked"], 
        t: ["英文", "八年級", "第二次段考", "動名詞", "remember"] 
      },
      { 
        q: "There isn't ______ water in the bottle for everyone, so we need to buy some.", 
        a: "much", 
        o: ["many", "few", "a few"], 
        t: ["英文", "八年級", "第二次段考", "數量詞", "不可數名詞"] 
      },
      { 
        q: "Shohei Ohtani is a world-famous ______ player from Japan.", 
        a: "baseball", 
        o: ["basketball", "soccer", "tennis"], 
        t: ["英文", "八年級", "第二次段考", "閱讀測驗", "名詞"] 
      },
      { 
        q: "Ohtani wanted to be good at both pitching and ______.", 
        a: "swinging", 
        o: ["singing", "swimming", "sleeping"], 
        t: ["英文", "八年級", "第二次段考", "閱讀測驗", "動名詞"] 
      },

      // --- 文意字彙 (Vocabulary in Context) ---
      // 原題為填充題，此處改編為選擇題以利練習
      { 
        q: "Mom was m______d because Tom played online games on the cellphone for five hours and didn't do his homework.", 
        a: "mad", 
        o: ["mud", "map", "mat"], 
        t: ["英文", "八年級", "第二次段考", "單字", "情緒"] 
      },
      { 
        q: "My uncle designs computer games in a big company. He is a game e______er.", 
        a: "engineer", 
        o: ["elevator", "eraser", "easier"], 
        t: ["英文", "八年級", "第二次段考", "單字", "職業"] 
      },
      { 
        q: "There are four s______ns in a year like spring and summer.", 
        a: "seasons", 
        o: ["sons", "sessions", "lessons"], 
        t: ["英文", "八年級", "第二次段考", "單字", "時間"] 
      },
      { 
        q: "Drinking water and exercising every day are good for your h______th.", 
        a: "health", 
        o: ["heart", "heat", "wealth"], 
        t: ["英文", "八年級", "第二次段考", "單字", "健康"] 
      },
      { 
        q: "Amy: I would like to o______er some cookies and hot chocolate, please.", 
        a: "order", 
        o: ["offer", "older", "other"], 
        t: ["英文", "八年級", "第二次段考", "單字", "動詞"] 
      },
        // --- 題組：環保議題 Upcycling (Reading Comprehension) ---
      { 
        q: "Thomas got the idea of 'Upcycling' from a talk show. He ______ it last week and found it great.", 
        a: "listened to", 
        o: ["walked around", "looked for", "shouted at"], 
        t: ["英文", "八年級", "第三次段考", "閱讀", "感官動詞"] 
      },
      { 
        q: "According to the dialogue, what is 'Upcycling'?", 
        a: "Turning old things into something better and useful.", 
        o: ["Making things cost less money.", "Throwing away old jeans.", "Buying new plant pots."], 
        t: ["英文", "八年級", "第三次段考", "閱讀", "主旨理解"] 
      },
      { 
        q: "Thomas thinks upcycling is good because it helps us use new things with a ______ cost to the environment.", 
        a: "less", 
        o: ["more", "heavy", "dirty"], 
        t: ["英文", "八年級", "第三次段考", "閱讀", "比較級"] 
      },
      { 
        q: "Abe thought turning water bottles into plant pots is upcycling, but Thomas said it is ______ because it just makes things cost less.", 
        a: "downcycling", 
        o: ["recycling", "bicycling", "shopping"], 
        t: ["英文", "八年級", "第三次段考", "閱讀", "文意推測"] 
      },

      // --- 題組：地圖與生活應用 (Map Reading) ---
     
    // ----------------------------------------------------
        // [國七上] Unit 1: Be Verbs (be動詞)
        // ----------------------------------------------------
        { q: "I _____ a student.", a: "am", o: ["is", "are", "be"], tag: ["國七", "be動詞"] },
        { q: "They _____ my friends.", a: "are", o: ["is", "am", "be"], tag: ["國七", "be動詞"] },
        { q: "She _____ happy today.", a: "is", o: ["are", "am", "be"], tag: ["國七", "be動詞"] },
        
        // ----------------------------------------------------
        // [國七上] Unit 2: Nouns (名詞/單複數)
        // ----------------------------------------------------
        { q: "I have two _____.", a: "watches", o: ["watch", "watchs", "watching"], tag: ["國七", "名詞", "單複數"] },
        { q: "These are my _____.", a: "books", o: ["book", "book's", "a book"], tag: ["國七", "名詞", "單複數"] },
        { q: "That _____ a cat.", a: "is", o: ["are", "am", "be"], tag: ["國七", "名詞"] }, // This/That 搭配 be動詞

        // ----------------------------------------------------
        // [國七上] Unit 3: Imperatives (祈使句)
        // ----------------------------------------------------
        { q: "_____ quiet, please.", a: "Be", o: ["Don't", "Do", "Are"], tag: ["國七", "祈使句"] },
        { q: "_____ run in the classroom.", a: "Don't", o: ["Not", "No", "Be"], tag: ["國七", "祈使句"] },
        { q: "Let's _____ to the park.", a: "go", o: ["going", "to go", "goes"], tag: ["國七", "祈使句"] },

        // ----------------------------------------------------
        // [國七下] Unit 1: Present Progressive (現在進行式)
        // ----------------------------------------------------
        { q: "Look! He _____ basketball.", a: "is playing", o: ["plays", "play", "played"], tag: ["國七", "現在進行式"] },
        { q: "What _____ you doing?", a: "are", o: ["do", "can", "will"], tag: ["國七", "現在進行式"] },
        { q: "The birds _____ singing.", a: "are", o: ["is", "do", "can"], tag: ["國七", "現在進行式"] },

        // ----------------------------------------------------
        // [國七下] Unit 2: Quantifiers (數量詞)
        // ----------------------------------------------------
        { q: "How _____ water do you need?", a: "much", o: ["many", "long", "often"], tag: ["國七", "數量詞"] },
        { q: "There are _____ students in the classroom.", a: "many", o: ["much", "little", "any"], tag: ["國七", "數量詞"] },
        { q: "Do you have _____ money?", a: "any", o: ["many", "few", "a few"], tag: ["國七", "數量詞"] },

        // ----------------------------------------------------
        // [國七下] Unit 3: Past Tense (過去式)
        // ----------------------------------------------------
        { q: "I _____ at home yesterday.", a: "was", o: ["am", "were", "is"], tag: ["國七", "過去式"] },
        { q: "They _____ busy last night.", a: "were", o: ["are", "was", "is"], tag: ["國七", "過去式"] },
        { q: "Where _____ you born?", a: "were", o: ["was", "are", "did"], tag: ["國七", "過去式"] },

        // ----------------------------------------------------
        // [國八上] Unit 1: Past Simple (過去式/動詞)
        // ----------------------------------------------------
        { q: "He _____ to the park yesterday.", a: "went", o: ["go", "goes", "gone"], tag: ["國八", "過去式", "動詞"] },
        { q: "_____ you watch TV last night?", a: "Did", o: ["Do", "Are", "Were"], tag: ["國八", "過去式", "動詞"] },
        { q: "She _____ buy the bag.", a: "didn't", o: ["don't", "wasn't", "not"], tag: ["國八", "過去式", "動詞"] },

        // ----------------------------------------------------
        // [國八上] Unit 2: Future Tense (未來式)
        // ----------------------------------------------------
        { q: "I _____ visit my grandma tomorrow.", a: "will", o: ["am", "did", "do"], tag: ["國八", "未來式"] },
        { q: "She is _____ to study hard.", a: "going", o: ["go", "goes", "will"], tag: ["國八", "未來式"] },
        { q: "We _____ be late.", a: "won't", o: ["don't", "aren't", "didn't"], tag: ["國八", "未來式"] },

        // ----------------------------------------------------
        // [國八上] Unit 3: Patterns (句型/授與動詞)
        // ----------------------------------------------------
        { q: "My dad bought a bike _____ me.", a: "for", o: ["to", "of", "with"], tag: ["國八", "句型", "授與動詞"] },
        { q: "He gave the book _____ Mary.", a: "to", o: ["for", "of", "with"], tag: ["國八", "句型", "授與動詞"] },
        { q: "She sent me _____.", a: "a letter", o: ["to a letter", "for a letter", "at a letter"], tag: ["國八", "句型", "授與動詞"] },

        // ----------------------------------------------------
        // [國八下] Unit 1: Comparison (比較級)
        // ----------------------------------------------------
        { q: "He is _____ than me.", a: "taller", o: ["tall", "tallest", "more tall"], tag: ["國八", "比較級"] },
        { q: "This flower is _____ beautiful than that one.", a: "more", o: ["much", "very", "most"], tag: ["國八", "比較級"] },
        { q: "Who is the _____ student in class?", a: "smartest", o: ["smarter", "smart", "most smart"], tag: ["國八", "比較級"] }, // 最高級通常在比較級單元教

        // ----------------------------------------------------
        // [國八下] Unit 2: Verbs Pattern (動詞句型/不定詞)
        // ----------------------------------------------------
        { q: "It took me two hours _____ the work.", a: "to finish", o: ["finishing", "finish", "finished"], tag: ["國八", "動詞句型"] },
        { q: "I spent 100 dollars _____ the book.", a: "buying", o: ["to buy", "buy", "bought"], tag: ["國八", "動詞句型"] },
        { q: "He enjoys _____ music.", a: "listening to", o: ["to listen to", "listen to", "listened to"], tag: ["國八", "動詞句型"] },

        // ----------------------------------------------------
        // [國八下] Unit 3: Conjunctions (連接詞)
        // ----------------------------------------------------
        { q: "_____ he was sick, he went to school.", a: "Although", o: ["Because", "So", "If"], tag: ["國八", "連接詞"] },
        { q: "Wash your hands _____ you eat.", a: "before", o: ["so", "because", "but"], tag: ["國八", "連接詞"] },
        { q: "I was sleeping _____ the phone rang.", a: "when", o: ["because", "if", "so"], tag: ["國八", "連接詞"] },

        // ----------------------------------------------------
        // [國九上] Unit 1: Present Perfect (現在完成式)
        // ----------------------------------------------------
        { q: "I _____ been to Japan twice.", a: "have", o: ["has", "am", "did"], tag: ["國九", "現在完成式"] },
        { q: "She _____ lived here since 2010.", a: "has", o: ["have", "is", "was"], tag: ["國九", "現在完成式"] },
        { q: "Have you _____ finished your homework?", a: "already", o: ["yet", "ever", "never"], tag: ["國九", "現在完成式"] },

        // ----------------------------------------------------
        // [國九上] Unit 2: Passive Voice (被動語態)
        // ----------------------------------------------------
        { q: "The apple _____ by him.", a: "was eaten", o: ["ate", "eaten", "was eating"], tag: ["國九", "被動語態"] },
        { q: "English _____ in the USA.", a: "is spoken", o: ["speaks", "spoke", "speaking"], tag: ["國九", "被動語態"] },
        { q: "The work must _____ be done.", a: "be", o: ["is", "was", "been"], tag: ["國九", "被動語態"] },

        // ----------------------------------------------------
        // [國九上/下] Unit 3/1: Relative Clause (關係子句)
        // ----------------------------------------------------
        { q: "The boy _____ is running is Tom.", a: "who", o: ["which", "whose", "whom"], tag: ["國九", "關係子句"] },
        { q: "This is the car _____ I bought.", a: "which", o: ["who", "whose", "where"], tag: ["國九", "關係子句"] },
        { q: "The man _____ hair is red is my teacher.", a: "whose", o: ["who", "which", "that"], tag: ["國九", "關係子句"] },

        // ----------------------------------------------------
        // [國九下] Unit 2: Noun Clauses (名詞子句)
        // ----------------------------------------------------
        { q: "I don't know _____ he is.", a: "who", o: ["that", "which", "weather"], tag: ["國九", "名詞子句"] },
        { q: "Tell me _____ you live.", a: "where", o: ["what", "which", "that"], tag: ["國九", "名詞子句"] },
        { q: "He said _____ he was hungry.", a: "that", o: ["what", "which", "where"], tag: ["國九", "名詞子句"] },

        // ----------------------------------------------------
        // [高一上] Unit 1: Sentence Structure (句型)
        // ----------------------------------------------------
        { q: "The news made him _____.", a: "happy", o: ["happily", "happiness", "to happy"], tag: ["高一", "句型"] }, // S+V+O+OC
        { q: "I found the book _____.", a: "interesting", o: ["interest", "interested", "interestingly"], tag: ["高一", "句型"] },
        
        // ----------------------------------------------------
        // [高一上] Unit 2: Perfect Tenses (完成式 - 進階)
        // ----------------------------------------------------
        { q: "By next year, I _____ here for ten years.", a: "will have lived", o: ["live", "lived", "have lived"], tag: ["高一", "完成式"] },
        { q: "The movie _____ when we arrived.", a: "had started", o: ["starts", "started", "has started"], tag: ["高一", "完成式"] },

        // ----------------------------------------------------
        // [高一下] Unit 1: Participles (分詞)
        // ----------------------------------------------------
        { q: "The girl _____ in the corner is shy.", a: "standing", o: ["stood", "stands", "stand"], tag: ["高一", "分詞"] },
        { q: "_____ by the dog, he went to the hospital.", a: "Bitten", o: ["Biting", "Bit", "To bite"], tag: ["高一", "分詞"] },

        // ----------------------------------------------------
        // [高一下] Unit 2: Infinitives (不定詞)
        // ----------------------------------------------------
        { q: "It is dangerous _____ swim here.", a: "to", o: ["for", "of", "with"], tag: ["高一", "不定詞"] },
        { q: "She is too tired _____ walk.", a: "to", o: ["for", "that", "so"], tag: ["高一", "不定詞"] },

        // ----------------------------------------------------
        // [高二上] Unit 1: Subjunctive Mood (假設語氣)
        // ----------------------------------------------------
        { q: "If I _____ a bird, I would fly to you.", a: "were", o: ["am", "was", "be"], tag: ["高二", "假設語氣"] },
        { q: "I wish I _____ richer.", a: "were", o: ["am", "will be", "can be"], tag: ["高二", "假設語氣"] },

        // ----------------------------------------------------
        // [高二上] Unit 2: Inversion (倒裝句)
        // ----------------------------------------------------
        { q: "Never _____ I seen such a big apple.", a: "have", o: ["had", "did", "do"], tag: ["高二", "倒裝句"] },
        { q: "Only then _____ I realize my mistake.", a: "did", o: ["do", "have", "had"], tag: ["高二", "倒裝句"] },

        // ----------------------------------------------------
        // [高二下] Unit 2: Compound Adj (複合形容詞)
        // ----------------------------------------------------
        { q: "He is a _____ boy.", a: "ten-year-old", o: ["ten-years-old", "ten years old", "ten-year old"], tag: ["高二", "複合形容詞"] },
        { q: "This is a _____ map.", a: "hand-made", o: ["hand-make", "hand-making", "making-hand"], tag: ["高二", "複合形容詞"] }
    ];
    grammarDB.forEach((item, idx) => {
    const id = `eng_aligned_${idx}`;
    
    const rawTags = item.tag || item.t || [];
    const tags = ["english", "eng", "英文", "文法", ...rawTags];

    const generatorFunc = () => {
        const allOpts = [item.a, ...item.o];
        const shuffledOpts = Utils.shuffle(allOpts);

        return {
            question: `Complete the sentence: "${item.q}"`,
            options: shuffledOpts,
            answer: shuffledOpts.indexOf(item.a),
            concept: rawTags[1] || "Grammar",
            explanation: [`Correct answer: ${item.a}`],
            subject: "english",
            tags: tags
        };
    };

    generatorFunc.subject = "english";
    generatorFunc.tags = tags;
    
    window.__ENGLISH_REPO__[id] = {
        func: generatorFunc,
        tags: tags,
        subject: "english"
    };
});


    console.log(`✅ [English] 已成功載入 ${grammarDB.length} 題精準對齊標籤的題目。`);

})(window);
