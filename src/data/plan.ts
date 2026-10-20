/** ────────────────────────────────────────────────────────────────
 *  CLIENT FILE · 25M · 5'11" · 87 kg · waist 34–35" · office 9–5:30
 *  Goal: 70–75 kg, lean athletic (Kohli / Ronaldo) look
 *  ──────────────────────────────────────────────────────────────── */

export const CLIENT = {
  name: "Client File #LK-25",
  age: 25,
  sex: "Male",
  heightCm: 180.3,
  heightLabel: `5'11"`,
  weightKg: 87,
  waistInch: 34.75,
  frame: "Wide / broad structure — reads 'bulky' rather than fat",
  occupation: "Sedentary office employee (9:00–5:30, ~9 h seated)",
  trainingNow: "3×/week, 7:40–8:30 PM, unstructured",
  goalWeight: [74, 78] as [number, number],
  bigWhy: "Look lean, athletic and dry — not bulky, not bodybuilder-sized.",
  anchors: ["Kohli-style leanness", "Cristiano athletic frame", "Abs visible", "Fitted shirts, flat waist"],
};

/** ── CURRENT STATE ANALYSIS ─────────────────────────────────────── */

export const BODY_STATS = [
  { label: "Scale weight", value: "87.0", unit: "kg", hint: "BMI 26.8 — 'overweight' band, but BMI ignores muscle" },
  { label: "Waist", value: "34.5", unit: "in", hint: "Waist-to-height 0.49 — right at the upper healthy edge" },
  { label: "Body fat (est.)", value: "~22", unit: "%", hint: "BMI + waist-to-height estimate: 20–24% band" },
  { label: "Fat mass", value: "19.3", unit: "kg", hint: "This is what we remove" },
  { label: "Lean mass", value: "67.7", unit: "kg", hint: "This is what we protect and shape (FFMI ~20.8)" },
  { label: "Maintenance", value: "~2,450", unit: "kcal", hint: "Sedentary desk + 3 lifts — rises to ~2,665 at 8–10k steps" },
];

export const ASSESSMENT = [
  {
    title: "You are 'bulky', not big-muscled",
    body: "At 5'11\" and 87 kg with a 34–35\" waist you are carrying roughly 19 kg of fat over a genuinely wide frame. The 'bulky' look is fat + water + a little muscle sitting on top of a broad ribcage and clavicles. Remove 10–12 kg of fat while keeping your 68 kg of lean mass and the same bones now read 'athletic' instead of 'heavy'. Nothing about your frame needs to shrink.",
    tone: "lime" as const,
  },
  {
    title: "Your 70 kg target is 4–6 kg too low",
    body: "If you keep your ~68.5 kg of lean mass, 70 kg would put you near 2% body fat — physiologically impossible. Your true 'shredded athletic' weight is 75–78 kg. Chase waist circumference, mirror and photos, not the scale. If you diet to 70 kg you will lose muscle and look 'small and soft', i.e. skinny-fat, which is the exact opposite of a Kohli/Ronaldo physique.",
    tone: "amber" as const,
  },
  {
    title: "Your current diet is already low calorie — and that is the problem",
    body: "Your day lands around 1,650–1,750 kcal with only ~75 g protein. That is an ~800 kcal deficit with one third of the protein you need. Your body is burning a mix of fat AND muscle, your gym sessions have no building blocks to work with, and your metabolic rate quietly down-regulates. Cut this way for 3 months and you end up lighter but flatter, with the same waist-to-shoulder ratio.",
    tone: "rose" as const,
  },
  {
    title: "The physique you want is a shoulder-to-waist project",
    body: "Kohli and Ronaldo are not huge — they are ~10–13% body fat with dense delts, upper chest, lats and arms, and a tight waist. So the plan is: aggressive-but-safe fat loss, protein high every single day, and lifting that prioritises side delts, upper chest, back width and arms while keeping legs strong. Plus 8–10k steps so the fat comes off without needing cardio marathon sessions.",
    tone: "cyan" as const,
  },
];

/** ── CURRENT DIET AUDIT ────────────────────────────────────────── */

export type AuditItem = {
  slot: string;
  time: string;
  eats: string;
  kcal: number;
  protein: number;
  verdict: "bad" | "ok" | "good";
  issue: string;
  fix: string;
};

export const DIET_AUDIT: AuditItem[] = [
  {
    slot: "Breakfast",
    time: "9:30 AM",
    eats: "Chicken sandwich — white bread + chicken + mayonnaise, milk tea",
    kcal: 470,
    protein: 24,
    verdict: "bad",
    issue: "White bread is a fast carb with no fibre; mayonnaise is pure refined oil (~90 kcal per tablespoon) and adds zero satiety; sugar in tea spikes then crashes you by 11 AM.",
    fix: "Same meal, upgraded: 3 whole eggs + 3 whites bhurji, 1 bran/whole-wheat roti, kachumber salad, mustard or hung-curd dip instead of mayo. Tea with 200 ml milk, NO sugar.",
  },
  {
    slot: "Lunch",
    time: "1:30 PM",
    eats: "1 bowl channa chat + 1 small chapati + chicken salan",
    kcal: 500,
    protein: 26,
    verdict: "ok",
    issue: "Channa is genuinely good (fibre + plant protein). But the protein total is low, and salan made with oil/onion-tomato gravy carries hidden fat you never count.",
    fix: "Keep the channa, add 150 g lean chicken breast, drop the extra chapati, add a 2-katori kachumber with 1 tsp olive oil + lemon. Cap cooking oil at 1 tsp.",
  },
  {
    slot: "Coffee",
    time: "3:30 PM",
    eats: "Milk coffee with sugar",
    kcal: 110,
    protein: 3,
    verdict: "ok",
    issue: "Empty sugar calories and, at 3:30, still late enough to dent deep sleep at night.",
    fix: "Move it to 3:45–4:00 as your PRE-WORKOUT fuel, take it black or with 100 ml milk + sweetener, and add a banana. Now the caffeine works for you.",
  },
  {
    slot: "Gym",
    time: "7:40–8:30 PM",
    eats: "Nothing before or after",
    kcal: 0,
    protein: 0,
    verdict: "bad",
    issue: "Training fasted at the end of a 1,600 kcal day = weak sessions, strength loss, muscle sacrifice. You have no protein timing at all.",
    fix: "Banana + black coffee at 4 PM, and a 30–40 g protein feed within 60 min of finishing (whey in water is cheapest and easiest at 9 PM).",
  },
  {
    slot: "Dinner",
    time: "9:00 PM",
    eats: "2 roti with salan / 2 crumbled eggs",
    kcal: 470,
    protein: 18,
    verdict: "ok",
    issue: "Carb-heavy and protein-light. Two rotis plus gravy at 9 PM with only ~18 g protein is why your body has nothing to rebuild with overnight.",
    fix: "Flip the ratio: 150–200 g protein (chicken / fish / paneer / eggs+whites), 1 roti or ¾ katori brown rice, and 2 katori vegetables.",
  },
  {
    slot: "Night tea",
    time: "9:30 PM",
    eats: "Tea with sugar + 1 rusk / bread",
    kcal: 150,
    protein: 2,
    verdict: "bad",
    issue: "This is the single worst habit in your day: caffeine 90 min before bed (worse sleep = worse fat loss), plus sugar + refined starch that spike insulin exactly when fat storage is easiest.",
    fix: "Delete it. Chamomile / cinnamon / green tea, no sugar, no rusk. If genuinely hungry: 200 ml warm milk or 150 g hung curd — that is protein, not carbs.",
  },
];

