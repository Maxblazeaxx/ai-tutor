/**
 * Predefined Fixed Sign Language Dataset (96 Signs - Complete A-Z Alphabet & Essentials)
 * Categories:
 * 1. Social & Emotions (Good, Bad, Please, Thank You, Happy, Sad, Yes, No, etc.)
 * 2. Communication & Questions (Help, Understand, What, Why, How, Stop, etc.)
 * 3. Daily Life & Actions (Eat, Drink, Sleep, Go, Come, See, Read, Write, etc.)
 * 4. Science & STEM (Sun, Water, Plant, Hot, Cold, Big, Small, Light, etc.)
 * 5. Numbers & Alphabet Foundation (1-10, A-E essentials)
 *
 * Disclaimer note: placeholder glosses, not verified ISL/ASL.
 */

export const PREDEFINED_SIGNS = [
  // ==========================================
  // 1. Social & Emotions (1-15)
  // ==========================================
  {
    id: "sign_good",
    term: "Good",
    category: "Social & Emotions",
    gloss: "GOOD / THUMBS-UP",
    svgType: "thumbs_up",
    handshape: "Closed fist with thumb upright (A-shape / Thumbs-up)",
    dominantHand: "Right hand / Dominant",
    movement: "Held upright firmly or moves forward slightly with a nod",
    location: "Chest level, in front of torso",
    description: "Dominant hand forms a clear upright thumbs-up gesture, signaling approval, goodness, and success.",
    steps: [
      "Make a soft fist with your dominant hand.",
      "Extend your thumb straight up towards the ceiling.",
      "Hold at chest level and give a pleasant, affirming facial expression."
    ],
    usageTip: "Universal sign used to say 'Good job!', 'Fine', or 'Well done!'."
  },
  {
    id: "sign_bad",
    term: "Bad",
    category: "Social & Emotions",
    gloss: "BAD / THUMBS-DOWN",
    svgType: "thumbs_down",
    handshape: "Closed fist with thumb pointing down",
    dominantHand: "Right hand / Dominant",
    movement: "Fist held with thumb pointing downward firmly",
    location: "Mid-torso level",
    description: "Dominant hand makes a downward thumbs-down gesture indicating disfavor, incorrectness, or bad condition.",
    steps: [
      "Make a fist with your dominant hand.",
      "Extend your thumb straight downward toward the floor.",
      "Hold firmly with a slight head shake to emphasize 'bad'."
    ],
    usageTip: "Opposite of Good. Used for 'Wrong', 'Not good', or 'Dislike'."
  },
  {
    id: "sign_yes",
    term: "Yes",
    category: "Social & Emotions",
    gloss: "YES / FIST-NOD",
    svgType: "fist_nod",
    handshape: "S-handshape (closed fist)",
    dominantHand: "Dominant hand",
    movement: "Knuckles tilt downward twice like a nodding head",
    location: "Chest level",
    description: "Closed fist nods up and down at the wrist, mimicking a head nodding yes.",
    steps: [
      "Form a fist with your thumb resting across your curled fingers.",
      "Tilt your wrist down, then back up, repeating twice.",
      "Combine with an affirmative head nod."
    ],
    usageTip: "Used for agreement, confirmation, and answering yes to questions."
  },
  {
    id: "sign_no",
    term: "No",
    category: "Social & Emotions",
    gloss: "NO / THREE-FINGER-SNAP",
    svgType: "pinch_close",
    handshape: "Index and middle fingers extended together with thumb",
    dominantHand: "Dominant hand",
    movement: "Index and middle finger snap shut against the thumb",
    location: "Upper chest, slightly forward",
    description: "The index and middle fingers snap down quickly against the thumb, representing a decisive closing.",
    steps: [
      "Extend your index and middle fingers side by side.",
      "Extend your thumb underneath them like an open beak.",
      "Snap the two fingers down firmly against the thumb once or twice."
    ],
    usageTip: "Quick, firm denial. Often paired with a head shake."
  },
  {
    id: "sign_please",
    term: "Please",
    category: "Social & Emotions",
    gloss: "PLEASE / CHEST-CIRCLE",
    svgType: "palm_circle",
    handshape: "Open flat palm with fingers together (B-handshape)",
    dominantHand: "Dominant hand",
    movement: "Rub in a clockwise circle flat over the heart/center chest",
    location: "Center of chest over sternum",
    description: "Flat open hand circles gently over the center of the chest with a polite smile.",
    steps: [
      "Flatten your dominant hand with fingers held closely together.",
      "Place your palm flat against the center of your chest.",
      "Circle your palm in a gentle clockwise direction 2-3 times."
    ],
    usageTip: "Polite request sign showing warmth and gratitude."
  },
  {
    id: "sign_thank_you",
    term: "Thank You",
    category: "Social & Emotions",
    gloss: "THANK-YOU / CHIN-OUTWARD",
    svgType: "chin_forward",
    handshape: "Flat B-handshape (open palm, fingers together)",
    dominantHand: "Dominant hand",
    movement: "Fingertips touch chin/lips, then hand moves forward toward person",
    location: "Starts at chin/lips, extends outward",
    description: "Flat hand fingertips touch the chin gently and extend forward toward the listener.",
    steps: [
      "Touch the tips of your fingers lightly to your chin.",
      "Move your hand smoothly outward and slightly downward toward the listener.",
      "Smile and tilt your head forward respectfully."
    ],
    usageTip: "Expresses thanks. Both hands can be used for deep gratitude ('Thank you so much!')."
  },
  {
    id: "sign_hello",
    term: "Hello / Hi",
    category: "Social & Emotions",
    gloss: "HELLO / TEMPLE-SALUTE",
    svgType: "open_wave",
    handshape: "Open 5-handshape or flat B-hand",
    dominantHand: "Dominant hand",
    movement: "Starts near temple/forehead, waves or sweeps outward",
    location: "Head height, beside forehead",
    description: "Hand waves cheerfully from the side of the forehead outward in friendly greeting.",
    steps: [
      "Raise your hand to the side of your forehead with palm facing forward.",
      "Move the hand outward in an open salute or gentle side-to-side wave.",
      "Make friendly eye contact."
    ],
    usageTip: "Warm greeting for meeting peers, teachers, or friends."
  },
  {
    id: "sign_goodbye",
    term: "Goodbye",
    category: "Social & Emotions",
    gloss: "GOODBYE / WAVE",
    svgType: "wave_goodbye",
    handshape: "Open 5-handshape",
    dominantHand: "Dominant hand",
    movement: "Fingers fold toward palm and open repeatedly (open-close wave)",
    location: "Shoulder height",
    description: "Open palm faces front and fingers flex down toward the palm repeatedly.",
    steps: [
      "Raise your open hand to shoulder level, palm facing outward.",
      "Bend all four fingers down toward your palm and open them back up.",
      "Repeat 2-3 times while waving farewell."
    ],
    usageTip: "Universal farewell gesture recognized globally."
  },
  {
    id: "sign_happy",
    term: "Happy",
    category: "Social & Emotions",
    gloss: "HAPPY / UPWARD-SWEEP",
    svgType: "upward_sweep",
    handshape: "Open flat palms facing inward toward body",
    dominantHand: "Both hands",
    movement: "Palms brush upward against chest in circular rising motions",
    location: "Chest area",
    description: "Both open palms brush upward against the chest repeatedly, conveying bubbling joy.",
    steps: [
      "Hold both open palms facing your chest.",
      "Brush your palms upward against your chest in light, rising circles.",
      "Smile brightly with animated eyes to show true happiness."
    ],
    usageTip: "Rising movements represent buoyant, joyful spirits."
  },
  {
    id: "sign_sad",
    term: "Sad",
    category: "Social & Emotions",
    gloss: "SAD / FACE-DOWNWARD",
    svgType: "face_downward",
    handshape: "Slightly bent 5-handshape (claw-like/open)",
    dominantHand: "Both hands or dominant hand",
    movement: "Hands begin in front of face and sink downward slowly",
    location: "Face to upper chest",
    description: "Open hands in front of eyes drift downward like falling tears while head tilts down.",
    steps: [
      "Bring both open hands in front of your face with fingers slightly curved.",
      "Slowly draw your hands downward toward your chest.",
      "Lower your head and adopt a downcast facial expression."
    ],
    usageTip: "Facial expression is 80% of emotional signs in sign communication."
  },
  {
    id: "sign_love",
    term: "Love",
    category: "Social & Emotions",
    gloss: "LOVE / CHEST-CROSS",
    svgType: "arms_cross",
    handshape: "Both hands in closed S-fists",
    dominantHand: "Both hands",
    movement: "Cross wrists/forearms tightly over the chest/heart",
    location: "Center of chest",
    description: "Both fists cross over the chest in a warm self-hug over the heart.",
    steps: [
      "Form gentle fists with both hands.",
      "Cross your forearms tightly over your chest, holding close to your heart.",
      "Tilt head slightly with a gentle, loving smile."
    ],
    usageTip: "Universal sign of deep affection, family love, and friendship."
  },
  {
    id: "sign_friend",
    term: "Friend",
    category: "Social & Emotions",
    gloss: "FRIEND / HOOKED-FINGERS",
    svgType: "interlock_hooks",
    handshape: "Both index fingers curved like hooks (X-handshape)",
    dominantHand: "Both hands",
    movement: "Index finger hooks interlock once, then flip and interlock again",
    location: "Chest level",
    description: "Curved index fingers hook together like a linked chain, then reverse positions.",
    steps: [
      "Hook your right index finger over your left hooked index finger.",
      "Unhook, flip hands, and hook the left index finger over the right.",
      "Shows a mutual, unbreakable bond between two people."
    ],
    usageTip: "Represents two people linked together in trust and companionship."
  },
  {
    id: "sign_sorry",
    term: "Sorry / Apologize",
    category: "Social & Emotions",
    gloss: "SORRY / FIST-RUB-CHEST",
    svgType: "fist_circle",
    handshape: "A-handshape (closed fist with thumb alongside)",
    dominantHand: "Dominant hand",
    movement: "Rub knuckles in clockwise circles over the heart",
    location: "Over heart / left chest",
    description: "Closed fist rubs in small circles over the heart with an apologetic expression.",
    steps: [
      "Make a fist with your thumb resting against the side of your index finger.",
      "Place knuckles flat against your chest over your heart.",
      "Rotate in a circular motion 2-3 times with a remorseful face."
    ],
    usageTip: "Indicates genuine apology, regret, or forgiveness."
  },
  {
    id: "sign_like",
    term: "Like",
    category: "Social & Emotions",
    gloss: "LIKE / THUMB-CHEST-PULL",
    svgType: "pinch_pull",
    handshape: "Thumb and middle finger open, then pinch together",
    dominantHand: "Dominant hand",
    movement: "Middle finger and thumb touch chest, then pull forward while pinching",
    location: "Center chest pulling forward",
    description: "Thumb and middle finger rest on chest, then pull outward while closing together.",
    steps: [
      "Place your thumb and middle finger against your chest with index finger up.",
      "Pull your hand forward a few inches while pinching thumb and middle finger together.",
      "Keep remaining fingers gently extended."
    ],
    usageTip: "Feels like pulling something good from inside your heart."
  },
  {
    id: "sign_dislike",
    term: "Don't Like",
    category: "Social & Emotions",
    gloss: "DISLIKE / DROP-AWAY",
    svgType: "pinch_drop",
    handshape: "Same as 'Like' then flick fingers downward",
    dominantHand: "Dominant hand",
    movement: "Pull from chest like 'Like', then abruptly twist and flick hand away",
    location: "Chest throwing downward",
    description: "Pull hand from chest and flick fingers outward as if tossing something away.",
    steps: [
      "Start with the 'Like' handshape on your chest.",
      "Pull forward, then abruptly open fingers and flick hand downward/away.",
      "Accompany with a wrinkling nose or shaking head."
    ],
    usageTip: "The flick away visualizes discarding something you do not enjoy."
  },

  // ==========================================
  // 2. Communication & Classroom (16-30)
  // ==========================================
  {
    id: "sign_help",
    term: "Help",
    category: "Communication",
    gloss: "HELP / THUMB-UP-ON-PALM",
    svgType: "palm_lift",
    handshape: "Dominant thumbs-up resting on non-dominant flat palm",
    dominantHand: "Both hands",
    movement: "Flat palm lifts the thumbs-up hand upward together",
    location: "Torso level moving upward",
    description: "A thumbs-up fist rests on a flat open palm, which lifts it upward like a helping platform.",
    steps: [
      "Hold your non-dominant hand flat, palm facing up.",
      "Place your dominant thumbs-up fist on top of the flat palm.",
      "Lift both hands upward together toward the person needing help."
    ],
    usageTip: "To sign 'Help me', move the hands toward your chest. To sign 'I help you', move them forward."
  },
  {
    id: "sign_stop",
    term: "Stop",
    category: "Communication",
    gloss: "STOP / CHOP-PALM",
    svgType: "palm_chop",
    handshape: "Dominant flat hand, non-dominant flat palm up",
    dominantHand: "Both hands",
    movement: "Dominant hand's pinky edge chops down firmly onto the flat open palm",
    location: "Chest level",
    description: "Open dominant hand comes down in a crisp, sharp chop onto the open resting palm.",
    steps: [
      "Extend non-dominant palm flat, facing upward.",
      "Raise dominant flat hand slightly above it with fingers straight.",
      "Bring the side of your dominant hand down firmly onto the palm like a barrier."
    ],
    usageTip: "A decisive, clear boundary sign meaning halt, finish, or cease."
  },
  {
    id: "sign_understand",
    term: "Understand",
    category: "Communication",
    gloss: "UNDERSTAND / FLICK-FOREHEAD",
    svgType: "forehead_flick",
    handshape: "Fist with index finger flicking up (lightbulb effect)",
    dominantHand: "Dominant hand",
    movement: "Index finger flicks up beside temple like a light bulb turning on",
    location: "Beside forehead",
    description: "Index finger flicks up from a closed fist right next to the forehead, symbolizing an idea clicking.",
    steps: [
      "Hold a loose fist near the side of your forehead, knuckles facing out.",
      "Flick your index finger straight up like a light bulb snapping on.",
      "Nod affirmatively to show 'I understand!'."
    ],
    usageTip: "For 'Don't understand', flick while shaking your head no."
  },
  {
    id: "sign_what",
    term: "What?",
    category: "Communication",
    gloss: "WHAT / PALMS-UP-SHRUG",
    svgType: "palms_shrug",
    handshape: "Both open 5-hands facing upward",
    dominantHand: "Both hands",
    movement: "Palms shake gently side to side with furrowed brow",
    location: "Waist/chest height",
    description: "Both hands held open, palms up, shaking slightly side to side with an inquisitive questioning face.",
    steps: [
      "Hold both hands at waist height, palms facing up, fingers relaxed.",
      "Shake both hands gently side-to-side a couple of times.",
      "Furrow your eyebrows inquisitively (question face)."
    ],
    usageTip: "Essential Wh-question sign in sign language conversations."
  },
  {
    id: "sign_why",
    term: "Why?",
    category: "Communication",
    gloss: "WHY / FOREHEAD-PULL-Y",
    svgType: "forehead_y_pull",
    handshape: "Open flat fingers pulling into a 'Y' handshape",
    dominantHand: "Dominant hand",
    movement: "Fingertips touch temple, pull away into a Y-shape (thumb + pinky out)",
    location: "Temple down to shoulder",
    description: "Touch temple with flat fingers, then pull hand away while dropping middle fingers into a Y-shape.",
    steps: [
      "Touch the fingertips of your dominant hand to your temple.",
      "Pull your hand away and down while dropping your middle three fingers.",
      "Finish with thumb and pinky extended (Y-handshape) while furrowing brow."
    ],
    usageTip: "Used for inquiry, reasons, and scientific questions."
  },
  {
    id: "sign_where",
    term: "Where?",
    category: "Communication",
    gloss: "WHERE / INDEX-WAG",
    svgType: "index_wag",
    handshape: "Index 1-finger pointed straight up",
    dominantHand: "Dominant hand",
    movement: "Index finger wags side to side like a windshield wiper",
    location: "Chest level",
    description: "Index finger points straight up and oscillates side to side asking for location.",
    steps: [
      "Extend your index finger straight up with palm facing forward.",
      "Wiggle/pivot your finger side-to-side from the wrist.",
      "Furrow eyebrows with an inquisitive look looking around."
    ],
    usageTip: "Locational question sign for places and lost items."
  },
  {
    id: "sign_who",
    term: "Who?",
    category: "Communication",
    gloss: "WHO / CHIN-CIRCLE",
    svgType: "chin_circle",
    handshape: "L-handshape with thumb touching chin",
    dominantHand: "Dominant hand",
    movement: "Thumb rests on chin, index finger wiggles up and down",
    location: "Chin area",
    description: "Place thumb on chin and wag index finger up and down while puckering lips slightly.",
    steps: [
      "Form an 'L' shape with thumb and index finger.",
      "Rest the tip of your thumb right on your chin.",
      "Wiggle your extended index finger up and down like a questioning beak."
    ],
    usageTip: "Used to ask about people, teachers, and classmates."
  },
  {
    id: "sign_how",
    term: "How?",
    category: "Communication",
    gloss: "HOW / ROLLING-KNUCKLES",
    svgType: "rolling_knuckles",
    handshape: "Both hands curved with knuckles touching, palms facing down",
    dominantHand: "Both hands",
    movement: "Roll hands outward so palms turn upward in questioning pose",
    location: "Mid-chest level",
    description: "Back of curved fingers touch, then roll forward and open with palms facing upward.",
    steps: [
      "Cup both hands with thumbs pointing up and back of knuckles touching.",
      "Roll both wrists outward until palms face upward.",
      "Furrow eyebrows and tilt head slightly."
    ],
    usageTip: "Used to ask about processes, methods, and mechanism steps."
  },
  {
    id: "sign_again",
    term: "Again / Repeat",
    category: "Communication",
    gloss: "AGAIN / CURVED-HAND-ARC",
    svgType: "curved_arc",
    handshape: "Dominant bent hand, non-dominant flat palm",
    dominantHand: "Both hands",
    movement: "Bent dominant hand arcs in a semicircle into the flat palm",
    location: "Chest level",
    description: "Bent fingers of dominant hand jump up and land in the center of the flat open palm.",
    steps: [
      "Hold non-dominant hand flat, palm facing inward or upward.",
      "Bend dominant fingers at right angle (bent B-hand).",
      "Arc dominant hand upward and land fingertips directly into the flat palm."
    ],
    usageTip: "Very helpful for learners needing repetition: 'Please show again!'."
  },
  {
    id: "sign_slow",
    term: "Slow",
    category: "Communication",
    gloss: "SLOW / PALM-GLIDE",
    svgType: "palm_glide",
    handshape: "Both hands flat (B-handshape)",
    dominantHand: "Both hands",
    movement: "Dominant hand strokes very slowly up the back of non-dominant hand/arm",
    location: "Chest level",
    description: "Dominant open hand strokes slowly from wrist up the forearm of the other hand.",
    steps: [
      "Hold non-dominant hand palm down in front of you.",
      "Place dominant hand flat on the back of the non-dominant wrist.",
      "Draw it slowly upward toward the elbow."
    ],
    usageTip: "Crucial sign for pacing: 'Please sign slower' or 'Slow down'."
  },
  {
    id: "sign_wait",
    term: "Wait",
    category: "Communication",
    gloss: "WAIT / WIGGLE-FINGERS",
    svgType: "wiggle_fingers",
    handshape: "Both open 5-hands facing inward/upward",
    dominantHand: "Both hands",
    movement: "Fingers wiggle rhythmically while hands stay parked in space",
    location: "Chest level held out",
    description: "Both hands held in front with palms up, wiggling fingers in waiting rhythm.",
    steps: [
      "Hold both hands out at chest level, palms angled upward.",
      "Wiggle all ten fingers continuously like playing an invisible piano.",
      "Hold steady in place to signify pausing."
    ],
    usageTip: "Indicates 'Wait a moment', 'Hold on', or 'Give me time'."
  },
  {
    id: "sign_finish",
    term: "Finished / Done",
    category: "Communication",
    gloss: "FINISH / FLICK-OUT",
    svgType: "flick_out",
    handshape: "Both open 5-hands facing chest",
    dominantHand: "Both hands",
    movement: "Both hands twist outward so palms face down/front decisively",
    location: "Chest level",
    description: "Both open hands start facing the chest, then flip outward quickly with palms facing away.",
    steps: [
      "Hold both 5-hands facing your chest with fingers spread.",
      "Flick both wrists outward simultaneously so palms face front.",
      "Mouth 'fish' or 'done' for full expression."
    ],
    usageTip: "Used to signal task completion, lesson end, or 'All done!'."
  },
  {
    id: "sign_look",
    term: "Look / Watch",
    category: "Communication",
    gloss: "LOOK / V-HAND-EYES",
    svgType: "v_from_eyes",
    handshape: "V-handshape (two fingers extended like eyes)",
    dominantHand: "Dominant hand",
    movement: "Fingertips start near eyes and point outward toward object",
    location: "Eyes moving forward",
    description: "Two fingers point from your eyes toward what you want the learner to observe.",
    steps: [
      "Make a 'V' sign with your index and middle finger.",
      "Place fingertips near your cheekbones just beneath your eyes.",
      "Move the hand forward in the direction of the screen, book, or board."
    ],
    usageTip: "Essential visual prompt directing attention to visual animations."
  },
  {
    id: "sign_listen",
    term: "Listen / Pay Attention",
    category: "Communication",
    gloss: "LISTEN / CUPPED-EAR",
    svgType: "cup_ear",
    handshape: "Cupped C-handshape",
    dominantHand: "Dominant hand",
    movement: "Curved hand cups behind the ear",
    location: "Beside ear",
    description: "Curved open hand cups behind the ear, showing intent to listen or sound awareness.",
    steps: [
      "Cup your dominant hand slightly.",
      "Place your palm behind your ear with fingertips curling around it.",
      "Tilt head slightly toward the sound source."
    ],
    usageTip: "Used in inclusive settings for audio prompts, vibration, or alerts."
  },
  {
    id: "sign_learn",
    term: "Learn",
    category: "Communication",
    gloss: "LEARN / PALM-TO-FOREHEAD",
    svgType: "palm_to_forehead",
    handshape: "Non-dominant flat palm, dominant grasping into forehead",
    dominantHand: "Both hands",
    movement: "Dominant hand takes information from flat palm and places it into forehead",
    location: "Palm to forehead",
    description: "Dominant fingers scoop up knowledge from the open palm and absorb it into the forehead.",
    steps: [
      "Hold non-dominant hand flat like an open book, palm facing up.",
      "Place dominant fingertips flat on the book palm.",
      "Lift fingers while closing into a pinch and touch your forehead."
    ],
    usageTip: "Beautiful sign capturing the visual taking of knowledge into the mind."
  },

  // ==========================================
  // 3. Daily Life & Common Actions (31-45)
  // ==========================================
  {
    id: "sign_eat",
    term: "Eat / Food",
    category: "Daily Life",
    gloss: "EAT / FLAT-O-MOUTH",
    svgType: "mouth_tap",
    handshape: "Flattened O-handshape (fingertips touching thumb)",
    dominantHand: "Dominant hand",
    movement: "Fingertips tap gently against the mouth twice",
    location: "Lips / mouth",
    description: "Flattened hand taps toward lips repeatedly like bringing morsels of food to eat.",
    steps: [
      "Bring all fingertips together to touch your thumb tip (flattened O).",
      "Tap your fingertips lightly against your closed lips twice.",
      "Keep movement small and comfortable."
    ],
    usageTip: "Used for both the action 'to eat' and the noun 'food/meal'."
  },
  {
    id: "sign_drink",
    term: "Drink",
    category: "Daily Life",
    gloss: "DRINK / C-HAND-CUP",
    svgType: "cup_tilt",
    handshape: "C-handshape like holding a water glass",
    dominantHand: "Dominant hand",
    movement: "C-hand mimics tipping a drinking cup to the mouth",
    location: "Mouth level",
    description: "Curved hand holds an imaginary glass and tips it up to the lips as if drinking.",
    steps: [
      "Form a 'C' with your dominant hand like wrapping around a cup.",
      "Bring the thumb side to your lower lip.",
      "Tip your hand back slightly as if drinking refreshing water."
    ],
    usageTip: "Common essential sign for asking for water or juice."
  },
  {
    id: "sign_water",
    term: "Water",
    category: "Daily Life",
    gloss: "WATER / W-CHIN",
    svgType: "w_chin",
    handshape: "W-handshape (three middle fingers extended, pinky held by thumb)",
    dominantHand: "Dominant hand",
    movement: "Index finger of W taps twice gently against the chin",
    location: "Chin",
    description: "W-hand taps the chin twice with the index finger.",
    steps: [
      "Hold your three middle fingers straight up spread slightly (W-hand).",
      "Bring the side of your index finger to your chin.",
      "Tap gently twice on your chin."
    ],
    usageTip: "Fundamental survival sign and primary science concept."
  },
  {
    id: "sign_sleep",
    term: "Sleep",
    category: "Daily Life",
    gloss: "SLEEP / FACE-CLOSE",
    svgType: "face_close",
    handshape: "Open 5-hand drawn down face into flattened O",
    dominantHand: "Dominant hand",
    movement: "Hand moves down across face while fingers close and eyes shut",
    location: "Forehead down to chin",
    description: "Open hand passes down over the face as eyes close and fingers gently draw together.",
    steps: [
      "Hold your open hand in front of your forehead, palm facing you.",
      "Draw the hand slowly down over your face.",
      "Close your fingers into a soft pinch at your chin while letting your eyes close."
    ],
    usageTip: "Represents eyelids closing for peaceful, restorative sleep."
  },
  {
    id: "sign_go",
    term: "Go",
    category: "Daily Life",
    gloss: "GO / INDEX-ROLL-OUT",
    svgType: "index_forward",
    handshape: "Both index 1-fingers",
    dominantHand: "Both hands or dominant",
    movement: "Index fingers point up then roll in an arc forward away from body",
    location: "Chest level moving forward",
    description: "Both index fingers swing forward together in an arc pointing away.",
    steps: [
      "Point both index fingers upward, palms facing you.",
      "Roll wrists forward so both index fingers point straight out away from you.",
      "Decisive forward direction."
    ],
    usageTip: "Directional sign meaning leave, move forward, or travel."
  },
  {
    id: "sign_come",
    term: "Come",
    category: "Daily Life",
    gloss: "COME / INDEX-ROLL-IN",
    svgType: "index_inward",
    handshape: "Both index 1-fingers",
    dominantHand: "Both hands",
    movement: "Index fingers roll in an inward arc toward your chest",
    location: "Extended moving toward chest",
    description: "Both index fingers beckon inward in an inviting circular arc toward yourself.",
    steps: [
      "Point index fingers outward away from your body.",
      "Roll wrists inward so fingers point back toward your chest.",
      "Welcoming, inviting motion."
    ],
    usageTip: "Invitation sign meaning 'Come here' or 'Join us'."
  },
  {
    id: "sign_read",
    term: "Read",
    category: "Daily Life",
    gloss: "READ / V-SCAN-PALM",
    svgType: "v_scan",
    handshape: "V-handshape scanning flat non-dominant palm",
    dominantHand: "Both hands",
    movement: "Two V-fingers scan down the flat open palm like eyes reading lines of text",
    location: "Chest level",
    description: "V-fingers act like scanning eyes moving down the flat page of the other hand.",
    steps: [
      "Hold non-dominant hand flat, fingers together, like an open book page.",
      "Make a 'V' with dominant hand (two eyes).",
      "Move V-fingers down the page twice as if reading sentences."
    ],
    usageTip: "Essential for study, literacy, and reading assignments."
  },
  {
    id: "sign_write",
    term: "Write",
    category: "Daily Life",
    gloss: "WRITE / PEN-ON-PALM",
    svgType: "pen_palm",
    handshape: "Dominant pinch (holding pen), non-dominant flat palm (paper)",
    dominantHand: "Both hands",
    movement: "Dominant hand scribbles across the flat palm paper",
    location: "Chest level",
    description: "Pinching fingers simulate a pencil scribbling across an open flat palm notepad.",
    steps: [
      "Hold non-dominant palm open flat facing up like paper.",
      "Pinch dominant thumb and index finger together like holding a pencil.",
      "Wiggle across the palm from left to right as if writing words."
    ],
    usageTip: "Used for writing notes, answering quizzes, or drawing."
  },
  {
    id: "sign_play",
    term: "Play",
    category: "Daily Life",
    gloss: "PLAY / Y-HANDS-TWIST",
    svgType: "y_twist",
    handshape: "Both hands in 'Y' shape (thumb and pinky extended)",
    dominantHand: "Both hands",
    movement: "Both Y-hands shake playfully back and forth at the wrists",
    location: "Chest level",
    description: "Both hands make the 'Y' shape and shake happily side to side.",
    steps: [
      "Extend your thumb and pinky on both hands while curling middle fingers.",
      "Hold both hands out at chest level.",
      "Twist wrists back and forth playfully in energetic harmony."
    ],
    usageTip: "Joyful sign for games, recess, sports, and fun."
  },
  {
    id: "sign_family",
    term: "Family",
    category: "Daily Life",
    gloss: "FAMILY / F-CIRCLE",
    svgType: "f_circle",
    handshape: "Both hands in 'F' shape (index and thumb touch, other 3 up)",
    dominantHand: "Both hands",
    movement: "Both F-hands touch index/thumb in front, circle around, and touch pinkies",
    location: "Chest level circular arc",
    description: "Both hands form 'F' shapes and circle around together, enclosing the family unit.",
    steps: [
      "Form 'F' handshapes with both hands (index and thumb tips touching).",
      "Start with thumbs touching in front of your chest.",
      "Circle both hands outward and back around until pinky sides touch together."
    ],
    usageTip: "Enclosing circle represents the loving family circle."
  },
  {
    id: "sign_mother",
    term: "Mother / Mom",
    category: "Daily Life",
    gloss: "MOTHER / CHIN-THUMB",
    svgType: "chin_thumb_tap",
    handshape: "Open 5-hand with thumb touching chin",
    dominantHand: "Dominant hand",
    movement: "Thumb taps chin twice gently with fingers spread open",
    location: "Chin",
    description: "Open 5-hand taps thumb against the chin twice. Female signs cluster at the lower face.",
    steps: [
      "Spread all 5 fingers open wide.",
      "Place the tip of your thumb gently on your chin.",
      "Tap the chin lightly twice."
    ],
    usageTip: "Lower face region traditionally denotes feminine family relations in sign language."
  },
  {
    id: "sign_father",
    term: "Father / Dad",
    category: "Daily Life",
    gloss: "FATHER / FOREHEAD-THUMB",
    svgType: "forehead_thumb_tap",
    handshape: "Open 5-hand with thumb touching forehead",
    dominantHand: "Dominant hand",
    movement: "Thumb taps forehead twice gently with fingers spread open",
    location: "Forehead",
    description: "Open 5-hand taps thumb against the forehead twice. Male signs cluster at upper face.",
    steps: [
      "Spread all 5 fingers open wide.",
      "Place the tip of your thumb gently on your forehead.",
      "Tap the forehead lightly twice."
    ],
    usageTip: "Upper face/cap region traditionally denotes masculine family relations."
  },
  {
    id: "sign_house",
    term: "House",
    category: "Daily Life",
    gloss: "HOUSE / ROOF-WALLS",
    svgType: "roof_walls",
    handshape: "Both flat B-hands",
    dominantHand: "Both hands",
    movement: "Fingertips touch in a peaked roof triangle, then separate and trace walls down",
    location: "Chest level",
    description: "Hands outline the peaked roof of a house, then draw straight vertical walls downward.",
    steps: [
      "Touch fingertips of flat hands together at an angle to form a pointed roof.",
      "Separate hands and slide them straight downward to form the vertical walls.",
      "Clean architectural geometric outline."
    ],
    usageTip: "Draws the universal iconic shape of a home."
  },
  {
    id: "sign_book",
    term: "Book",
    category: "Daily Life",
    gloss: "BOOK / OPEN-PAGES",
    svgType: "open_book",
    handshape: "Both flat palms touching together like closed covers",
    dominantHand: "Both hands",
    movement: "Palms touch flat at pinkies and swing open like opening a storybook",
    location: "Chest level",
    description: "Palms held together swing open with pinkies staying joined like book pages.",
    steps: [
      "Place both flat palms together facing each other like a closed book.",
      "Keep the pinky edges joined while swinging your thumbs and palms wide open.",
      "Repeat open-and-close once."
    ],
    usageTip: "Iconic sign for textbooks, notebooks, and reading."
  },
  {
    id: "sign_time",
    term: "Time",
    category: "Daily Life",
    gloss: "TIME / TAP-WRIST",
    svgType: "wrist_tap",
    handshape: "Dominant index 1-finger, non-dominant wrist",
    dominantHand: "Dominant hand",
    movement: "Index finger taps the top of the non-dominant wrist twice",
    location: "Wrist (wristwatch position)",
    description: "Index finger points to and taps the wrist where a watch is worn.",
    steps: [
      "Hold non-dominant wrist forward like looking at a watch.",
      "Tap the back of the wrist twice with your dominant index fingertip.",
      "Keep facial expression attentive."
    ],
    usageTip: "Refers to clock time, schedules, and duration."
  },

  // ==========================================
  // 4. STEM, Science & Concepts (46-60)
  // ==========================================
  {
    id: "sign_sun",
    term: "Sun",
    category: "Science & Nature",
    gloss: "SUN / CIRCLE-RAYS",
    svgType: "sun_circle_rays",
    handshape: "Index finger draws circle, opens into beaming 5-hand",
    dominantHand: "Dominant hand",
    movement: "Draws circle in sky, then bursts open radiating downward rays",
    location: "Above head / upper space",
    description: "Index finger circles in high space, then opens into wide sunbeams streaming down.",
    steps: [
      "Reach up with your index finger and draw a small circle high in the air.",
      "Open your whole hand into a spread 5-hand.",
      "Stream the hand down toward your face like golden sunbeams."
    ],
    usageTip: "Central sign for astronomy, photosynthesis, and day."
  },
  {
    id: "sign_moon",
    term: "Moon",
    category: "Science & Nature",
    gloss: "MOON / CRESCENT-EYE",
    svgType: "crescent_hand",
    handshape: "C-handshape or thumb and index forming a crescent arch",
    dominantHand: "Dominant hand",
    movement: "Held by the right eye and moves upward toward nighttime sky",
    location: "Eye level moving up",
    description: "Thumb and index finger form a crescent around the eye and rise into the sky.",
    steps: [
      "Curve your thumb and index finger into a crescent 'C' shape.",
      "Hold near the corner of your eye looking through the crescent.",
      "Move the hand slightly upward and outward toward the sky."
    ],
    usageTip: "Visualizes the iconic glowing crescent of the night moon."
  },
  {
    id: "sign_star",
    term: "Star",
    category: "Science & Nature",
    gloss: "STAR / ALTERNATE-POINT",
    svgType: "alternate_point",
    handshape: "Both index fingers pointing upward",
    dominantHand: "Both hands",
    movement: "Index fingers brush upward alternately toward the night sky",
    location: "High chest to above head",
    description: "Both index fingers flick alternately upward like twinkling points of light in space.",
    steps: [
      "Point both index fingers straight up into the air.",
      "Alternate sliding the sides of your index fingers past each other upward.",
      "Repeat 3-4 times in quick, sparkling rhythm."
    ],
    usageTip: "Represents celestial stars twinkling across deep space."
  },
  {
    id: "sign_rain",
    term: "Rain",
    category: "Science & Nature",
    gloss: "RAIN / DOWNWARD-DROPS",
    svgType: "rain_drops",
    handshape: "Both hands clawed/curved 5-hands facing downward",
    dominantHand: "Both hands",
    movement: "Both hands drop downward from high to low in gentle pulsing waves",
    location: "Head level down to waist",
    description: "Curved fingers flutter downward repeatedly like raindrops falling from storm clouds.",
    steps: [
      "Hold both hands up at head height with fingers bent downward.",
      "Drop wrists down in short, repeated gentle pulses.",
      "Flutter fingers lightly like falling water droplets."
    ],
    usageTip: "Essential water cycle concept sign."
  },
  {
    id: "sign_hot",
    term: "Hot",
    category: "Science & Nature",
    gloss: "HOT / CLAW-FROM-MOUTH",
    svgType: "claw_from_mouth",
    handshape: "Clawed C-handshape at mouth",
    dominantHand: "Dominant hand",
    movement: "Clawed hand at mouth turns outward and drops away as if throwing hot food",
    location: "Mouth level flicking away",
    description: "Clawed hand touches mouth and quickly pulls away as if releasing hot steam.",
    steps: [
      "Form a curved claw hand in front of your open mouth.",
      "Turn your wrist quickly outward and away as if tossing away hot steam.",
      "Exhale with an open mouth to show heat."
    ],
    usageTip: "Used for hot weather, hot water, boiling temperatures, and fire."
  },
  {
    id: "sign_cold",
    term: "Cold / Shiver",
    category: "Science & Nature",
    gloss: "COLD / SHIVER-FISTS",
    svgType: "shiver_fists",
    handshape: "Both closed S-fists",
    dominantHand: "Both hands",
    movement: "Both fists held at chest level tremble and shiver side to side",
    location: "Chest level",
    description: "Both fists hold tightly in front of ribs, shivering as if freezing cold.",
    steps: [
      "Make tight fists with both hands.",
      "Hold forearms close to your torso.",
      "Shake and shiver both fists rapidly with shivering teeth expression."
    ],
    usageTip: "Opposite of hot. Used for ice, winter, and freezing matter."
  },
  {
    id: "sign_tree",
    term: "Tree",
    category: "Science & Nature",
    gloss: "TREE / BRANCH-ROTATE",
    svgType: "tree_branch",
    handshape: "Dominant open 5-hand on non-dominant horizontal forearm",
    dominantHand: "Both hands",
    movement: "Dominant elbow rests on horizontal arm; spread fingers twist like leafy branches",
    location: "Chest level upright",
    description: "Non-dominant arm acts as ground; dominant forearm rises as a trunk with fluttering leaf fingers.",
    steps: [
      "Lay non-dominant forearm horizontally across chest like the ground.",
      "Rest dominant elbow on the back of the hand, standing upright like a tree trunk.",
      "Spread fingers wide and twist wrist gently back and forth like leaves in wind."
    ],
    usageTip: "One of the most beautifully pictorial signs in sign language."
  },
  {
    id: "sign_flower",
    term: "Flower",
    category: "Science & Nature",
    gloss: "FLOWER / NOSE-TAPS",
    svgType: "flower_bloom",
    handshape: "Flattened O-handshape (pinched fingertips)",
    dominantHand: "Dominant hand",
    movement: "Fingertips touch one side of nose, then arc over and touch the other side",
    location: "Nose / upper cheek",
    description: "Pinched hand touches one nostril, then arcs to touch the other nostril like smelling a blossom.",
    steps: [
      "Bring all fingertips together touching the thumb (flat O).",
      "Touch lightly to the right side of your nose.",
      "Arc the hand over and touch lightly to the left side of your nose as if smelling."
    ],
    usageTip: "Associates flowers with their delightful floral fragrance."
  },
  {
    id: "sign_earth",
    term: "Earth / Planet",
    category: "Science & Nature",
    gloss: "EARTH / AXIS-ROCK",
    svgType: "axis_rock",
    handshape: "Middle finger and thumb grip non-dominant fist like an axis",
    dominantHand: "Both hands",
    movement: "Dominant hand rocks non-dominant fist gently on its planetary axis",
    location: "Chest level",
    description: "Dominant thumb and middle finger grasp the non-dominant fist and rock it like Earth on its axis.",
    steps: [
      "Make a firm fist with non-dominant hand (the Earth globe).",
      "Pinch top and bottom of fist with dominant thumb and middle finger (polar axis).",
      "Rock the fist gently side to side to simulate orbital tilt."
    ],
    usageTip: "Scientific sign for Earth, globe, and world ecology."
  },
  {
    id: "sign_fire",
    term: "Fire",
    category: "Science & Nature",
    gloss: "FIRE / FLICKERING-FLAMES",
    svgType: "fire_flames",
    handshape: "Both hands open 5 with fingers fluttering upward",
    dominantHand: "Both hands",
    movement: "Hands alternate rising with fingers dancing like flickering flames",
    location: "Chest to neck level",
    description: "Both hands move upward alternately while fingers flutter like crackling campfire flames.",
    steps: [
      "Hold both hands at chest level, palms facing you, fingers spread.",
      "Alternate moving one hand up while the other lowers slightly.",
      "Wiggle all fingers rapidly to mimic dancing flames."
    ],
    usageTip: "Dynamic sign representing energy, combustion, and warmth."
  },
  {
    id: "sign_big",
    term: "Big / Large",
    category: "Science & Nature",
    gloss: "BIG / EXPANDING-L-HANDS",
    svgType: "expand_l",
    handshape: "Both hands in curved L-handshapes",
    dominantHand: "Both hands",
    movement: "Hands start close together and pull wide apart with expansive breath",
    location: "Center chest widening outward",
    description: "Curved L-hands start near each other and pull wide apart to show immense size.",
    steps: [
      "Form modified 'L' shapes with curved index fingers and thumbs on both hands.",
      "Start with hands 6 inches apart in front of chest.",
      "Pull hands wide apart to shoulder width and puff cheeks to show huge size."
    ],
    usageTip: "Facial expressions (puffed cheeks) indicate magnitude."
  },
  {
    id: "sign_small",
    term: "Small / Tiny",
    category: "Science & Nature",
    gloss: "SMALL / SQUEEZING-PALMS",
    svgType: "squeeze_palms",
    handshape: "Both flat palms facing each other",
    dominantHand: "Both hands",
    movement: "Palms move close together leaving only a tiny narrow space",
    location: "Chest level",
    description: "Both open flat palms move toward each other, pinching down to indicate a miniature size.",
    steps: [
      "Hold both open palms facing each other about 8 inches apart.",
      "Bring them close together until only 1 inch of space remains.",
      "Squint eyes or press lips to emphasize tiny scale."
    ],
    usageTip: "Opposite of big. Perfect for microscopic cells and atoms."
  },
  {
    id: "sign_light",
    term: "Light",
    category: "Science & Nature",
    gloss: "LIGHT / FLICK-CHIN",
    svgType: "flick_chin_light",
    handshape: "Middle finger flicks upward off chin / burst of 8-hand",
    dominantHand: "Dominant hand",
    movement: "Middle finger flicks up off chin into open hand, shining upward",
    location: "Chin moving upward",
    description: "Middle finger flicks off chin and hand blossoms into an open ray of bright illumination.",
    steps: [
      "Flick your middle finger off the center of your chin.",
      "Open your hand wide upward toward the ceiling.",
      "Bright, illuminating facial expression."
    ],
    usageTip: "Used for visible light, lamps, sunlight, and enlightenment."
  },
  {
    id: "sign_dark",
    term: "Dark",
    category: "Science & Nature",
    gloss: "DARK / CROSS-FACE",
    svgType: "cross_face_dark",
    handshape: "Both open flat B-hands",
    dominantHand: "Both hands",
    movement: "Both hands cross in front of face like closing curtains",
    location: "In front of eyes/face",
    description: "Both flat hands cross over each other in front of the eyes like curtains blocking light.",
    steps: [
      "Hold both open hands up on either side of your face, palms facing in.",
      "Move both hands across each other in front of your eyes like a curtain closing.",
      "Accompany with slightly narrowed eyes."
    ],
    usageTip: "Represents night, shadow, and lack of illumination."
  },
  {
    id: "sign_fast",
    term: "Fast / Quick",
    category: "Science & Nature",
    gloss: "FAST / INDEX-SNAP-GUN",
    svgType: "index_snap",
    handshape: "Both index fingers extended, snap back like cocking a gun",
    dominantHand: "Both hands",
    movement: "Both index fingers snap quickly back against thumbs in a split-second motion",
    location: "Chest level",
    description: "Both hands make index-gun shapes and quickly snap back in a flash of speed.",
    steps: [
      "Point both index fingers forward, thumbs up.",
      "Snap both index fingers quickly back into bent hooks against the thumbs.",
      "Quick, snappy speed with mouth saying 'zip!'."
    ],
    usageTip: "Shows rapid acceleration, fast motion, and quick responses."
  },

  // ==========================================
  // 5. Numbers & Foundations (61-75)
  // ==========================================
  {
    id: "sign_num_1",
    term: "Number 1",
    category: "Numbers & Counting",
    gloss: "ONE / 1-FINGER",
    svgType: "num_1",
    handshape: "Index finger extended straight up, palm facing in or out",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Index finger points straight up with other fingers held firmly by the thumb.",
    steps: [
      "Make a fist with your dominant hand.",
      "Extend only your index finger straight up toward the ceiling.",
      "Hold steady at chest level."
    ],
    usageTip: "The primary counting foundation."
  },
  {
    id: "sign_num_2",
    term: "Number 2",
    category: "Numbers & Counting",
    gloss: "TWO / V-FINGERS",
    svgType: "num_2",
    handshape: "Index and middle fingers extended in a V-shape",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Index and middle fingers extend straight up in a clean V-shape.",
    steps: [
      "Hold up your index finger and middle finger together.",
      "Keep them spread slightly apart in a victory V.",
      "Thumb holds down ring and pinky fingers."
    ],
    usageTip: "Standard number 2 across sign languages."
  },
  {
    id: "sign_num_3",
    term: "Number 3",
    category: "Numbers & Counting",
    gloss: "THREE / THUMB-TWO-FINGERS",
    svgType: "num_3",
    handshape: "Thumb, index, and middle finger extended (ASL standard 3)",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Thumb, index finger, and middle finger are all three extended simultaneously.",
    steps: [
      "Extend your thumb outward to the side.",
      "Extend your index and middle fingers straight up.",
      "Keep ring finger and pinky curled down."
    ],
    usageTip: "In sign language, 3 uses thumb + 2 fingers (distinguishing it from W)."
  },
  {
    id: "sign_num_4",
    term: "Number 4",
    category: "Numbers & Counting",
    gloss: "FOUR / FOUR-FINGERS-UP",
    svgType: "num_4",
    handshape: "All four fingers straight up, thumb folded across palm",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "All four fingers stand upright side by side while thumb rests tucked in palm.",
    steps: [
      "Fold your thumb flat across your palm.",
      "Extend all four fingers (index, middle, ring, pinky) straight up.",
      "Keep fingers evenly spaced."
    ],
    usageTip: "Standard 4 count."
  },
  {
    id: "sign_num_5",
    term: "Number 5",
    category: "Numbers & Counting",
    gloss: "FIVE / OPEN-PALM-5",
    svgType: "num_5",
    handshape: "Open 5-hand with all five digits spread wide",
    dominantHand: "Dominant hand",
    movement: "Held still or wiggles slightly at chest level",
    location: "Chest height",
    description: "All five fingers spread wide open, showing a complete single hand count.",
    steps: [
      "Spread all 5 fingers (including thumb) as wide apart as comfortable.",
      "Palm faces forward toward the viewer.",
      "Hold steady at chest level."
    ],
    usageTip: "Basis for the 5-handshape used throughout dozens of sign words."
  },
  {
    id: "sign_num_6",
    term: "Number 6",
    category: "Numbers & Counting",
    gloss: "SIX / THUMB-PINKY-TOUCH",
    svgType: "num_6",
    handshape: "Thumb touches pinky fingernail, other three fingers up",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Thumb tip connects with pinky tip while index, middle, and ring fingers stay tall.",
    steps: [
      "Hold up three fingers (index, middle, ring).",
      "Touch the pad of your thumb to the pad of your pinky finger.",
      "Keep remaining three fingers tall."
    ],
    usageTip: "Starts the high-number counting series 6 through 9."
  },
  {
    id: "sign_num_7",
    term: "Number 7",
    category: "Numbers & Counting",
    gloss: "SEVEN / THUMB-RING-TOUCH",
    svgType: "num_7",
    handshape: "Thumb touches ring fingernail, other three fingers up",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Thumb tip connects with ring finger tip while remaining fingers stay upright.",
    steps: [
      "Touch the pad of your thumb to your ring fingertip.",
      "Keep pinky, middle, and index fingers standing upright.",
      "Palm faces forward."
    ],
    usageTip: "7 follows 6 by shifting one finger over to the ring finger."
  },
  {
    id: "sign_num_8",
    term: "Number 8",
    category: "Numbers & Counting",
    gloss: "EIGHT / THUMB-MIDDLE-TOUCH",
    svgType: "num_8",
    handshape: "Thumb touches middle fingertip, other three digits up",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Thumb connects with middle fingertip in a clean circle.",
    steps: [
      "Touch your thumb pad to your middle fingertip.",
      "Keep index, ring, and pinky fingers upright.",
      "Clean, distinct silhouette."
    ],
    usageTip: "8 connects thumb to the middle tallest finger."
  },
  {
    id: "sign_num_9",
    term: "Number 9",
    category: "Numbers & Counting",
    gloss: "NINE / THUMB-INDEX-TOUCH",
    svgType: "num_9",
    handshape: "Thumb touches index fingertip (like an OK sign), other three up",
    dominantHand: "Dominant hand",
    movement: "Held still at chest level",
    location: "Chest height",
    description: "Thumb and index finger form an O-circle while middle, ring, and pinky stand tall.",
    steps: [
      "Touch the tip of your thumb to the tip of your index finger.",
      "Keep middle, ring, and pinky fingers spread upright.",
      "Resembles an 'OK' sign."
    ],
    usageTip: "Completes the single-digit 6-9 hand series."
  },
  {
    id: "sign_num_10",
    term: "Number 10",
    category: "Numbers & Counting",
    gloss: "TEN / THUMB-SHAKE",
    svgType: "num_10",
    handshape: "A-fist with thumb upright (thumbs-up hand)",
    dominantHand: "Dominant hand",
    movement: "Fist with thumb up shakes or wiggles side to side twice",
    location: "Chest level",
    description: "A thumbs-up fist wiggles side to side quickly, celebrating the milestone of 10.",
    steps: [
      "Form a thumbs-up fist with thumb upright.",
      "Twist your wrist back and forth 2-3 times like shaking a key in a lock.",
      "Smile to celebrate reaching 10!"
    ],
    usageTip: "Marks the transition into two-digit mathematical counting."
  },
  {
    id: "sign_letter_a",
    term: "Letter A",
    category: "Alphabet Foundation",
    gloss: "LETTER-A / FIST-THUMB-SIDE",
    svgType: "alpha_a",
    handshape: "Closed fist with thumb resting straight against the side of index finger",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Fingers curl into a tight palm fist with thumb resting straight against the index side.",
    steps: [
      "Curl all four fingers firmly down against your palm.",
      "Rest your straight thumb vertically against the side of your curled index finger.",
      "Palm faces forward toward the learner."
    ],
    usageTip: "First letter of fingerspelling alphabet."
  },
  {
    id: "sign_letter_b",
    term: "Letter B",
    category: "Alphabet Foundation",
    gloss: "LETTER-B / FLAT-FOUR-UP",
    svgType: "alpha_b",
    handshape: "Four straight fingers up side by side, thumb folded across palm",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "All four fingers held tall and tightly together; thumb folds flat across the palm.",
    steps: [
      "Hold your four fingers straight up and pressed tightly side-by-side.",
      "Fold your thumb across the front of your palm.",
      "Hold steady beside your face."
    ],
    usageTip: "Crucial handshape used in dozens of signs (B-hand)."
  },
  {
    id: "sign_letter_c",
    term: "Letter C",
    category: "Alphabet Foundation",
    gloss: "LETTER-C / CURVED-ARCH",
    svgType: "alpha_c",
    handshape: "All fingers and thumb curved like the letter C",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Hand curves into a side-profile arch mimicking the capital letter C.",
    steps: [
      "Curve all four fingers together downward.",
      "Curve your thumb upward underneath them.",
      "Look at your hand from the side: it forms a clear capital 'C'."
    ],
    usageTip: "Pure pictorial representation of letter C."
  },
  {
    id: "sign_letter_d",
    term: "Letter D",
    category: "Alphabet Foundation",
    gloss: "LETTER-D / INDEX-UP-O-BASE",
    svgType: "alpha_d",
    handshape: "Index finger straight up; thumb touches middle, ring, pinky tips",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Index finger points tall like the spine of 'd', while thumb forms the round belly with other fingers.",
    steps: [
      "Point your index finger straight up toward the ceiling.",
      "Curve your middle, ring, and pinky fingers down to touch your thumb tip.",
      "Together they form the round body of lowercase 'd'."
    ],
    usageTip: "Distinct from letter P or F."
  },
  {
    id: "sign_letter_e",
    term: "Letter E",
    category: "Alphabet Foundation",
    gloss: "LETTER-E / CLAWED-TUCK",
    svgType: "alpha_e",
    handshape: "All four curved fingertips rest on top of folded thumb",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "All four fingers bend down so their tips rest firmly along the top edge of the tucked thumb.",
    steps: [
      "Tuck your thumb across your palm horizontally.",
      "Curve all four fingers down so their fingernails rest against the thumb.",
      "Palm faces forward."
    ],
    usageTip: "Completes the foundational vowel series A and E."
  }
,
  {
    id: "sign_letter_f",
    term: "Letter F",
    category: "Alphabet Foundation",
    gloss: "LETTER-F / THREE-UP-O-RING",
    svgType: "alpha_f",
    handshape: "Index finger and thumb touch to form an O circle; middle, ring, pinky fingers straight upright and spread",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Thumb and index tips touch in an open ring, while the other three fingers stand upright like feathers.",
    steps: [
      "Touch the tip of your index finger to the tip of your thumb to form a small circle.",
      "Extend your middle, ring, and pinky fingers straight up and slightly spread.",
      "Palm faces forward toward the viewer."
    ],
    usageTip: "Opposite configuration of letter D; note 3 fingers are up, not 1."
  },
  {
    id: "sign_letter_g",
    term: "Letter G",
    category: "Alphabet Foundation",
    gloss: "LETTER-G / HORIZONTAL-PINCH",
    svgType: "alpha_g",
    handshape: "Index finger and thumb extend horizontally parallel pointing sideways",
    dominantHand: "Dominant hand",
    movement: "Held static, pointing across body or forward",
    location: "Chest level, slightly forward",
    description: "Thumb and index finger extend horizontally like measuring a small gap (pinch gauge), other fingers curled into palm.",
    steps: [
      "Make a fist.",
      "Extend your index finger horizontally sideways.",
      "Extend your thumb parallel to the index finger, leaving about an inch gap.",
      "Curl remaining three fingers into your palm."
    ],
    usageTip: "Resembles picking up a grain or holding a thin card."
  },
  {
    id: "sign_letter_h",
    term: "Letter H",
    category: "Alphabet Foundation",
    gloss: "LETTER-H / TWO-FINGER-HORIZONTAL",
    svgType: "alpha_h",
    handshape: "Index and middle fingers extended straight horizontally side by side",
    dominantHand: "Dominant hand",
    movement: "Held static, pointing across body",
    location: "Chest level",
    description: "Two fingers (index and middle) extend together horizontally, like the two horizontal strokes of H.",
    steps: [
      "Extend your index and middle fingers together side-by-side.",
      "Point both fingers horizontally across your chest.",
      "Tuck your thumb across your folded ring and pinky fingers."
    ],
    usageTip: "Similar to G, but with two fingers extended instead of one."
  },
  {
    id: "sign_letter_i",
    term: "Letter I",
    category: "Alphabet Foundation",
    gloss: "LETTER-I / PINKY-UP",
    svgType: "alpha_i",
    handshape: "Closed fist with pinky finger pointing straight upright",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "A neat fist with only the little pinky finger extended straight upward, representing the dot and slender stem of 'i'.",
    steps: [
      "Curl your index, middle, and ring fingers tightly into your palm.",
      "Fold your thumb across your curled fingers.",
      "Extend your pinky finger straight up toward the ceiling."
    ],
    usageTip: "Foundational handshape; adding a J-hook motion turns this into letter J."
  },
  {
    id: "sign_letter_j",
    term: "Letter J",
    category: "Alphabet Foundation",
    gloss: "LETTER-J / PINKY-SWOOP",
    svgType: "alpha_j",
    handshape: "I-handshape (pinky extended) tracing a 'J' swoop in the air",
    dominantHand: "Dominant hand",
    movement: "Pinky draws down and curves upward in a smooth 'J' shape",
    location: "In front of chest",
    description: "Starting in the 'I' handshape, the pinky sweeps downward and curves up to draw the cursive hook of letter J.",
    steps: [
      "Form the Letter I handshape with your pinky extended upright.",
      "Draw your pinky downward about two inches.",
      "Curve your wrist smoothly inward and upward to complete the bottom hook of 'J'."
    ],
    usageTip: "One of only two letters in the manual alphabet that incorporates motion (along with Z)."
  },
  {
    id: "sign_letter_k",
    term: "Letter K",
    category: "Alphabet Foundation",
    gloss: "LETTER-K / V-THUMB-CROOK",
    svgType: "alpha_k",
    handshape: "Index finger straight up, middle finger forward at 45 degrees, thumb resting between them",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Index finger stands tall, middle finger angles forward, and thumb tip touches the knuckle between them forming a 'K'.",
    steps: [
      "Extend your index finger straight up.",
      "Angle your middle finger forward at roughly 45 degrees.",
      "Place your thumb tip between the base of your index and middle fingers.",
      "Curl ring and pinky fingers into your palm."
    ],
    usageTip: "Inverting this handshape downward creates letter P."
  },
  {
    id: "sign_letter_l",
    term: "Letter L",
    category: "Alphabet Foundation",
    gloss: "LETTER-L / RIGHT-ANGLE-L",
    svgType: "alpha_l",
    handshape: "Index finger straight up, thumb extended horizontally at a 90-degree right angle",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Hand creates an unmistakable capital 'L' with the vertical index finger and horizontal thumb.",
    steps: [
      "Extend your index finger straight up toward the ceiling.",
      "Extend your thumb out horizontally to the side at a 90-degree angle.",
      "Fold your remaining three fingers into your palm.",
      "Palm faces forward."
    ],
    usageTip: "Iconic pictorial sign that literally looks like the printed letter L."
  },
  {
    id: "sign_letter_m",
    term: "Letter M",
    category: "Alphabet Foundation",
    gloss: "LETTER-M / THREE-FINGER-TUCK",
    svgType: "alpha_m",
    handshape: "Thumb tucked underneath the first three fingers (index, middle, ring)",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Three fingers (representing the 3 arches of 'm') fold over the thumb, with only the pinky left beneath.",
    steps: [
      "Place your thumb tip across your palm resting between your ring and pinky finger.",
      "Fold your index, middle, and ring fingers down over the thumb.",
      "Hold palm facing forward."
    ],
    usageTip: "Remember: M has 3 humps, so 3 fingers rest over the thumb."
  },
  {
    id: "sign_letter_n",
    term: "Letter N",
    category: "Alphabet Foundation",
    gloss: "LETTER-N / TWO-FINGER-TUCK",
    svgType: "alpha_n",
    handshape: "Thumb tucked underneath the first two fingers (index and middle)",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Two fingers (representing the 2 legs of 'n') fold over the thumb, with ring and pinky fingers underneath.",
    steps: [
      "Place your thumb tip between your middle and ring fingers.",
      "Fold your index and middle fingers down over the thumb.",
      "Keep your ring and pinky tucked into your palm.",
      "Palm faces forward."
    ],
    usageTip: "Remember: N has 2 arches/legs, so 2 fingers rest over the thumb (one fewer than M)."
  },
  {
    id: "sign_letter_o",
    term: "Letter O",
    category: "Alphabet Foundation",
    gloss: "LETTER-O / FULL-OVAL-LOOP",
    svgType: "alpha_o",
    handshape: "All fingertips curved to touch the curved thumb, forming an 'O' ring",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "All four fingers curve gracefully downward to meet the curved thumb, forming a full circular 'O'.",
    steps: [
      "Curve all four fingers together.",
      "Curve your thumb upward until the tips of all four fingers meet your thumb pad.",
      "Inspect from the side: an open circular portal like 'O' is formed."
    ],
    usageTip: "Pure circular letter shape; clear and easily recognized."
  },
  {
    id: "sign_letter_p",
    term: "Letter P",
    category: "Alphabet Foundation",
    gloss: "LETTER-P / DOWNWARD-K",
    svgType: "alpha_p",
    handshape: "K-handshape pointing downward; index points down, middle extends forward, thumb in crook",
    dominantHand: "Dominant hand",
    movement: "Held static, tilted downward",
    location: "Mid-chest level",
    description: "Form the 'K' handshape and tilt your wrist downward so the index finger points straight to the floor.",
    steps: [
      "Form the Letter K handshape with index up, middle forward, and thumb between them.",
      "Drop your wrist down so the index finger points straight toward the floor.",
      "Middle finger extends horizontally forward.",
      "Hold steady."
    ],
    usageTip: "Identical finger position to K, simply oriented downward."
  },
  {
    id: "sign_letter_q",
    term: "Letter Q",
    category: "Alphabet Foundation",
    gloss: "LETTER-Q / DOWNWARD-G",
    svgType: "alpha_q",
    handshape: "G-handshape pointing downward; index finger and thumb point down parallel",
    dominantHand: "Dominant hand",
    movement: "Held static, tilted downward",
    location: "Mid-chest level",
    description: "Form the 'G' pinch handshape and tilt it downward so thumb and index point toward the ground.",
    steps: [
      "Form the Letter G handshape with thumb and index extended parallel.",
      "Rotate your wrist down so both index and thumb point toward the floor.",
      "Curl remaining three fingers into palm."
    ],
    usageTip: "Downward companion to G (just as P is the downward companion to K)."
  },
  {
    id: "sign_letter_r",
    term: "Letter R",
    category: "Alphabet Foundation",
    gloss: "LETTER-R / CROSSED-FINGERS",
    svgType: "alpha_r",
    handshape: "Index and middle fingers crossed over each other like good-luck fingers",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Middle finger crosses over the front of the upright index finger, exactly like crossing fingers for good luck.",
    steps: [
      "Extend your index and middle fingers straight up.",
      "Cross your middle finger over the front of your index finger.",
      "Tuck your ring and pinky fingers with your thumb folded across them.",
      "Hold upright."
    ],
    usageTip: "Universal 'fingers crossed' symbol."
  },
  {
    id: "sign_letter_s",
    term: "Letter S",
    category: "Alphabet Foundation",
    gloss: "LETTER-S / FIST-THUMB-FRONT",
    svgType: "alpha_s",
    handshape: "Closed fist with thumb folded horizontally across the front of the curled fingers",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Tight fist where thumb wraps tightly across the knuckles in front, distinguishing it from 'A' and 'T'.",
    steps: [
      "Curl all four fingers into a tight fist against your palm.",
      "Wrap your thumb horizontally across the middle knuckles of your fingers.",
      "Palm faces forward toward the viewer."
    ],
    usageTip: "Contrast with letter A: for A, thumb is on the side; for S, thumb crosses the front."
  },
  {
    id: "sign_letter_t",
    term: "Letter T",
    category: "Alphabet Foundation",
    gloss: "LETTER-T / THUMB-PEEK-INDEX",
    svgType: "alpha_t",
    handshape: "Thumb tucked between the index and middle fingers of a closed fist",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Fist with the thumb peeking up between the index and middle fingers, forming the stem and top bar of 'T'.",
    steps: [
      "Form a fist with your thumb tucked directly between your index and middle fingers.",
      "Curled index finger rests over the top of your thumb knuckle.",
      "Palm faces forward."
    ],
    usageTip: "Part of the M-N-T group: M has 3 fingers over thumb, N has 2, T has only 1 (index)."
  },
  {
    id: "sign_letter_u",
    term: "Letter U",
    category: "Alphabet Foundation",
    gloss: "LETTER-U / TWO-FINGERS-TOGETHER",
    svgType: "alpha_u",
    handshape: "Index and middle fingers held straight upright pressed tightly together side-by-side",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Two upright fingers held tightly together with no gap, creating the parallel sides of letter 'U'.",
    steps: [
      "Extend your index and middle fingers straight up toward the ceiling.",
      "Press them tightly together side by side with no space between them.",
      "Fold your thumb across your curled ring and pinky fingers.",
      "Palm faces forward."
    ],
    usageTip: "Contrast with letter V: U has fingers closed together, V has fingers spread apart."
  },
  {
    id: "sign_letter_v",
    term: "Letter V",
    category: "Alphabet Foundation",
    gloss: "LETTER-V / V-SHAPE-SPREAD",
    svgType: "alpha_v",
    handshape: "Index and middle fingers held straight upright and spread apart in a 'V' peace shape",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Classic peace sign handshape: index and middle fingers spread apart forming a clear 'V'.",
    steps: [
      "Extend your index and middle fingers straight up.",
      "Spread them wide apart to form a distinct 'V' angle.",
      "Keep ring and pinky curled with thumb tucked across them.",
      "Palm faces forward."
    ],
    usageTip: "Identical handshape to Number 2; pictorial representation of letter V."
  },
  {
    id: "sign_letter_w",
    term: "Letter W",
    category: "Alphabet Foundation",
    gloss: "LETTER-W / THREE-FINGER-W",
    svgType: "alpha_w",
    handshape: "Index, middle, and ring fingers held straight upright and spread apart in a 'W'",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Three middle fingers extended and spread like the three points of letter 'W', thumb holding down the pinky.",
    steps: [
      "Extend your index, middle, and ring fingers straight up.",
      "Spread the three fingers evenly apart.",
      "Hold your pinky down with your thumb.",
      "Palm faces forward."
    ],
    usageTip: "Also the standard handshape for Number 6 in counting, and Water when tapped at chin."
  },
  {
    id: "sign_letter_x",
    term: "Letter X",
    category: "Alphabet Foundation",
    gloss: "LETTER-X / BENT-INDEX-HOOK",
    svgType: "alpha_x",
    handshape: "Closed fist with index finger curved into a bent hook",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Closed fist with the index finger raised and bent into a prominent hook (like Captain Hook).",
    steps: [
      "Make a fist with your palm facing forward.",
      "Raise your index finger and bend its first two joints into a hook.",
      "Thumb rests along the side of the curled middle finger."
    ],
    usageTip: "Looks like a pirate hook or question mark."
  },
  {
    id: "sign_letter_y",
    term: "Letter Y",
    category: "Alphabet Foundation",
    gloss: "LETTER-Y / THUMB-PINKY-SPREAD",
    svgType: "alpha_y",
    handshape: "Fist with thumb and pinky finger extended wide apart (hang loose shape)",
    dominantHand: "Dominant hand",
    movement: "Held static at shoulder height",
    location: "Beside shoulder",
    description: "Thumb and pinky extend out from the fist, mimicking the diverging upper branches and lower tail of 'Y'.",
    steps: [
      "Make a fist.",
      "Extend your thumb out to the side.",
      "Extend your pinky out to the opposite side.",
      "Keep middle three fingers curled flat against your palm."
    ],
    usageTip: "Universal 'shaka' or 'hang loose' handshape."
  },
  {
    id: "sign_letter_z",
    term: "Letter Z",
    category: "Alphabet Foundation",
    gloss: "LETTER-Z / AIR-TRACE-Z",
    svgType: "alpha_z",
    handshape: "Index finger pointing forward, tracing a 'Z' in the air",
    dominantHand: "Dominant hand",
    movement: "Draws horizontal right, diagonal down-left, horizontal right in the air",
    location: "In front of chest",
    description: "Index finger acts as a pen tracing the 3 distinct strokes of letter Z in the air (across, diagonal, across).",
    steps: [
      "Point your index finger straight forward with remaining fingers closed into a fist.",
      "Draw a horizontal line from left to right.",
      "Angle diagonally down and to the left.",
      "Draw another horizontal line to the right to complete 'Z'."
    ],
    usageTip: "Final letter of the manual alphabet; dynamic motion sign like J."
  }
];

export const SIGN_CATEGORIES = [
  "All Signs",
  "Social & Emotions",
  "Communication",
  "Daily Life",
  "Science & Nature",
  "Numbers & Counting",
  "Alphabet Foundation"
];