export const AUDIT_TOTAL = {
  kcal: DIET_AUDIT.reduce((s, i) => s + i.kcal, 0),
  protein: DIET_AUDIT.reduce((s, i) => s + i.protein, 0),
};

export const CURRENT_DIET_VERDICTS = [
  { label: "Calories", now: "1,600–1,750", need: "1,950–2,050", note: "Your deficit is too deep for so little protein. Slightly more food, far better food." },
  { label: "Protein", now: "~80 g", need: "160–170 g", note: "The #1 gap. Double it — this is what keeps you muscular while you shrink." },
  { label: "Fibre", now: "15–18 g", need: "30–38 g", note: "No vegetables or fruit on your current day. Controls hunger, cholesterol, hormones." },
  { label: "Refined carbs", now: "6–8 servings", need: "≤ 2 servings", note: "White bread, rusk, sugar — swap for dalia, oats, brown rice, whole-wheat roti." },
  { label: "Added sugar", now: "35–45 g", need: "< 25 g", note: "Two teas + coffee + rusk = ~1,000 empty kcal a week." },
  { label: "Water", now: "~1.5 L", need: "3.0–3.5 L", note: "Dehydration reads as hunger and kills training output." },
  { label: "Steps", now: "3–4k", need: "8–10k", note: "This is 300–400 kcal/day of free, recovery-friendly burn." },
  { label: "Sleep", now: "7 h (11–12 → 7)", need: "7.5–8 h", note: "Lights out 10:45–11:00. One hour more sleep beats one hour more cardio." },
];

/** ── MACRO TARGETS ─────────────────────────────────────────────── */

export const MACRO_CARDS = [
  { key: "kcal", label: "Calories", value: "2,090", unit: "kcal/day", pct: 78, note: "~575 kcal under the 2,665 kcal maintenance you get once the steps are in. Recalibrate every 4 weeks." },
  { key: "protein", label: "Protein", value: "165", unit: "g · 2.2 g/kg goal BW", pct: 100, note: "Non-negotiable. Hit this daily or the plan fails." },
  { key: "carbs", label: "Carbs", value: "210", unit: "g · 1.7 g/kg goal BW", pct: 70, note: "Fuel for lifting, weighted around breakfast, pre- and post-workout." },
  { key: "fat", label: "Fat", value: "65", unit: "g · 0.75 g/kg", pct: 58, note: "Hormone floor — never drop below 55 g on a cut." },
  { key: "fibre", label: "Fibre", value: "30", unit: "g", pct: 80, note: "From salad, veg, dal, oats, fruit. Your hunger insurance." },
  { key: "water", label: "Water", value: "3.2", unit: "litres", pct: 91, note: "1 L before 10 AM. 500 ml during training." },
];

export const NON_NEGOTIABLES = [
  "160 g+ protein, every single day — including weekends and dawats",
  "8,000 steps minimum, 7 days a week (track it)",
  "3 lifting sessions per week, never two missed in a row",
  "Zero sugary drinks, juices and mithai — liquid calories are the fastest fat",
  "7 hours minimum sleep; caffeine after 4 PM = no",
  "Weigh daily, average weekly. Judge the average, never the day",
  "Cooking oil ceiling: 3 tsp/day total (15 ml). Measure it, don't pour it",
  "One free meal a week — a meal, not a day. Plan it, enjoy it, move on",
];

/** ── 7-DAY MEAL PLAN (~1,950–2,050 kcal · 155–175 g protein) ────── */

export type Meal = {
  time: string;
  slot: string;
  title: string;
  items: string[];
  kcal: number;
  protein: number;
  note?: string;
};

export type MealDay = {
  id: string;
  day: string;
  tag: string;
  accent: string;
  meals: Meal[];
};

export const MEAL_DAYS: MealDay[] = [
  {
    id: "d1",
    day: "Mon",
    tag: "Push day · egg anchor",
    accent: "lime",
    meals: [
      { time: "7:00", slot: "Wake", title: "Hydration + micro-load", items: ["600 ml water (room temp)", "5 soaked almonds", "Green tea — no sugar"], kcal: 60, protein: 3, note: "Before you leave at 7:50. Rehydrates you after 7 h of fasting." },
      { time: "9:30", slot: "Breakfast", title: "Anda bhurji + bran roti", items: ["3 whole eggs + 3 egg whites", "Onion, tomato, green chilli, coriander", "1 tsp mustard/olive oil", "1 whole-wheat + bran roti", "Kachumber (cucumber, onion, lemon, black salt)"], kcal: 500, protein: 36, note: "Swap out the mayo sandwich forever. Same convenience, 12 g more protein." },
      { time: "12:15", slot: "Snack", title: "Hung-curd bowl", items: ["200 g hung curd / Greek yoghurt", "1 guava or apple", "1 tsp roasted flax or chia"], kcal: 310, protein: 26, note: "Prep hung curd on Sunday: tie 1 kg curd in cloth, hang 3 h." },
      { time: "1:30", slot: "Lunch", title: "Chicken thali", items: ["180 g cooked chicken breast (grilled / tandoori rub, no cream)", "1 whole-wheat roti", "2 katori kachumber salad", "1 tsp olive oil + lemon"], kcal: 460, protein: 52 },
      { time: "4:00", slot: "Pre-workout", title: "Coffee + banana", items: ["Black coffee (or 100 ml milk + sweetener)", "1 banana"], kcal: 100, protein: 2, note: "Caffeine now works FOR your 7:40 session instead of against your sleep." },
      { time: "9:00", slot: "Post-workout + dinner", title: "Chicken seekh + rice + veg", items: ["150 g homemade chicken seekh / tikka (lean mince, no fat)", "¾ katori brown rice", "2 katori lauki / bhindi / palak, 1 tsp oil", "1 scoop whey in water (right after the gym)"], kcal: 540, protein: 52 },
      { time: "9:45", slot: "Wind-down", title: "Night cap", items: ["Chamomile or cinnamon tea — no sugar, no rusk"], kcal: 5, protein: 0, note: "This replaces your 9:30 bread-and-tea habit. Non-negotiable in weeks 1–4." },
    ],
  },
  {
    id: "d2",
    day: "Tue",
    tag: "Rest day · lower carb",
    accent: "cyan",
    meals: [
      { time: "7:00", slot: "Wake", title: "Hydration", items: ["600 ml water + lemon", "5 soaked almonds"], kcal: 60, protein: 3 },
      { time: "9:30", slot: "Breakfast", title: "Oats + whey porridge", items: ["40 g oats cooked in water", "1.5 scoops whey (stirred in off-heat)", "Cinnamon + ½ banana", "1 tsp peanut butter"], kcal: 450, protein: 41, note: "Office-friendly: carry oats + shaker, 3 minutes to make at your desk." },
      { time: "12:15", slot: "Snack", title: "Whey + fruit", items: ["1 scoop whey in water", "1 apple or orange"], kcal: 190, protein: 25 },
      { time: "1:30", slot: "Lunch", title: "Chole bowl (keep your favourite)", items: ["1.25 katori boiled channa, masala with 1 tsp oil", "150 g hung curd", "1 whole-wheat roti", "Kachumber salad"], kcal: 500, protein: 34, note: "Your channa chat was never the problem — the missing protein and the fried garnish were." },
      { time: "4:00", slot: "Afternoon", title: "Green tea", items: ["Green tea / lemon water", "Black coffee if you need it (last caffeine of the day)"], kcal: 10, protein: 0 },
      { time: "9:00", slot: "Dinner", title: "Paneer bhurji night", items: ["200 g low-fat paneer, crumbled", "Capsicum, onion, tomato — 1 tsp olive oil", "1 whole-wheat roti", "1 katori sautéed veg", "100 g curd"], kcal: 560, protein: 50 },
      { time: "9:45", slot: "Wind-down", title: "Night cap", items: ["Chamomile tea"], kcal: 5, protein: 0 },
    ],
  },
  {
    id: "d3",
    day: "Wed",
    tag: "Legs day · highest carbs",
    accent: "amber",
    meals: [
      { time: "7:00", slot: "Wake", title: "Hydration + fuel", items: ["600 ml water", "3 dates", "Green tea"], kcal: 90, protein: 1 },
      { time: "9:30", slot: "Breakfast", title: "Egg-white omelette + oats", items: ["4 egg whites + 2 whole eggs", "Spinach, mushroom, onion", "40 g oats porridge with berries"], kcal: 450, protein: 34 },
      { time: "12:15", slot: "Snack", title: "Curd + muesli", items: ["200 g Greek yoghurt", "30 g muesli / oats"], kcal: 280, protein: 24 },
      { time: "1:30", slot: "Lunch", title: "Chicken + brown rice", items: ["170 g chicken breast", "1 katori brown rice", "2 katori salad, 1 tsp olive oil"], kcal: 500, protein: 50 },
      { time: "4:00", slot: "Pre-workout", title: "Coffee + banana", items: ["Black coffee", "1 banana + 2 dates"], kcal: 130, protein: 1, note: "Legs day costs the most glycogen — carbs go up today, not down." },
      { time: "9:00", slot: "Post-workout + dinner", title: "Fish + sweet potato", items: ["1 scoop whey in water (post-gym)", "150 g grilled fish (rohu / surmai / basa)", "1 katori sweet potato or ¾ katori rice", "2 katori stir-fried veg"], kcal: 580, protein: 62 },
      { time: "9:45", slot: "Wind-down", title: "Night cap", items: ["Chamomile tea"], kcal: 5, protein: 0 },
    ],
  },
  {
    id: "d4",
    day: "Thu",
    tag: "Rest day · plant protein focus",
    accent: "emerald",
    meals: [
      { time: "7:00", slot: "Wake", title: "Hydration", items: ["600 ml water", "5 soaked almonds"], kcal: 60, protein: 3 },
      { time: "9:30", slot: "Breakfast", title: "Moong chilla trio", items: ["3 moong / besan chilla (60 g flour, finely chopped veg)", "100 g hung-curd dip with mint + garlic", "Green chutney"], kcal: 430, protein: 28 },
      { time: "12:15", slot: "Snack", title: "Whey + fruit", items: ["1 scoop whey in water", "1 guava"], kcal: 190, protein: 25 },
      { time: "1:30", slot: "Lunch", title: "Dal power bowl", items: ["1.5 katori mixed dal (moong + masoor)", "200 g curd", "1 whole-wheat roti", "Kachumber + 1 tsp olive oil"], kcal: 500, protein: 34 },
      { time: "4:00", slot: "Afternoon", title: "Roasted channa", items: ["40 g roasted channa", "Green tea"], kcal: 180, protein: 9 },
      { time: "9:00", slot: "Dinner", title: "Clear chicken soup", items: ["200 g shredded chicken in clear soup (carrot, cabbage, pepper)", "1 whole-wheat roti", "1 katori veg"], kcal: 500, protein: 52 },
      { time: "9:45", slot: "Wind-down", title: "Milk", items: ["200 ml warm milk (turmeric + cinnamon, no sugar)"], kcal: 120, protein: 8 },
    ],
  },
  {
    id: "d5",
    day: "Fri",
    tag: "Pull day · back & shoulders",
    accent: "violet",
    meals: [
      { time: "7:00", slot: "Wake", title: "Hydration", items: ["600 ml water", "5 almonds"], kcal: 60, protein: 3 },
      { time: "9:30", slot: "Breakfast", title: "Egg bhurji + roti", items: ["3 whole eggs + 3 whites", "1.5 tsp oil, onion-tomato", "1 bran roti", "Kachumber"], kcal: 500, protein: 36 },
      { time: "12:15", slot: "Snack", title: "Curd + fruit", items: ["200 g Greek yoghurt", "1 apple + 1 tsp chia"], kcal: 230, protein: 21 },
      { time: "1:30", slot: "Lunch", title: "Chicken thali", items: ["180 g chicken breast", "1 roti", "2 katori salad + 1 tsp olive oil"], kcal: 460, protein: 52 },
      { time: "4:00", slot: "Pre-workout", title: "Coffee + banana", items: ["Black coffee", "1 banana"], kcal: 100, protein: 2 },
      { time: "9:00", slot: "Post-workout + dinner", title: "Egg curry night", items: ["1 scoop whey in water (post-gym)", "2 whole eggs + 3 whites in tomato-onion gravy (1 tsp oil)", "1 whole-wheat roti", "1 katori beans / mix veg"], kcal: 590, protein: 58 },
      { time: "9:45", slot: "Wind-down", title: "Night cap", items: ["Chamomile tea"], kcal: 5, protein: 0 },
    ],
  },
  {
    id: "d6",
    day: "Sat",
    tag: "Optional 4th session · social window",
    accent: "sky",
    meals: [
      { time: "7:30", slot: "Wake", title: "Hydration", items: ["600 ml water + lemon"], kcal: 10, protein: 0 },
      { time: "9:30", slot: "Breakfast", title: "Protein pancakes", items: ["50 g oats blended", "2 whole eggs", "1 scoop whey", "½ banana + cinnamon"], kcal: 520, protein: 45, note: "Blend, pour, flip. Tastes like a cheat meal, hits your macros." },
      { time: "12:30", slot: "Snack", title: "Whey + fruit", items: ["1 scoop whey", "1 papaya bowl / orange"], kcal: 190, protein: 25 },
      { time: "2:00", slot: "Lunch", title: "Weekend kebab plate", items: ["200 g chicken tikka / seekh (homemade)", "½ katori brown rice", "Big salad + mint chutney"], kcal: 500, protein: 48 },
      { time: "4:30", slot: "Afternoon", title: "Green tea", items: ["Green tea, no sugar"], kcal: 5, protein: 0 },
      { time: "9:00", slot: "Dinner", title: "Eating-out survival order", items: ["Grilled chicken / fish platter (250 g)", "Double salad, no mayo dip", "Skip the naan, share the dessert or skip it", "Water with lemon, not a soft drink"], kcal: 450, protein: 55, note: "Restaurant rule: protein + salad + one carb you can name. Nothing fried, nothing creamy." },
      { time: "9:45", slot: "Wind-down", title: "Night cap", items: ["Green / chamomile tea"], kcal: 5, protein: 0 },
    ],
  },
  {
    id: "d7",
    day: "Sun",
    tag: "Rest · measure · meal prep",
    accent: "rose",
    meals: [
      { time: "7:30", slot: "Wake", title: "Hydration + measure", items: ["600 ml water", "Weigh-in, waist check, progress photos"], kcal: 10, protein: 0, note: "Same conditions every week: morning, empty stomach, after the toilet, before tea." },
      { time: "10:00", slot: "Brunch", title: "Eggs + toast", items: ["3 whole eggs, runny yolk", "2 slices bran / multigrain toast", "¼ avocado or 1 tsp butter", "Tomato + cucumber"], kcal: 480, protein: 30 },
      { time: "12:30", slot: "Snack", title: "Curd + fruit", items: ["200 g hung curd", "1 orange"], kcal: 210, protein: 20 },
      { time: "2:00", slot: "Lunch", title: "Home thali, re-engineered", items: ["150 g lean chicken salan (oil skimmed)", "1 whole-wheat roti", "1 katori veg", "2 katori salad"], kcal: 480, protein: 45 },
      { time: "4:00", slot: "Afternoon", title: "Whey + prep", items: ["1 scoop whey in water", "Cook chicken, boil eggs, hang curd, chop salad for the week"], kcal: 120, protein: 24 },
      { time: "8:30", slot: "Dinner", title: "Light finish", items: ["150 g grilled fish or 150 g paneer tikka", "Big soup + salad", "½ katori rice if training tomorrow"], kcal: 380, protein: 42 },
      { time: "9:45", slot: "Wind-down", title: "Milk", items: ["200 ml warm milk"], kcal: 120, protein: 8 },
    ],
  },
];

export const MEAL_SWAPS = [
  { from: "White bread + mayo sandwich", to: "3 eggs + 3 whites bhurji + 1 bran roti" },
  { from: "Rusk / bread at 9:30 PM", to: "Chamomile tea, or 150 g hung curd if hungry" },
  { from: "Mayonnaise", to: "Hung curd + mint + garlic dip, or mustard" },
  { from: "Sugar in tea ×3", to: "Stevia / sucralose, or learn it plain in 10 days" },
  { from: "2 rotis at dinner", to: "1 roti or ¾ katori brown rice + 2 katori veg" },
  { from: "Creamy / oily salan", to: "Same gravy, 1 tsp oil, skim the layer, no cream" },
  { from: "Fried samosa / pakora", to: "Roasted channa, or air-fried at home" },
  { from: "Mango / banana shake", to: "Whole fruit + whey in water" },
  { from: "Soft drinks & juice", to: "Water, sparkling water, black coffee, green tea" },
  { from: "Biryani (full plate)", to: "Half plate + extra raita + salad, no extra roti" },
];

export const GROCERY = [
  {
    group: "Protein (the base of every meal)",
    items: [
      { name: "Chicken breast / lean mince", qty: "1.5 kg / week" },
      { name: "Eggs", qty: "2 dozen" },
      { name: "Low-fat paneer", qty: "400 g" },
      { name: "Fish (rohu, surmai, basa)", qty: "400 g" },
      { name: "Hung curd / Greek yoghurt", qty: "1.5 kg" },
      { name: "Whey protein (any tested brand)", qty: "1 kg / month" },
      { name: "Dal + channa (moong, masoor, chole)", qty: "1 kg mix" },
    ],
  },
  {
    group: "Smart carbs (measured, not feared)",
    items: [
      { name: "Whole-wheat atta + wheat bran", qty: "2 kg" },
      { name: "Rolled oats", qty: "500 g" },
      { name: "Brown rice / dalia", qty: "500 g each" },
      { name: "Sweet potato", qty: "1 kg" },
      { name: "Bananas + seasonal fruit", qty: "7 + 5" },
    ],
  },
  {
    group: "Vegetables (volume = fullness)",
    items: [
      { name: "Salad: cucumber, tomato, onion, carrot, lettuce", qty: "Daily, 2 katori" },
      { name: "Lauki, bhindi, palak, beans, capsicum, gourd", qty: "2 kg mix" },
      { name: "Broccoli / cauliflower", qty: "500 g" },
      { name: "Lemon, ginger, garlic, green chilli", qty: "Weekly" },
    ],
  },
  {
    group: "Fats (measured with a spoon)",
    items: [
      { name: "Olive oil / mustard oil", qty: "250 ml bottle lasts 3+ weeks" },
      { name: "Almonds / peanuts", qty: "200 g (30 g/day cap)" },
      { name: "Flax / chia seeds", qty: "100 g" },
      { name: "Desi ghee", qty: "1 tsp/day if you want the flavour" },
    ],
  },
  {
    group: "Delete from the kitchen",
    items: [
      { name: "White bread, rusk, bakery buns", qty: "Gone" },
      { name: "Mayonnaise, cream, cheese spreads", qty: "Gone" },
      { name: "Sugar, mithai, biscuits, packaged juice", qty: "Gone" },
      { name: "Deep-fried snacks, namkeen bags", qty: "Gone" },
      { name: "Soft drinks, energy drinks", qty: "Gone" },
    ],
  },
];

export const SUPPLEMENTS = [
  { name: "Whey protein", dose: "1–2 scoops/day (25–50 g)", why: "Cheapest, easiest way to close a 165 g protein day. Food first, whey to fill the gap.", must: true },
  { name: "Creatine monohydrate", dose: "3–5 g daily, any time", why: "Best-researched supplement in existence: +5–10% strength, better recovery, keeps training quality high in a deficit. Expect +1 kg scale water — that is NOT fat.", must: true },
  { name: "Vitamin D3", dose: "1,000–2,000 IU with a fat-containing meal", why: "Office job = no sun. Low D tanks testosterone, mood and recovery. Test if you can.", must: true },
  { name: "Omega-3 (fish oil)", dose: "1–2 g EPA+DHA", why: "If you eat fish twice a week you can skip it. Joint and recovery support.", must: false },
  { name: "Magnesium glycinate", dose: "200–300 mg before bed", why: "Optional. Improves sleep quality on a deficit.", must: false },
  { name: "Skip: fat burners, BCAA, test boosters, detox tea", dose: "0", why: "Zero evidence for a healthy 25-year-old. They only burn money.", must: false },
];

/** ── TRAINING ──────────────────────────────────────────────────── */

export type Exercise = {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  cue: string;
  key?: boolean;
};

export type Workout = {
  id: string;
  day: string;
  title: string;
  focus: string;
  duration: string;
  warmup: string[];
  blocks: { label: string; note?: string; exercises: Exercise[] }[];
  finisher: string;
};

export const WORKOUTS: Workout[] = [
  {
    id: "w1",
    day: "Mon",
    title: "Day 1 · Push + Core",
    focus: "Upper chest, side delts, triceps — the 'wide and dry' upper body",
    duration: "7:40 → 8:30 PM (50 min)",
    warmup: [
      "5 min incline treadmill or bike, easy pace (get warm, not tired)",
      "20 band pull-aparts · 15 bodyweight squats · 10 scapular push-ups",
      "2 light ramp-up sets of the first exercise",
    ],
    blocks: [
      {
        label: "A · Heavy compound",
        note: "Load matters here. Add weight when you hit the top of the rep range on every set.",
        exercises: [
          { name: "Incline dumbbell press (30°)", sets: "4", reps: "8–10", rest: "90–120 s", cue: "Elbows ~45°, lower to chest level, no bouncing.", key: true },
          { name: "Seated dumbbell shoulder press", sets: "3", reps: "10–12", rest: "90 s", cue: "Ribs down, press slightly back, control the negative." },
        ],
      },
      {
        label: "B · Shape work (superset)",
        note: "This block builds the shoulder cap that makes a waist look small. Chase the burn, not the load.",
        exercises: [
          { name: "Dumbbell lateral raise", sets: "4", reps: "12–15", rest: "45 s", cue: "Lead with the elbow, thumb slightly down, stop at shoulder height.", key: true },
          { name: "Cable / pec-deck fly", sets: "3", reps: "12–15", rest: "45 s", cue: "Squeeze for 1 s at the mid-line." },
          { name: "Rope triceps pushdown", sets: "3", reps: "12–15", rest: "45 s", cue: "Elbows pinned to your ribs." },
        ],
      },
      {
        label: "C · Core",
        exercises: [
          { name: "Hanging knee raise", sets: "3", reps: "12–15", rest: "45 s", cue: "Curl the pelvis, don't just swing legs." },
          { name: "Cable crunch", sets: "3", reps: "15", rest: "45 s", cue: "Exhale hard, round the spine." },
        ],
      },
    ],
    finisher: "8 min incline walk — 12% incline, 5.0–5.5 km/h. Towel on, phone down, done.",
  },
  {
    id: "w2",
    day: "Wed",
    title: "Day 2 · Legs + Conditioning",
    focus: "Strength, calorie burn and the hormonal response only legs deliver",
    duration: "7:40 → 8:30 PM (50 min)",
    warmup: ["5 min bike, moderate", "Bodyweight squats ×15, glute bridge ×15, 90/90 hip openers ×8/side", "2 ramp-up sets of squats with the empty bar"],
    blocks: [
      {
        label: "A · Heavy compound",
        exercises: [
          { name: "Back squat (or hack squat)", sets: "4", reps: "6–8", rest: "2 min", cue: "Brace, sit between the hips, knees track over toes.", key: true },
          { name: "Romanian deadlift", sets: "3", reps: "8–10", rest: "2 min", cue: "Hinge, feel the hamstrings stretch, flat back, bar close." },
        ],
      },
      {
        label: "B · Volume + unilateral",
        exercises: [
          { name: "Bulgarian split squat / walking lunge", sets: "3", reps: "10 / leg", rest: "60 s", cue: "Front shin vertical, torso tall." },
          { name: "Seated leg curl", sets: "3", reps: "12–15", rest: "60 s", cue: "Pause 1 s at full contraction." },
          { name: "Standing calf raise", sets: "4", reps: "12–15", rest: "45 s", cue: "2 s up, 2 s down, full stretch at the bottom." },
        ],
      },
      {
        label: "C · Conditioner",
        exercises: [{ name: "Bike sprints: 20 s hard / 40 s easy", sets: "8–10", reps: "rounds", rest: "—", cue: "Weeks 1–4: 6 rounds. Week 5+: build to 10." }],
      },
    ],
    finisher: "Nothing. Legs day is the finisher.",
  },
  {
    id: "w3",
    day: "Fri",
    title: "Day 3 · Pull + Arms",
    focus: "Back width, rear delts, biceps — the V-taper that sells the physique",
    duration: "7:40 → 8:30 PM (50 min)",
    warmup: ["5 min rowing or brisk incline walk", "20 band pull-aparts, 10 dead hangs (grip + shoulders)", "2 ramp-up sets of pulldowns"],
    blocks: [
      {
        label: "A · Heavy compound",
        exercises: [
          { name: "Lat pulldown, wide grip (or pull-ups)", sets: "4", reps: "8–10", rest: "90 s", cue: "Drive elbows to the hips, chest to the bar, no swinging.", key: true },
          { name: "Chest-supported row / seal row", sets: "4", reps: "10", rest: "90 s", cue: "Pause 1 s with the plates at the chest.", key: true },
        ],
      },
      {
        label: "B · Detail work (superset)",
        exercises: [
          { name: "Seated cable row, neutral grip", sets: "3", reps: "12", rest: "60 s", cue: "Squeeze the mid-back, shoulders down." },
          { name: "Face pull", sets: "3", reps: "15–20", rest: "45 s", cue: "Pull to the forehead, rotate elbows up. Posture insurance." },
          { name: "Incline dumbbell curl ss/ hammer curl", sets: "3", reps: "10–12", rest: "45 s", cue: "No hip drive. 3 s lowering." },
        ],
      },
      {
        label: "C · Core",
        exercises: [{ name: "Ab-wheel / plank-to-push-up", sets: "3", reps: "8–12", rest: "45 s", cue: "Ribs down, no lower-back sag." }],
      },
    ],
    finisher: "10 min zone-2 bike (you can talk, but barely) — extra 100–130 kcal, zero recovery cost.",
  },
  {
    id: "w4",
    day: "Sat",
    title: "Day 4 (optional) · Athletic + Weak Point",
    focus: "From week 5, add this 40-min session. It is what turns 'lean' into 'athletic'",
    duration: "Anytime · 40 min",
    warmup: ["5 min skip rope or brisk walk + 10 each of inchworms, lateral lunges, A-skips"],
    blocks: [
      {
        label: "A · Explosive / athletic",
        exercises: [
          { name: "Box jump or broad jump", sets: "4", reps: "4", rest: "90 s", cue: "Land soft, reset every rep." },
          { name: "Med-ball slam", sets: "3", reps: "8", rest: "60 s", cue: "Full extension, hard exhale." },
        ],
      },
      {
        label: "B · Weak-point hypertrophy",
        note: "Pick delts + arms + abs. 4 exercises, 3 sets each, 12–15 reps, 45 s rest, minimal rest overall.",
        exercises: [
          { name: "Cable lateral raise (each arm)", sets: "3", reps: "15", rest: "40 s", cue: "Constant tension, no rest at the bottom." },
          { name: "Overhead cable triceps extension", sets: "3", reps: "12–15", rest: "40 s", cue: "Elbows high and still." },
          { name: "Bayesian / incline curl", sets: "3", reps: "12", rest: "40 s", cue: "Stretch at the bottom." },
          { name: "Hollow-body hold / v-up", sets: "3", reps: "30 s / 12", rest: "40 s", cue: "Low back glued down." },
        ],
      },
      {
        label: "C · Zone-2 cardio",
        exercises: [{ name: "Brisk walk, cycle or elliptical", sets: "1", reps: "20 min", rest: "—", cue: "Nasal breathing possible, heart rate ~120–135." }],
      },
    ],
    finisher: "Done. Sunday is a full rest day with meal prep and measurements.",
  },
];

export const TRAINING_RULES = [
  { rule: "Log every set", detail: "Notebook or app. If you cannot beat last week's numbers, you are maintaining, not building." },
  { rule: "Double progression", detail: "Stay at a weight until you hit the TOP of the rep range on all sets, then add 2.5 kg (upper) or 5 kg (lower) and build back up." },
  { rule: "Tempo 3-1-1", detail: "3 s down, 1 s pause, 1 s up on every accessory. Half the weight, double the stimulus." },
  { rule: "Rest properly", detail: "90–120 s on compounds, 45–60 s on shape work. Rushed = lighter = worse." },
  { rule: "RPE 8", detail: "Stop 2 reps short of failure on compounds; take accessories to RPE 9–10. Train hard, not wrecked." },
  { rule: "Deload week 7 and 13", detail: "Same exercises, 40% fewer sets, same weights. Recovery is when you actually grow." },
  { rule: "Never skip the 10-min warm-up", detail: "It is the difference between progressing for 12 weeks and a shoulder injury in week 3." },
];

export const NEAT_PLAN = [
  { time: "7:00", action: "Wake, 600 ml water, 5 min mobility before shower" },
  { time: "7:50", action: "Park 500 m away or get dropped 2 streets early — 900 steps banked" },
  { time: "Every 45 min", action: "Stand up for 60 s at your desk. Set a recurring calendar alarm" },
  { time: "12:00", action: "10-min walk after your snack — the single best glucose hack for office workers" },
  { time: "1:45", action: "10-min walk after lunch. Kills the 3 PM crash better than coffee does" },
  { time: "6:55", action: "Alight one stop early / walk 10 min from the bus or rickshaw" },
  { time: "9:20", action: "10-min slow walk after dinner, then shower — improves sleep and digestion" },
  { time: "Target", action: "8,000–10,000 steps · roughly 300–400 kcal/day · zero joint stress" },
];

/** ── WEEKLY SCHEDULE GRID ──────────────────────────────────────── */

export const WEEK_GRID = [
  { day: "Monday", am: "7:00 wake · water · 7:20 light fuel · 7:50 leave", work: "9:30 breakfast · 12:15 snack · 1:30 lunch · 10-min walk after lunch", pm: "7:15 pre-workout bite · 7:40–8:30 GYM D1 (Push+Core) · 9:00 dinner + whey · 10:30 lights out" },
  { day: "Tuesday", am: "7:00 wake · water · mobility 5 min", work: "9:30 breakfast · 12:15 snack · 1:30 lunch · 2 × 10-min walks", pm: "7:30 25-min brisk walk + 10 min abs at home (no equipment) · 9:00 dinner · 10:30 out" },
  { day: "Wednesday", am: "7:00 wake · water · dates + green tea", work: "9:30 breakfast · 12:15 snack · 1:30 lunch (higher carb) · walk", pm: "7:15 pre-workout · 7:40–8:30 GYM D2 (Legs+Conditioning) · 9:00 dinner + whey · 10:30 out" },
  { day: "Thursday", am: "7:00 wake · water · mobility", work: "9:30 breakfast · 12:15 snack · 1:30 lunch · walk", pm: "7:30 25-min brisk walk + push-ups & plank at home · 9:00 dinner · 10:30 out" },
  { day: "Friday", am: "7:00 wake · water", work: "9:30 breakfast · 12:15 snack · 1:30 lunch · walk", pm: "7:15 pre-workout · 7:40–8:30 GYM D3 (Pull+Arms) · 9:00 dinner + whey · 10:30 out" },
  { day: "Saturday", am: "7:30 wake · weigh-in · waist · photos", work: "10:00 brunch · free-time / errands", pm: "Optional GYM D4 (Athletic) or sport with friends · 9:00 dinner (eating-out rules)" },
  { day: "Sunday", am: "8:00 wake · long easy walk 40 min", work: "MEAL PREP: cook chicken, boil eggs, hang curd, chop salad, portion dal & rice", pm: "2:00 lunch · 8:30 light dinner · plan the week · 10:30 lights out" },
];

/** ── OUTCOMES ──────────────────────────────────────────────────── */

export const OUTCOME_MILESTONES = [
  {
    phase: "Weeks 1–2",
    weight: "−1.5 to −2.5 kg",
    waist: "35 → 34.5 in",
    body: "Mostly water, sodium and glycogen — it will look dramatic and it is not all fat. Face and fingers de-puff first. Gym performance flat.",
    feels: "Hunger arrives in week 2. Sugar cravings peak days 8–12, then vanish. Sleep improves once the 9:30 tea goes.",
    tone: "cyan",
  },
  {
    phase: "Weeks 3–6",
    weight: "−0.55 to −0.7 kg / week",
    waist: "34.5 → 33.5 in",
    body: "Real fat loss: ~2.5 kg. Shirts loosen at the waist, sleeves tighten at the shoulder. Upper chest and side delts start filling out.",
    feels: "Strength climbs 5–15% on every lift (newbie + re-fed trainee effect). Energy stable. Morning hunger = you are on track.",
    tone: "lime",
  },
  {
    phase: "Weeks 7–12",
    weight: "87 → 79.5–80.5 kg",
    waist: "33.5 → 32.2 in",
    body: "6–7 kg down, body fat ~22% → ~17%. Upper abs outline visible in good light, chest-to-waist difference obvious in a t-shirt. Veins on forearms.",
    feels: "Plateau risk highest here — use the troubleshooting rules. Add the 4th session and a diet-break week at maintenance.",
    tone: "amber",
  },
  {
    phase: "Months 4–6",
    weight: "79.5 → 76–77 kg",
    waist: "31–32 in",
    body: "Fat mass down to ~11 kg — roughly 14% on a field estimate, closer to 13% in reality because you held your muscle. Full ab separation standing, sharp shoulder caps, jawline defined. This is the 'lean athletic' look you described.",
    feels: "Reverse-diet calories up 100–150/week to ~2,600 and hold. Strength keeps climbing on 4 sessions.",
    tone: "violet",
  },
  {
    phase: "Months 9–12",
    weight: "75–77 kg, stable",
    waist: "30–31 in",
    body: "10–12% body fat with a wider, denser frame than the one you started with. Kohli/Ronaldo territory — they hold 8–12% year-round, and so can you.",
    feels: "Maintenance becomes almost effortless: high protein + 3–4 sessions + 8k steps is now just your life.",
    tone: "rose",
  },
];

export const STRENGTH_TARGETS = [
  { lift: "Incline DB press (per hand)", now: "12–14 kg", w12: "18–20 kg", w24: "22–24 kg" },
  { lift: "Back squat", now: "50–60 kg", w12: "75–85 kg", w24: "95–105 kg" },
  { lift: "Romanian deadlift", now: "50 kg", w12: "70–80 kg", w24: "90–100 kg" },
  { lift: "Lat pulldown / pull-up", now: "40–45 kg / 0", w12: "60 kg / 5–6 pull-ups", w24: "75 kg / 10–12 pull-ups" },
  { lift: "Chest-supported row", now: "30 kg", w12: "45 kg", w24: "55–60 kg" },
  { lift: "Bodyweight", now: "0 pull-ups, 20 push-ups", w12: "5 pull-ups, 35 push-ups", w24: "12 pull-ups, 50 push-ups" },
];

export const HONEST_EXPECTATIONS = [
  "You will NOT look like Ronaldo in 12 weeks. He has 15+ years of training behind that physique. 12 weeks gets you visibly lean and athletic; 12 months gets you the full look.",
  "You will lose 6–8 kg on the scale in 12 weeks, and 8–10 kg of actual fat while adding 1–1.5 kg of muscle. Judge the waist and the mirror.",
  "Spot reduction is not real. Belly fat goes last — that is genetics, not a mistake in your plan.",
  "The scale will lie to you: sodium, creatine, carb intake and cycle-of-life water swings hide fat loss for 10 days at a time. Weigh daily, average weekly.",
  "Muscle gain in a deficit is slow (0.5–1% of body weight per month at best, and you are past the beginner window for the fast part). Patience is the programme.",
  "No, lifting will not make you 'bulky'. Bulk requires a calorie surplus. You will be in a 500 kcal deficit for months — you physically cannot get bigger.",
  "You will have 2–3 bad weeks — a wedding, an office party, a trip. One bad week does not ruin 12 good ones. Restart the next meal, not next Monday.",
];

export const TROUBLESHOOT = [
  { problem: "Weight static for 2+ weeks", cause: "Metabolic adaptation, or hidden calories (oil, sauces, weekend)", fix: "Cut 150 kcal (drop ½ roti or the rice) AND add 2,000 steps for 2 weeks. Also re-check: are you weighing and logging the oil?" },
  { problem: "Strength dropping for 2+ sessions", cause: "Deficit + under-recovered, sleep under 7 h", fix: "Add an extra rest day, move to maintenance calories for 5–7 days, sleep 8 h. Muscle is not disappearing in a week." },
  { problem: "Ravenous at 11 AM / 5 PM", cause: "Not enough protein or volume at the previous meal", fix: "Add 150 g hung curd + a raw-vegetable bowl. Fibre and protein, not more carbs." },
  { problem: "No energy in the gym", cause: "No pre-workout fuel, or you trained after a 6-hour fast", fix: "Banana + black coffee 45–60 min before. If still flat, add 10 g carbs from dates." },
  { problem: "Sleep is broken", cause: "Caffeine after 4 PM, screens late, training too close to bed", fix: "Last caffeine 4 PM. Shower after the gym, screens off 10:15, room dark and cool." },
  { problem: "Waist dropping but scale frozen", cause: "Body recomposition — you are gaining muscle while losing fat", fix: "This is the best outcome. Do nothing different. Trust the waist tape and photos." },
  { problem: "Motivation gone in week 6", cause: "Novelty wore off, results feel slow", fix: "Compare week-1 photos to week-6 photos, not your imagination. Recommit to 2 more weeks, not 12." },
];

export const FAQS = [
  {
    q: "Can I still eat roti and chapati?",
    a: "Yes — and you should. Roti is not the problem; the number of rotis and what you eat with them is. 1 whole-wheat roti (no ghee) ≈ 100 kcal, 3 g protein. Target 3–4/day, always with a protein source. Add 2 tbsp of wheat bran to your atta: more fibre, slower carbs, more fullness.",
  },
  {
    q: "Do I need to give up tea?",
    a: "No, give up the sugar and the timing. Milk tea without sugar is ~40 kcal. Three a day is fine. Two with sugar is 200 empty kcal plus an insulin spike. And no caffeine after 4 PM — that single change is worth more than a fat burner.",
  },
  {
    q: "Is whey protein necessary? Is it a steroid?",
    a: "It is filtered milk protein, not a steroid, and it is not magic. It is simply the cheapest and most convenient way to hit 165 g/day. 1 kg lasts a month and costs less than the chicken it replaces. If you can hit your protein from eggs, chicken, curd and paneer — skip it entirely.",
  },
  {
    q: "Should I do intermittent fasting / skip breakfast?",
    a: "Only if it makes eating less easier for you. Evidence shows total calories and protein decide fat loss, not the eating window. With your office hours and evening training, skipping breakfast usually leads to 9 PM bingeing. Eat 5 controlled feeds instead.",
  },
  {
    q: "How do I handle weddings, dawats and office biryani?",
    a: "Rules: protein first (chicken tikka, kebab, fish), salad second, one carb you can name (¼ plate rice, skip the naan), no sugary drink, one dessert only if you truly want it. Eat a 30 g protein snack before you leave so you arrive non-ravenous. Then just return to the plan at the next meal.",
  },
  {
    q: "Will I get loose skin?",
    a: "Extremely unlikely. You are 25, losing ~0.6 kg/week over 6 months, not 15 kg in 8 weeks. Skin retracts at that pace. Hydration, protein, vitamin C and sleep handle the rest.",
  },
  {
    q: "Can I drink alcohol?",
    a: "You can, budget for it: each drink is ~100–150 kcal, blunts fat oxidation for hours, destroys sleep and removes your inhibition around food. Cap it at 2 drinks, once a week, and count it as your free meal.",
  },
  {
    q: "What if I can only train 3 days a week forever?",
    a: "Fine — 3 hard, progressive sessions a week is 80% of the result. Keep the Monday/Wednesday/Friday split, keep the step count high, and add one home session (push-ups, plank, band laterals) if you ever feel like it.",
  },
  {
    q: "Cardio or weights for fat loss?",
    a: "Weights build the shape; the deficit removes the fat. Cardio is a tool to make the deficit bigger without starving. Order of importance: nutrition → steps → weights → cardio. Never swap weights for cardio.",
  },
  {
    q: "How do I know it is working if the scale is noisy?",
    a: "Four signals, in order of trust: (1) weekly waist tape at the navel, (2) weekly photo in the same light and pose, (3) strength numbers in the log, (4) weekly average weight. If any one of them is moving, you are winning.",
  },
];
