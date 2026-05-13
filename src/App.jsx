import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0a0a0f", surface: "#12121a", card: "#1a1a26", border: "#2a2a40",
  gold: "#c9973a", goldL: "#e8b85a", goldD: "#7a5a20", amber: "#d4781a",
  text: "#e8e0d0", textD: "#a09080", textM: "#605850", white: "#f5f0e8",
};

const NAV = [
  { id: "intro", icon: "☸", label: "Гэлүгба" },
  { id: "teach", icon: "📖", label: "Сургаал" },
  { id: "meditate", icon: "🪷", label: "Бясалгал" },
  { id: "timer", icon: "⏱", label: "Таймер" },
  { id: "journal", icon: "📝", label: "Тэмдэглэл" },
];

const TEACHINGS = [
  {
    title: "Ламрим — Замын үе шат", icon: "🏔",
    items: [
      { name: "Доод түвшин", color: "#4a8a4a", desc: "Үхлийн бясалгал, Карма, Муу замуудаас зугтах", detail: "Бүх амьтан үхнэ. Үхлийн цаг тодорхойгүй. Үхлийн цагт зөвхөн Дхарма тус болно. Сайн дүрд дахин төрөхийг зорино." },
      { name: "Дунд түвшин", color: "#4a6a9a", desc: "Дөрвөн Эрхэм Үнэн, Найман Эрхэм Зам", detail: "Сансараас бүрмөсөн чөлөөлөгдөхийг эрмэлзэнэ. Зовлон, Үүсэл, Зогсолт, Зам — дөрвөн эрхэм үнэнийг ойлгоно." },
      { name: "Дээд түвшин", color: "#8a4a9a", desc: "Бодичитта, Зургаан Парамита, Махаяна", detail: "Бүх амьтныг аврахын тулд Буддын чанарт хүрэхийг эрмэлзэнэ. Өрөвдөл ба мэргэн ухааныг нэгтгэнэ." },
    ],
  },
  {
    title: "Шуньята — Хоосон чанар", icon: "◯",
    items: [
      { name: "Хоёр үнэн", color: "#6a5a3a", desc: "Харагдахуйн үнэн ба Дээд үнэн", detail: "Юмс харагдана — харагдахуйн үнэн. Тэдгээр нь өөрийнхөө чанараар бие даасан оршихуйгүй — дээд үнэн." },
      { name: '"Би" хоосон', color: "#5a3a6a", desc: 'Бие даасан "би" байхгүй гэдгийг ойлгох', detail: '"Би" толгой уу? Гар уу? Бодол уу? — аль нь ч биш. Гагцхүү нэрлэлтийн хэрэглэгдэхүүн болох "би" байна.' },
      { name: "Прасангика", color: "#3a5a6a", desc: "Цонкапагийн хамгийн гүн тайлбар", detail: "Нагаржуна, Чандракиртийн уламжлалыг дагана. Мадхьямакийн хамгийн нарийн тайлбар." },
    ],
  },
  {
    title: "Зургаан Парамита", icon: "✦",
    items: [
      { name: "Дана — Өгөөмөр байдал", color: "#4a7a5a", desc: "Материал, Дхарма, Айдасгүй байдлыг өгөх", detail: "Өгөх нь хүлэгдэлтэй байдлыг суллана. Гурван төрлийн өгөмж: материал, Дхарма, айдасгүй байдал." },
      { name: "Шила — Ёс суртахуун", color: "#5a7a4a", desc: "Арван муу үйлээс татгалзах", detail: "Ам, бие, ухааны арван муу үйлээс татгалзана. Энэ нь бясалгалын суурь." },
      { name: "Праджня — Мэргэн ухаан", color: "#7a5a4a", desc: "Хоосон чанарыг шууд ойлгох", detail: "Аналитик бясалгалаар хоосон чанарыг ойлгоно. Энэ нь чөлөөлөлтийн шууд шалтгаан." },
    ],
  },
];

const PRACTICES = [
  {
    id: "anapana", title: "Амьсгааны бясалгал", subtitle: "Шамата — Тайван байдал", icon: "🌬", duration: 10, level: "Анхан шат",
    intro: "Амьсгааны бясалгал бол бүх бясалгалын суурь. Сэтгэлийг нэг цэгт тогтоох энэ практик нь Шамата буюу 'тайван байдал'-ын үндэс юм. Цонкапа энэ бясалгалыг сэтгэлийн есөн үе шатны эхлэл гэж тодорхойлсон.",
    steps: [
      { title: "Бие тохируулах", text: "Тайван газар шулуун суу. Нуруугаа тэгш — хэт хатуу биш, хэт зөөлөн биш. Гарыг өвдөг дээр эсвэл хөлийн дэргэд тавь. Мөрийг сулруул. Эрүүг аажим доош хазай. Энэ нь бясалгалын 'Ваджрасана' суудал — сэрүүн, тогтвортой байдлыг бий болгоно." },
      { title: "Нүд, хэл тохируулах", text: "Нүдийг хагас ани — бүрэн аниагүй, бүрэн нээлгүй. Газраас 1–2 метр урагш харна. Хэлийг дээд тагнайд зөөлнөөр хүргэ — энэ нь шүлс ихтэй гарахаас сэргийлнэ. Амаа аажим хаа." },
      { title: "Амьсгааг мэдэрч эхэл", text: "Хамрын үзүүрт — амьсгаа орж, гарч байгааг мэдэр. Хөргөсөн агаар орж, дулаарсан агаар гарч байгааг мэдэр. Амьсгааг өөрчлөх хэрэггүй — байгалийн хэмнэлийг ажигла. Энэ 'ажиглах' байдал нь практикийн гол зүйл." },
      { title: "Тоолж эхэл", text: "Амьсгаа орохдоо — 1, гарахдаа — 2, орохдоо — 3... гэж 21 хүртэл тоол. 21-д хүрсний дараа 1-ээс дахин эхэл. Тоолох нь анхаарлаа хадгалахад тусалдаг хэрэгсэл — зорилго биш. Аажмаар тоолохоо болиод зүгээр л амьсгааг мэдэрч болно." },
      { title: "Тэнэсэн бодолтой харьцах", text: "Бодол гарна — энэ бол буруу биш, энэ бол хэвийн. Бодол гарсан үед: 'Аа, бодол...' гэж зөөлнөөр тэмдэглэ. Шүүмжлэлгүйгээр, уурлахгүйгээр анхаарлаа буцаа. Анхаарлаа буцааж байгаа мөч бүр нь бясалгалын ахиц. Энэ нь булчин хөгжүүлэхтэй адил — давтагдах бүрдээ хүчтэй болно." },
      { title: "Бататгал ба дуусгавар", text: "Практикийн эцэст аажмаар нүдийг нээ. Хэдэн агшин тайван байж, мэдрэмжийг хадгал. 'Энэ практикийн буянаа бүх амьтанд зориулна' гэж бод. Өдрийн туршид богино богино амьсгааны бясалгал хийх боломжтой — цайны завсарлага, унаа дотор гэх мэт." },
    ],
    obstacles: [
      { name: "Сэтгэл тэнэх", fix: "Тоолохыг хурдасгах, амьсгааны дулааныг илүү тодорхой мэдрэх, нүдийг аажим нээх" },
      { name: "Нойрмоглох", fix: "Нуруугаа тэгш бол, нүдийг нээ, гэрлийг нэмэгдүүл, хурдан гүн амьсгаа 3 удаа ав" },
      { name: "Амьсгаа барих", fix: "Амьсгааг хянах гэж байна — сулруул, байгалийн хэмнэлийг ажигла" },
      { name: "Биеийн өвдөлт", fix: "Байрлалаа аажим өөрчил, дэр ашигла, 20 мин-аас илүү нэг суудлаар суухгүй байх" },
    ],
    benefits: ["Сэтгэлийн тогтвор нэмэгдэнэ", "Анхаарлын чадвар хөгждэг", "Стресс буурна", "Бусад бясалгалын суурь бэлдэгдэнэ"],
    tip: "Өдөр бүр 10 минут хийх нь долоо хоногт нэг удаа 70 минут хийхээс үр дүнтэй.",
    quote: "Сэтгэлийг нэг цэгт тогтоох чадвар бол бусад бүх бясалгалын суурь.",
  },
  {
    id: "tonglen", title: "Тончлэн", subtitle: "Өгөх ба Авах бясалгал", icon: "💫", duration: 20, level: "Дунд шат",
    intro: "Тончлэн (གཏོང་ལེན་) нь 'өгөх ба авах' гэсэн утгатай. Атишагаас уламжлагдсан энэхүү практик нь Бодичитта — гэгээрлийн сэтгэлийг хөгжүүлэх хамгийн хүчтэй аргуудын нэг. Өөрийнхөө аз жаргалыг бусдад өгч, бусдын зовлонг өөртөө авах энэ бясалгал нь 'би' гэсэн хаалтыг нурааж, өрөвдлийг бодит хүч болгодог.",
    steps: [
      { title: "Суурь тогтоох — Тэнцүү байдал", text: "Амьсгааны бясалгалаар 5 минут тайвшир. Дараа нь: бүх амьтныг дүрслэ — хүн, амьтан, шавж хүртэл. 'Бүгд аз жаргахыг хүснэ, бүгд зовлонгоос ангижрахыг хүснэ' гэж мэдэр. Найз, дайсан, харь хүн — ялгаагүй тэнцүүхэн харна. Энэ тэнцүү байдал нь Тончлэний суурь." },
      { title: "Авах — Лэн (ལེན་)", text: "Амьсгаа татахдаа: хар утаа эсвэл хар гэрлийг дүрслэ. Энэ хар гэрэл бол бүх амьтны зовлон, өвчин, айдас, гуниг, уур хилэн, мунхаглал. Энэ бүгдийг өөрийн зүрхэнд татаж авна. Зүрхэнд хар цэг болж хайлна. Тэд чөлөөлөгдөнө, хөнгөрнө. Айх хэрэггүй — энэ бол зөвхөн сэтгэлийн дасгал." },
      { title: "Өгөх — Тонг (གཏོང་)", text: "Амьсгаа гаргахдаа: цагаан гэрлийг дүрслэ. Энэ цагаан гэрэл бол миний аз жаргал, эрүүл мэнд, эерэг ойлгомж, энх тайван, буян. Энэ бүгдийг бүх амьтанд тарааж өгнө. Тэд дулаацана, инээмсэглэнэ, зовлонгоос чөлөөлөгдөнө. Гэрэл тэдний биед нэвтэрч, зүрхэнд шингэнэ." },
      { title: "Хувийн хүнтэй ажиллах", text: "Дасч ирсний дараа: одоо зовж байгаа тодорхой хүнийг бод. Өвчтэй хэн нэгэн, гунигласан хэн нэгэн, эсвэл хүнд байдалд байгаа хэн нэгэн. Амьсгаа татахдаа тэдний зовлонг авч, амьсгаа гаргахдаа аз жаргал, эдгэрэл өг. Хэдэн минут энэ хүнтэй ажилла." },
      { title: "Бүх амьтанд тарааx", text: "Аажмаар тойргийг өргөтгө: ойр дотны хүмүүс → хөршүүд → танихгүй хүмүүс → таагүй хүмүүс → бүх амьтан. 'Бүх амьтан зовлонгоос чөлөөлөгдөж, аз жаргалтай болтугай' гэсэн мэдрэмжтэй хэсэг хугацаа байж бай. Зүрхний дулааныг мэдэр." },
      { title: "Дуусгавар ба зориулалт", text: "Аажмаар буцаж ир. Нүдийг аажим нээ. Өөрийгөө тэмдэглэ — юу мэдэрсэн бэ? Ямар өөрчлөлт гарсан бэ? Эцэст нь: 'Энэ практикийн буянаар бүх амьтан зовлонгоос чөлөөлөгдөж, Буддын чанарт хүрэх болтугай' гэж зориул." },
    ],
    obstacles: [
      { name: "Бусдын зовлон авахаас айх", fix: "Энэ нь бодит физик процесс биш — сэтгэлийн дасгал гэдгийг санаарай. Айдас нь эго-ийн хамгааллын тэмдэг." },
      { name: "Мэдрэмж мэдрэхгүй байх", fix: "Тодорхой нэг хүн — хайртай хүн, эмч, нохойноосоо эхэл. Жижигхэн мэдрэмж байсан ч болно." },
      { name: "Гунигшиж дарагдах", fix: "Хэтэрхий гүнзгийрэх хэрэггүй — тогтоол өрөвдөл, суусан өрөвдөл биш. Хэрэв хэцүү бол амьсгааны бясалгалд буцаа." },
    ],
    benefits: ["Өрөвдлийн чадвар хөгждэг", "'Би' гэсэн хаалт буурна", "Харилцаа сайжирна", "Бодичитта суурь тавигдана", "Сэтгэлийн агуу тэлэлт"],
    tip: "Тончлэн бол сэтгэлийн хамгийн хүчтэй практикийн нэг.",
    quote: "Бусдын зовлонг авч, өөрийн аз жаргалыг өгөх — энэ нь Бодисатвагийн зам.",
  },
  {
    id: "sunyata", title: "Хоосон чанарын бясалгал", subtitle: "Шуньята — Прасангика Мадхьямака", icon: "◯", duration: 20, level: "Дэвшилтэт",
    intro: "Шуньята буюу хоосон чанарын бясалгал нь Гэлүгбын гүн ухааны цөм. Цонкапа Чандракиртийн Прасангика-Мадхьямака тайлбарыг дагана: бүх үзэгдэл өөрийн дотоод бие даасан оршихуйгүй — шалтгаан, нөхцөл, нэрлэлтээр л оршдог. Энэ ойлголт нь сансарын зовлонгийн үндэс болох 'би' гэсэн буруу үзлийг нурааж, жинхэнэ чөлөөлөлтийн замыг нээдэг.",
    steps: [
      { title: "Аналитик бясалгалын суурь", text: "Тайвшрахын тулд 5-10 минут амьсгааны бясалгал хий. Дараа нь аналитик горимд орно: энэ бясалгалд сэтгэл нэг цэгт тогтохоос илүү, сэтгэлийн нарийн шинжилгээ чухал. Асуулт асуух, хайх, олохгүй байх — энэ бол хоосон чанарын бясалгалын арга." },
      { title: '"Би" хайх', text: "\"Би\" хэн бэ? гэж асуу. Аажмаар шинжил:\n• Толгой бол \"би\" мөн үү? — \"Миний толгой\" гэж хэлдэг, тэгвэл \"би\" ≠ толгой\n• Гар бол \"би\" мөн үү? — \"Миний гар\" — тэгвэл \"би\" ≠ гар\n• Бодол бол \"би\" мөн үү? — Бодол өнгөрнө, \"би\" үлддэг мэт санагдана — тэгвэл \"би\" ≠ бодол\n• Биеийн нийлбэр бол \"би\" мөн үү? — нийлбэр нь тус тусынхаас өөр зүйл үү?\nАль нь ч \"би\" биш гэдгийг мэдэр." },
      { title: "Хоосон чанарыг мэдрэх", text: "\"Би\" олдохгүй байна... Энэ мэдрэмжтэй бай. Цочрох хэрэггүй — айх хэрэггүй. Энэ нь оршихуй байхгүй гэсэн үг биш. Харин бие даасан, өөрийнхөө чанараар оршигч \"би\" байхгүй гэсэн үг. Нэрлэлт, уламжлалын хэрэглэгдэхүүн болох \"би\" оршино. Энэ хоёрын зөрүүг мэдэр." },
      { title: "Нэрлэлтээр оршихуйг ойлгох", text: "Ширээ гэж юу вэ? Мод ширхэгүүд цуглаж ширээ болдоггүй — хэлбэр, зориулалт, нэрлэлтээс л \"ширээ\" болдог. Мөн адил \"би\" гэсэн зүйл байна — гэхдээ гагцхүү нэрлэлтийн хүрээнд. Юмс харагдана, байдаг — харагдахуйн үнэн. Гэхдээ бие даасан оршихуй байхгүй — дээд үнэн. Хоёуланг нь зэрэг барь." },
      { title: "Харагдахуй ба хоосон чанарыг нэгтгэх", text: "Аажмаар нүдийг нээ. Өрөөгөө харна — юмс харагдаж байна. Одоо: эдгээр юмс нь өөрийнхөө чанараар оршдог мэт харагддаг — гэхдээ мөн чанар нь хоосон. Харагдах байдал ба хоосон чанар нь зөрчилддөггүй — хоёулаа нэгэн зэрэг үнэн. Энэ \"хоёр үнэний нэгдэл\"-ийг мэдэр. Эхэндээ хэцүү байна — давтамжаар хөгждэг." },
      { title: "Дуусгавар ба дараагийн алхам", text: "Аналитик шинжилгээний дараа: тогтоол бясалгалд ор — олсон ойлгомжоо зүгээр л мэдэрч бай. Бодол гарвал дахин шинжил эсвэл зүгээр л буцаа. Эцэст нь буянаа зориул. Чухал: ганц бясалгалаар бүрэн ойлголт гардаггүй — энэ бол жилүүд, арван жилүүдийн хөгжил. Тогтмол байх нь гол." },
    ],
    obstacles: [
      { name: "Оршихуй байхгүй болох вий гэж айх", fix: "Хоосон чанар бол үгүйсгэл биш — нэрлэлтийн хүрээнд оршихуй байна. Нагаржуна: 'Хоосон учраас л юмс ажиллана'" },
      { name: "Ойлгосон мэт болоод дахин мартах", fix: "Энэ нь хэвийн. Оюуны ойлголт → бясалгалын туршлага → шууд ойлгомж гэсэн үе шаттай хөгждөг." },
      { name: "Хэт их бодолд автах", fix: "Шинжилгээ дуусаад тогтоол бясалгалд ор. Аналитик ба тогтоол бясалгалыг ээлжлэн хий." },
    ],
    benefits: ["Буруу үзлийн хаалт суларна", "Уур хилэн, шунал суурь дээрээс буурна", "Чөлөөлөлтийн жинхэнэ суурь тавигдана", "Аливаа юманд хэт баригдахаа болино", "Гүн тайван байдал бий болно"],
    tip: "Хоосон чанар бол юу ч байхгүй гэсэн үг биш — бие даасан оршихуй байхгүй гэсэн үг.",
    quote: "Хоосон учраас л юмс оршдог, харилцаа явагддаг, өөрчлөлт боломжтой болдог. — Нагаржуна",
  },
  {
    id: "death", title: "Үхлийн бясалгал", subtitle: "Маранасати — Яаравчлах зориг", icon: "🕯", duration: 15, level: "Анхан шат",
    intro: "Үхлийн бясалгал нь Ламримын доод түвшний гол практик. Цонкапа: 'Үхлийг бодолгүй байх нь практикийн хамгийн том саад' гэсэн. Энэ бясалгал нь айдас төрүүлэхийн тулд биш — яаравчлах зориг төрүүлэхийн тулд. Үхэл бол бодит, тодорхой бус — гагцхүү Дхарма тус болно гэдгийг гүн мэдрэх нь өдөр тутмыг утга учиртай болгодог.",
    steps: [
      { title: "Тайвшрах", text: "Тайван байрлалд суу. 5 минут амьсгааны бясалгал хий. Сэтгэлийг тогтоо. Энэ бясалгалд айдас, гуниг гарч болно — гарвал зүгээр л ажигла, татгалзах хэрэггүй. Аяндаа гарсан мэдрэмж бол ойлголтын тэмдэг." },
      { title: "Үхэл тодорхой гэдгийг бясалга", text: "Дотроо хэл: 'Би заавал үхнэ.' Жишээ бод:\n• Миний биеийн эс өдөр бүр үхэж байна\n• Миний өмнө амьдарсан бүх хүн үхсэн\n• Дэлхий дээрх бүх амьтан үхнэ\n• Миний бие мөн ижил хуульд захирагдана\nЭнэ баримтыг бүрэн хүлээн зөвшөөр. Яах аргагүй, тодорхой, бодит. Энэ мэдрэмжтэй хэсэг хугацаа байж бай." },
      { title: "Үхлийн цаг тодорхойгүй гэдгийг бясалга", text: "Дотроо хэл: 'Үхлийн цаг тодорхойгүй.'\n• Энэ орой үхэж болно\n• Маргааш үхэж болно\n• Одоо энэ агшинд үхэж болно\nЦочрох биш — ойлгох. Хэдэн минут энэ тодорхойгүй байдлыг мэдэр. Ямар мэдрэмж гарна вэ? Яарах мэдрэмж гарч байна уу? Чухлыг эрэмбэлэх хүсэл гарч байна уу?" },
      { title: "Үхлийн цагт юу тус болохыг бясалга", text: "Дотроо асуу: 'Үхлийн цагт юу тус болох вэ?'\n• Мөнгө, хөрөнгө? — Авч явж чадахгүй\n• Нэр хүнд, цол? — Үлдэхгүй\n• Хайртай хүмүүс? — Дагалдаж чадахгүй\n• Бие? — Орхигдоно\n• Зөвхөн сэтгэлийн хөгжил — карма, ойлголт, хайр — дагалдана\nЭнэ бол аймшигтай биш — энэ бол чөлөөлөгдөлт. Бодит чухлыг харуулна." },
      { title: "Шийдвэр гаргах", text: "Одоо шийдвэр гарга: 'Өнөөдрөөс юу хийх вэ?' Практик биш яриа биш — бодит, тодорхой шийдвэр. Жишээ нь:\n• Өдөр бүр бясалгал хийнэ\n• Хайртай хүмүүстэйгээ илүү цаг өнгөрүүлнэ\n• Муу үйл хийхгүй гэж шийднэ\n• Дхармын ном уншина\nЭнэ шийдвэрийг зүрхэндээ бат барь." },
      { title: "Зориулалт", text: "Гүн амьсгаа ав. Аажмаар нүдийг нээ. Хэдэн агшин тайван байж мэдрэмжийг хадгал. 'Энэ бясалгалын буянаар бүх амьтан үхэл ба дахин төрөлтийн зовлонгоос чөлөөлөгдөх болтугай' гэж зориул. Тэмдэглэл дэвтэртээ: ямар шийдвэр гаргасан, ямар мэдрэмж төрсөн гэдгээ бич." },
    ],
    obstacles: [
      { name: "Хэт айж, гуниглах", fix: "Гүн амьсгаа ав, тогтоол бясалгалд буцаа. Айдас нь ойлголтын эхлэл — дарахгүйгээр ажигла." },
      { name: "Мэдрэмж мэдрэхгүй, оюуны мэдлэг болон үлдэх", fix: "Бодит жишээ хэрэглэ: өвчний үед, хэн нэгэн нас барахад хэрхэн мэдэрсэн гэдгээ санааруул." },
      { name: "Практикаас зугтах хүсэл", fix: "Энэ нь сэтгэлийн эсэргүүцэл — хамгийн чухал цаг. Аажмаар, зөөлнөөр үргэлжлүүл." },
    ],
    benefits: ["Яаравчлах зориг төрнэ", "Чухлыг эрэмбэлэх чадвар нэмэгдэнэ", "Харилцааг үнэлэх болно", "Практик тогтмол болно", "Хуурамч чухлаас гарна"],
    tip: "Үхлийн бясалгал аймшигтай биш — амьдралыг утга учиртай болгоно.",
    quote: "Өглөө бүр 'өнөөдөр үхэж болно' гэж бод, орой бүр 'өнөөдөр сайн амьдарсан' гэж бататга.",
  },
  {
    id: "bodichita", title: "Бодичитта бясалгал", subtitle: "Гэгээрлийн сэтгэл хөгжүүлэх", icon: "🌸", duration: 25, level: "Дунд шат",
    intro: "Бодичитта (བྱང་ཆུབ་ཀྱི་སེམས་) буюу 'гэгээрлийн сэтгэл' нь Махаянагийн гол практик. 'Бүх амьтныг аврахын тулд Буддын чанарт хүрнэ' гэсэн хүсэл, зорилго юм. Цонкапа долоон нүдний шалтгаан аргыг заасан — энэ нь хамгийн нарийн, хамгийн гүн бясалгалуудын нэг.",
    steps: [
      { title: "Тэнцүү байдал — Упекша", text: "Бүх амьтныг нэг дүрсэнд дүрслэ. Найз, дайсан, харь хүн — гурвыг ялгаж үз. Дараа нь: тэд бүгд аз жаргахыг хүсдэг, бүгд зовлонгоос ангижрахыг хүсдэг — энэ талаараа бүгд тэнцүү. Ялгаа гаргах нь бодит биш — нөхцөл байдлаас хамаарсан. Тэнцүү харагдах хүртэл энэ бясалгалтай бай." },
      { title: "Бүх амьтан эх байсан гэдгийг таних", text: "Буддын сургаалаар дахин төрөлт тоолшгүй удаа болсон. Тэгвэл бүх амьтан ямар нэгэн дүрэнд миний эх байсан. Энэ хүн, тэр амьтан — өмнөх дүрэнд миний эх байсан. Бодит мэдрэмжтэйгээр дүрслэ — оюуны мэдлэг биш. Тодорхой нэг амьтнаас эхлэх нь хялбар — нохой, муур гэх мэт." },
      { title: "Эхийн энэрлийг санах", text: "Одоогийн эхийнхээ энэрлийг санааруул: тэр чамайг хэдэн сар гэдсэндээ тээсэн, өлсвөл хооллосон, өвдвөл шөнийг нойргүй өнгөрүүлсэн. Одоо энэ мэдрэмжийг бусад амьтанд тарааж бод: 'Тэд бүгд ийм энэрлийг надад үзүүлсэн.' Зүрх дулаарна — энэ дулааныг мэдэр." },
      { title: "Хайр — Майтри", text: "'Бүх амьтан аз жаргалтай байх болтугай, аз жаргалын шалтгантай байх болтугай' гэж хэл. Ойрын хүнээс эхэл → хөрш → тааламжгүй хүн → бүх амьтан. Хайр гэдэг нь сэтгэл хөдлөл биш — аз жаргалыг хүсэх тогтвортой хүсэл. Тодорхой нэг хүнд аз жаргалыг бодитоор хүсэж мэдэрч бай." },
      { title: "Өрөвдөл — Каруна", text: "'Бүх амьтан зовлонгоос ангижрах болтугай, зовлонгийн шалтгааныг таслах болтугай' гэж хэл. Зовж байгаа хүнийг бод. Тэдний зовлонг бодит мэдэр — дарамт, гашуудал, айдас. Өрөвдөл гэдэг нь харамсал биш — зовлонг арилгахыг хүсэх хүч. 'Тэдний зовлон намайг хүрэх болтугай' гэж мэдэр." },
      { title: "Бодичитта — Гэгээрлийн сэтгэл", text: "'Бүх амьтныг аврахын тулд би Буддын чанарт хүрнэ' гэж шийдвэр гарга. Энэ нь амлалт, зорилго, хүсэл гурвыг нэгтгэнэ. Зүрхийн гүнээс хэл — оюуны биш. Хэдэн минут энэ шийдвэртэй байж бай. Энэ агшинд Бодисатвагийн замд алхам тавьж байна." },
    ],
    obstacles: [
      { name: "Хуурамч мэт санагдах", fix: "Эхэндээ дүрслэл хиймэл мэт санагдана — энэ хэвийн. Давтамжаар бодит болж хөгждөг." },
      { name: "Тодорхой хүнд уурлаж байгаа", fix: "Тэр хүн ч зовлонтой, тэр ч аз жаргалыг хүсдэг — энэ нэг нийтлэгийг олж мэдэр." },
      { name: "Бодичитта оюуны биш болгох", fix: "Зүрхний мэдрэмж рүү анхаарлаа чиглүүл. Дулаан, нээлттэй мэдрэмж гарвал — тэр л бодичитта." },
    ],
    benefits: ["Зүрх нээгддэг, хайрлах чадвар нэмэгдэнэ", "Уур хилэн суурь дээрээс буурна", "Аз жаргалын гүн мэдрэмж бий болно", "Бусадтай харилцаа гүнзгийрнэ", "Буддын замын дээд суурь тавигдана"],
    tip: "Бодичитта бол хамгийн хурдан гэгээрлийн зам — Буддууд ийнхүү гэгээрсэн.",
    quote: "Бусдын аз жаргалыг хүсэх мөчид бид аз жаргалтай болдог. — Шантидэва",
  },
  {
    id: "lojong", title: "Лоджонг — Сэтгэлийн сургуулилт", subtitle: "57 оюун ухааны зарчим", icon: "⚡", duration: 15, level: "Дунд шат",
    intro: "Лоджонг (བློ་སྦྱོང་) нь 'сэтгэлийг сургах' гэсэн утгатай. Атишагаас уламжлагдсан 57 зарчим нь өдөр тутмын амьдралын саад бэрхшээлийг практик болгон хувиргадаг. Гэшэ Чэкава XII зуунд нэгтгэсэн энэ систем нь Гэлүгбын хамгийн практик, хамгийн амьдралд ойр сургаалуудын нэг.",
    steps: [
      { title: "Суурь зарчим: Хоёр зүйлийг сургуулилт болго", text: "Лоджонгийн суурь: аливаа сайн, муу нөхцөл байдлыг практик болго. 'Бүх юмыг ганцхүү биет ухамсрын мөрөөдөл гэж үз' — энэ нь хоосон чанарын практик ажиллагааны хэлбэр. Өглөөний бясалгалаар: 'Өнөөдөр тохиолдох бүх зүйлийг практик болгоно' гэж шийдэж эхэл." },
      { title: "Саад бэрхшээлийг практик болго", text: "Хэн нэгэн чамайг шүүмжилбэл: 'Энэ бол карма угтах боломж' гэж бод. Өвчлөвөл: 'Бусад өвчтэй хүмүүсийн зовлонг авна' гэж бод. Алдаа гаргавал: 'Энэ нь сурах боломж' гэж бод. Дургүйцэл төрвөл: 'Тэвчээрийн практик эхэллээ' гэж бод. Энэ нь өдөр тутам хийж болох практик." },
      { title: "Гурван объектыг ажигла", text: "Найздаа: хавсрал гардаг — ажигла. Дайсандаа: дургүйцэл гардаг — ажигла. Харь хүнд: хайхрамжгүй байдал гардаг — ажигла. Эдгээр гурав бол сансарын гол хүч. Тэдгээрийг мэдэрч байх нь аль хэдийн практик. Ажиглах нь дарах биш — зүгээр л мэдэх." },
      { title: "Зан үйлийн дасгал", text: "Лоджонгийн практик зан үйлүүд:\n• Хоол идэхдээ: 'Энэ хоолыг бүх амьтанд зориулна' гэж бод\n• Унтахаасаа өмнө: 'Нойрон дотроо бүх амьтанд тусалъя' гэж бод\n• Машин унаанд: 'Энэ зорчилтыг бүх амьтанд зориулна' гэж бод\n• Хөдөлмөрлөхдөө: 'Энэ ажлыг бүх амьтны төлөө хийнэ' гэж бод" },
      { title: "Чухал зарчмууд дээр бясалга", text: "Доорх зарчмуудаас нэгийг сонгоод гүн бясалга:\n• 'Бусдад хоногшсон буруутгалыг нэг эхийн элэгний дуу мэт сонс'\n• 'Хамгийн их хайрлах хүнийг мунхаглалын эрхшээлд байгаа гэж бод'\n• 'Бүх алдаа буруугаа нэг буруутгалд оруул'\n• 'Сайн нөхцөл байдлыг буянд зориул, муу нөхцөлийг практикт ашигла'" },
      { title: "Орой дүгнэх", text: "Оройн бясалгалд:\n'Өнөөдөр ямар саад бэрхшээл тохиолдов?\nТэднийг практик болгож чадсан уу?\nИрээдүйд яаж ашиглах вэ?'\nЛоджонг бол бясалгалын дэр дээр биш — амьдралын практик. Өдөр тутмын амьдрал бол хамгийн сайн практикийн газар." },
    ],
    obstacles: [
      { name: "Оюуны мэдлэг болоод үлдэх", fix: "Тодорхой нэг нөхцөлд хэрэглэ. 'Маш хэцүү нөхцөлд юу хийх вэ?' гэж урьдчилан бэлд." },
      { name: "Хэт ачааллах", fix: "Нэг зарчмаас эхэл. Жишээ нь: 7 хоногийн турш зөвхөн 'бүх буруугаа өөртөө ав' зарчмыг дага." },
      { name: "Хуурамч шинж чанар авах", fix: "Лоджонг бол дүр эсгэх биш — бодит дотоод хөдлөл. Хэрэв хиймэл санагдвал буцаж амьсгааны бясалгалд ор." },
    ],
    benefits: ["Стресс, дарамтыг практик болгоно", "Уян хатан байдал нэмэгдэнэ", "Амьдралын бүх нөхцөл практик болно", "Уур хилэн хурдан буурна", "Өдөр тутмын аз жаргал нэмэгдэнэ"],
    tip: "Лоджонг бол бясалгалын дэр дээр биш — амьдралын практик.",
    quote: "Хамгийн хүнд нөхцөл байдал бол хамгийн сайн багш.",
  },
];

function Mandala() {
  return (
    <svg style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"700px", height:"700px", opacity:0.045, pointerEvents:"none", zIndex:0 }} viewBox="0 0 800 800">
      {[1,2,3,4,5,6,7,8].map(i=><g key={i} transform={`rotate(${i*45} 400 400)`}><ellipse cx="400" cy="200" rx="18" ry="55" fill={C.gold}/></g>)}
      {[70,130,190,250,310].map((r,i)=><circle key={i} cx="400" cy="400" r={r} fill="none" stroke={C.gold} strokeWidth="0.5"/>)}
      {[0,45,90,135].map((a,i)=><line key={i} x1="400" y1="90" x2="400" y2="710" stroke={C.gold} strokeWidth="0.3" transform={`rotate(${a} 400 400)`}/>)}
      <circle cx="400" cy="400" r="14" fill={C.gold}/><circle cx="400" cy="400" r="7" fill={C.bg}/>
    </svg>
  );
}

function NavBar({ active, set }) {
  return (
    <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:`linear-gradient(to top,${C.bg},${C.surface}dd)`, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"8px 0 14px", zIndex:100, backdropFilter:"blur(12px)", maxWidth:"430px", margin:"0 auto" }}>
      {NAV.map(n=>(
        <button key={n.id} onClick={()=>set(n.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", padding:"4px 8px", opacity: active===n.id?1:0.4, transition:"opacity 0.2s" }}>
          <span style={{ fontSize:"20px", filter: active===n.id?`drop-shadow(0 0 6px ${C.gold})`:"none", transition:"filter 0.3s" }}>{n.icon}</span>
          <span style={{ fontSize:"9px", color: active===n.id?C.gold:C.textM, fontFamily:"Georgia,serif", letterSpacing:"0.3px" }}>{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Intro() {
  const [open, setOpen] = useState(null);
  const items = [
    { icon:"🕌", title:"Үүсэл", body:"Жэ Цонкапа (1357–1419) Амдо нутгад төрж, бүх томоохон урсгалуудыг судалсан. 1409 онд Галдан хийдийг үүсгэн Гэлүгба урсгалыг тавьсан." },
    { icon:"📿", title:"Гурван суурь", body:"Сахилга (Виная), Бясалгал (Самадхи), Мэргэн ухаан (Праджня) — эдгээр гурав нэгдмэл замыг бүрдүүлнэ." },
    { icon:"🎓", title:"Монголд", body:"XVI зуунд Алтан хаан Далай лам III-тай уулзаж тархсан. Занабазар I Богд хутагт болсон. 700+ хийд байснаас 1937 оны хэлмэгдүүлэлтэд ихэнх устгагдсан." },
    { icon:"☸", title:"Өнөөдөр", body:"Төвд, Монгол, Бурят, Халимаг, Ладак болон дэлхийн олон улсад тархсан хамгийн том Буддын урсгал. Далай лам XIV дэлхийд тараасаар байна." },
  ];
  return (
    <div style={{ padding:"20px 16px 100px" }}>
      <div style={{ textAlign:"center", marginBottom:"28px" }}>
        <div style={{ fontSize:"60px", filter:`drop-shadow(0 0 16px ${C.gold}50)`, animation:"pulse 3s ease-in-out infinite" }}>☸</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"26px", color:C.gold, margin:"8px 0 4px", letterSpacing:"2px" }}>གེལུགས་པ</h1>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"17px", color:C.text, margin:"0 0 4px" }}>Гэлүгба</p>
        <p style={{ fontSize:"12px", color:C.textD, margin:0 }}>Шарын шашин • Цонкапагийн уламжлал</p>
      </div>
      <div style={{ background:`linear-gradient(135deg,${C.goldD}28,${C.gold}0c)`, border:`1px solid ${C.goldD}50`, borderRadius:"16px", padding:"16px", marginBottom:"18px" }}>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"14px", color:C.goldL, textAlign:"center", margin:0, lineHeight:1.9, fontStyle:"italic" }}>
          "Сансараас зугтах зориг,<br/>Бодичитта, Хоосон чанарын үзэл —<br/>Эдгээр гурвыг ойлгоогүй бол<br/>тантр хийх ч утгагүй"
        </p>
        <p style={{ fontSize:"11px", color:C.textD, textAlign:"right", margin:"8px 0 0" }}>— Жэ Цонкапа</p>
      </div>
      {items.map((it,i)=>(
        <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{ background:C.card, border:`1px solid ${open===i?C.goldD:C.border}`, borderRadius:"12px", padding:"14px 16px", marginBottom:"10px", cursor:"pointer", transition:"border-color 0.2s" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <span style={{ fontSize:"21px" }}>{it.icon}</span>
            <span style={{ fontFamily:"Georgia,serif", fontSize:"14px", color:C.text, flex:1 }}>{it.title}</span>
            <span style={{ color:C.textM, fontSize:"12px", transform:open===i?"rotate(180deg)":"none", transition:"transform 0.2s", display:"inline-block" }}>▾</span>
          </div>
          {open===i && <p style={{ fontSize:"13px", color:C.textD, margin:"10px 0 0", lineHeight:1.7, paddingLeft:"33px" }}>{it.body}</p>}
        </div>
      ))}
    </div>
  );
}

function Teach() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(null);
  return (
    <div style={{ padding:"20px 16px 100px" }}>
      <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", color:C.gold, margin:"0 0 4px" }}>Сургаал номлол</h2>
      <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 18px" }}>Ламрим • Шуньята • Парамита</p>
      <div style={{ display:"flex", gap:"8px", marginBottom:"18px", overflowX:"auto", paddingBottom:"4px" }}>
        {TEACHINGS.map((t,i)=>(
          <button key={i} onClick={()=>{setTab(i);setOpen(null);}} style={{ background:tab===i?`${C.gold}18`:C.card, border:`1px solid ${tab===i?C.gold:C.border}`, borderRadius:"20px", padding:"7px 14px", cursor:"pointer", whiteSpace:"nowrap", color:tab===i?C.gold:C.textD, fontSize:"12px", transition:"all 0.2s" }}>
            {t.icon} {t.title.split(" — ")[0]}
          </button>
        ))}
      </div>
      <h3 style={{ fontFamily:"Georgia,serif", fontSize:"16px", color:C.goldL, margin:"0 0 14px" }}>{TEACHINGS[tab].icon} {TEACHINGS[tab].title}</h3>
      {TEACHINGS[tab].items.map((it,i)=>(
        <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{ background:C.card, border:`1px solid ${open===i?it.color+"70":C.border}`, borderRadius:"12px", padding:"13px 15px", marginBottom:"10px", cursor:"pointer", transition:"border-color 0.2s" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:it.color, flexShrink:0, boxShadow:open===i?`0 0 8px ${it.color}`:"none", transition:"box-shadow 0.2s" }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"14px", color:C.text, marginBottom:"2px" }}>{it.name}</div>
              <div style={{ fontSize:"11px", color:C.textD }}>{it.desc}</div>
            </div>
            <span style={{ color:C.textM, fontSize:"12px", transform:open===i?"rotate(180deg)":"none", transition:"transform 0.2s", display:"inline-block" }}>▾</span>
          </div>
          {open===i && <div style={{ marginTop:"11px", paddingTop:"11px", borderTop:`1px solid ${C.border}`, fontSize:"13px", color:C.textD, lineHeight:1.7, paddingLeft:"19px" }}>{it.detail}</div>}
        </div>
      ))}
      <div style={{ background:`${C.gold}0e`, border:`1px solid ${C.goldD}35`, borderRadius:"12px", padding:"13px", marginTop:"8px" }}>
        <p style={{ fontSize:"12px", color:C.textD, margin:0, lineHeight:1.7 }}>
          💡 <strong style={{ color:C.gold }}>Долоон нүдний шалтгаан:</strong> Бүх амьтан өмнөх дүрэндээ миний эх байсан → эхийн энэрлийг санах → талархах → хайр → өрөвдөл → зориг → Бодичитта
        </p>
      </div>
    </div>
  );
}

function Meditate() {
  const [sel, setSel] = useState(null);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState("steps");
  const p = sel!==null?PRACTICES[sel]:null;

  if (p) return (
    <div style={{ padding:"20px 16px 100px" }}>
      <button onClick={()=>{setSel(null);setStep(0);setTab("steps");}} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"8px", padding:"6px 12px", color:C.textD, cursor:"pointer", fontSize:"13px", marginBottom:"18px" }}>← Буцах</button>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"18px" }}>
        <div style={{ fontSize:"44px", marginBottom:"8px" }}>{p.icon}</div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"19px", color:C.gold, margin:"0 0 3px" }}>{p.title}</h2>
        <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 8px" }}>{p.subtitle}</p>
        <div style={{ display:"flex", gap:"6px", justifyContent:"center" }}>
          <span style={{ fontSize:"11px", color:C.textD, background:C.card, padding:"3px 10px", borderRadius:"20px", border:`1px solid ${C.border}` }}>⏱ {p.duration} мин</span>
          <span style={{ fontSize:"11px", color:C.amber, background:`${C.amber}15`, padding:"3px 10px", borderRadius:"20px", border:`1px solid ${C.amber}40` }}>{p.level}</span>
        </div>
      </div>

      {/* Intro quote */}
      <div style={{ background:`linear-gradient(135deg,${C.goldD}20,${C.gold}08)`, border:`1px solid ${C.goldD}40`, borderRadius:"12px", padding:"13px 15px", marginBottom:"16px" }}>
        <p style={{ fontSize:"12px", color:C.textD, margin:0, lineHeight:1.75, fontStyle:"italic" }}>{p.intro}</p>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:"6px", marginBottom:"16px", borderBottom:`1px solid ${C.border}`, paddingBottom:"10px" }}>
        {[{k:"steps",l:"📋 Алхам"},{ k:"obstacles",l:"🌊 Саад"},{ k:"benefits",l:"✨ Ач тус"}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{ background:tab===t.k?`${C.gold}18`:"none", border:`1px solid ${tab===t.k?C.goldD:C.border}`, borderRadius:"20px", padding:"6px 12px", cursor:"pointer", color:tab===t.k?C.gold:C.textD, fontSize:"12px", transition:"all 0.2s" }}>{t.l}</button>
        ))}
      </div>

      {/* STEPS TAB */}
      {tab==="steps" && (
        <>
          <div style={{ display:"flex", gap:"4px", marginBottom:"12px", alignItems:"center" }}>
            {p.steps.map((_,i)=>(
              <div key={i} onClick={()=>setStep(i)} style={{ flex:1, height:"3px", borderRadius:"2px", background:i<=step?C.gold:C.border, cursor:"pointer", transition:"background 0.3s" }}/>
            ))}
            <span style={{ fontSize:"10px", color:C.textM, marginLeft:"6px", whiteSpace:"nowrap" }}>{step+1}/{p.steps.length}</span>
          </div>
          <div style={{ background:`linear-gradient(135deg,${C.card},${C.surface})`, border:`1px solid ${C.goldD}35`, borderRadius:"16px", padding:"20px", marginBottom:"14px", minHeight:"140px" }}>
            <p style={{ fontSize:"12px", color:C.gold, fontFamily:"Georgia,serif", margin:"0 0 8px", letterSpacing:"0.5px" }}>{p.steps[step].title}</p>
            <p style={{ fontSize:"14px", color:C.text, lineHeight:1.85, margin:0, whiteSpace:"pre-line" }}>{p.steps[step].text}</p>
          </div>
          <div style={{ display:"flex", gap:"10px", marginBottom:"14px" }}>
            <button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0} style={{ flex:1, background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"12px", color:step===0?C.textM:C.text, cursor:step===0?"default":"pointer", fontSize:"14px" }}>← Өмнөх</button>
            <button onClick={()=>setStep(Math.min(p.steps.length-1,step+1))} disabled={step===p.steps.length-1} style={{ flex:1, background:step===p.steps.length-1?C.card:`linear-gradient(135deg,${C.goldD},${C.gold}80)`, border:`1px solid ${step===p.steps.length-1?C.border:C.gold}`, borderRadius:"10px", padding:"12px", color:step===p.steps.length-1?C.textM:C.white, cursor:step===p.steps.length-1?"default":"pointer", fontSize:"14px" }}>Дараах →</button>
          </div>
          {step===p.steps.length-1 && (
            <div style={{ background:`${C.gold}12`, border:`1px solid ${C.goldD}`, borderRadius:"12px", padding:"16px", textAlign:"center" }}>
              <p style={{ fontSize:"22px", margin:"0 0 6px" }}>🙏</p>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"13px", color:C.goldL, margin:"0 0 4px", fontStyle:"italic" }}>"{p.quote}"</p>
              <p style={{ fontSize:"11px", color:C.textD, margin:"6px 0 0" }}>Буянаа бүх амьтанд зориулна</p>
            </div>
          )}
        </>
      )}

      {/* OBSTACLES TAB */}
      {tab==="obstacles" && (
        <div>
          <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 14px", lineHeight:1.6 }}>Бясалгалын явцад тохиолдож болох саад ба тэдгээрийн шийдэл:</p>
          {p.obstacles.map((o,i)=>(
            <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"14px", marginBottom:"10px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"8px" }}>
                <span style={{ fontSize:"18px" }}>🌊</span>
                <p style={{ fontFamily:"Georgia,serif", fontSize:"14px", color:C.text, margin:0 }}>{o.name}</p>
              </div>
              <div style={{ paddingLeft:"28px" }}>
                <p style={{ fontSize:"12px", color:C.gold, margin:"0 0 3px" }}>→ Шийдэл:</p>
                <p style={{ fontSize:"12px", color:C.textD, margin:0, lineHeight:1.7 }}>{o.fix}</p>
              </div>
            </div>
          ))}
          <div style={{ background:`${C.gold}0e`, border:`1px solid ${C.goldD}30`, borderRadius:"12px", padding:"13px", marginTop:"6px" }}>
            <p style={{ fontSize:"12px", color:C.textD, margin:0, lineHeight:1.7 }}>💡 <strong style={{ color:C.gold }}>Санаарай:</strong> "{p.tip}"</p>
          </div>
        </div>
      )}

      {/* BENEFITS TAB */}
      {tab==="benefits" && (
        <div>
          <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 14px" }}>Тогтмол практикаас гарах үр дүн:</p>
          {p.benefits.map((b,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"12px 14px", marginBottom:"8px" }}>
              <span style={{ color:C.gold, fontSize:"16px" }}>✦</span>
              <p style={{ fontSize:"13px", color:C.text, margin:0, fontFamily:"Georgia,serif" }}>{b}</p>
            </div>
          ))}
          <div style={{ background:`linear-gradient(135deg,${C.goldD}18,${C.gold}08)`, border:`1px solid ${C.goldD}50`, borderRadius:"12px", padding:"15px", marginTop:"8px", textAlign:"center" }}>
            <p style={{ fontFamily:"Georgia,serif", fontSize:"13px", color:C.goldL, margin:0, fontStyle:"italic", lineHeight:1.8 }}>"{p.quote}"</p>
          </div>
        </div>
      )}
    </div>
  );

  // Practice list screen
  return (
    <div style={{ padding:"20px 16px 100px" }}>
      <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", color:C.gold, margin:"0 0 4px" }}>Бясалгалын практик</h2>
      <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 20px" }}>Практик сонгоод дэлгэрэнгүй аргачлалыг дагана уу</p>
      <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"18px" }}>
        {PRACTICES.map((p,i)=>(
          <div key={p.id} onClick={()=>setSel(i)} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:"14px", transition:"border-color 0.2s" }}>
            <div style={{ fontSize:"32px", flexShrink:0 }}>{p.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"14px", color:C.text, marginBottom:"3px" }}>{p.title}</div>
              <div style={{ fontSize:"11px", color:C.textD, marginBottom:"5px" }}>{p.subtitle}</div>
              <div style={{ display:"flex", gap:"6px" }}>
                <span style={{ fontSize:"10px", color:C.textD, background:C.surface, padding:"2px 8px", borderRadius:"20px" }}>⏱ {p.duration} мин</span>
                <span style={{ fontSize:"10px", color:C.amber, background:`${C.amber}15`, padding:"2px 8px", borderRadius:"20px" }}>{p.level}</span>
                <span style={{ fontSize:"10px", color:C.textM, background:C.surface, padding:"2px 8px", borderRadius:"20px" }}>{p.steps.length} алхам</span>
              </div>
            </div>
            <span style={{ color:C.textM, fontSize:"16px" }}>›</span>
          </div>
        ))}
      </div>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"15px" }}>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"13px", color:C.gold, margin:"0 0 10px" }}>📅 Өдөр тутмын хуваарь</p>
        {[["06:00","Амьсгааны бясалгал — 20 мин"],["06:20","Ламрим уншлага — 10 мин"],["21:00","Тончлэн — 15 мин"],["22:00","Өдрийн тунгаалга — 5 мин"]].map(([t,l],i,a)=>(
          <div key={i} style={{ display:"flex", gap:"12px", padding:"6px 0", borderBottom:i<a.length-1?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontSize:"11px", color:C.gold, fontFamily:"monospace", minWidth:"40px" }}>{t}</span>
            <span style={{ fontSize:"12px", color:C.textD }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function playBowl(vol=0.7) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    // Primary tone ~432Hz (singing bowl fundamental)
    osc.type = "sine"; osc.frequency.setValueAtTime(432, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 4);
    // Harmonic overtone
    osc2.type = "sine"; osc2.frequency.setValueAtTime(864, ctx.currentTime);
    gain2.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.start(); osc2.stop(ctx.currentTime + 3);
  } catch(e) {}
}

function Timer() {
  const [dur, setDur] = useState(10);
  const [running, setRunning] = useState(false);
  const [rem, setRem] = useState(600);
  const [done, setDone] = useState(false);
  const [sound, setSound] = useState(true);
  const ref = useRef(null);
  useEffect(()=>{
    if(running){
      ref.current = setInterval(()=>{
        setRem(r=>{ if(r<=1){ clearInterval(ref.current); setRunning(false); setDone(true); return 0; } return r-1; });
      },1000);
    }
    return ()=>clearInterval(ref.current);
  },[running]);
  useEffect(()=>{ if(done && sound) playBowl(); },[done]);
  const start=()=>{ if(sound) playBowl(0.3); setRem(dur*60); setDone(false); setRunning(true); };
  const stop=()=>{ clearInterval(ref.current); setRunning(false); if(sound) playBowl(0.4); };
  const reset=()=>{ clearInterval(ref.current); setRunning(false); setDone(false); setRem(dur*60); };
  const mins=Math.floor(rem/60), secs=rem%60;
  const total=dur*60, prog=(running||done)?(total-rem)/total:0;
  const circ=2*Math.PI*108;
  return (
    <div style={{ padding:"20px 16px 100px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"4px" }}>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", color:C.gold, margin:0 }}>Бясалгалын таймер</h2>
        <button onClick={()=>setSound(s=>!s)} style={{ background:sound?`${C.gold}18`:C.card, border:`1px solid ${sound?C.goldD:C.border}`, borderRadius:"20px", padding:"6px 12px", cursor:"pointer", fontSize:"13px", color:sound?C.gold:C.textM, transition:"all 0.2s" }}>
          {sound?"🔔 Дуу":"🔕 Дуугүй"}
        </button>
      </div>
      <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 28px" }}>Цагаа тохируулаад бясалгалаа эхэл</p>
      <div style={{ textAlign:"center", marginBottom:"28px" }}>
        <svg width="256" height="256" style={{ overflow:"visible" }}>
          <circle cx="128" cy="128" r="108" fill="none" stroke={C.border} strokeWidth="4"/>
          <circle cx="128" cy="128" r="108" fill="none" stroke={done?C.goldL:C.gold} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={circ*(1-prog)} strokeLinecap="round" transform="rotate(-90 128 128)" style={{ transition:"stroke-dashoffset 1s linear", filter:`drop-shadow(0 0 8px ${C.gold}55)` }}/>
          <circle cx="128" cy="128" r="93" fill={C.card}/>
          {done?(
            <>
              <text x="128" y="115" textAnchor="middle" fill={C.goldL} fontSize="34" fontFamily="Georgia,serif">🙏</text>
              <text x="128" y="145" textAnchor="middle" fill={C.gold} fontSize="14" fontFamily="Georgia,serif">Дууссан</text>
              <text x="128" y="162" textAnchor="middle" fill={C.textD} fontSize="11">Буянаа зориул</text>
            </>
          ):(
            <>
              <text x="128" y="118" textAnchor="middle" fill={C.text} fontSize="40" fontFamily="Georgia,serif" fontWeight="300">{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</text>
              <text x="128" y="145" textAnchor="middle" fill={C.textD} fontSize="12">{running?"бясалгаж байна...":"бэлэн"}</text>
            </>
          )}
        </svg>
      </div>
      <div style={{ marginBottom:"22px" }}>
        <p style={{ fontSize:"12px", color:C.textD, margin:"0 0 10px", textAlign:"center" }}>Хугацаа сонгох</p>
        <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
          {[5,10,15,20,30,45].map(d=>(
            <button key={d} onClick={()=>{setDur(d);setRem(d*60);setDone(false);setRunning(false);}} style={{ background:dur===d?`${C.gold}20`:C.card, border:`1px solid ${dur===d?C.gold:C.border}`, borderRadius:"20px", padding:"7px 15px", color:dur===d?C.gold:C.textD, cursor:"pointer", fontSize:"13px", transition:"all 0.2s" }}>{d} мин</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
        {!running?(
          <button onClick={start} style={{ background:`linear-gradient(135deg,${C.goldD},${C.gold})`, border:"none", borderRadius:"12px", padding:"14px 44px", color:C.white, cursor:"pointer", fontSize:"16px", fontFamily:"Georgia,serif", boxShadow:`0 4px 20px ${C.gold}38` }}>{done?"Дахин эхлэх":"Эхлэх"}</button>
        ):(
          <>
            <button onClick={stop} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"14px 28px", color:C.text, cursor:"pointer", fontSize:"14px" }}>Зогсоох</button>
            <button onClick={reset} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"14px 28px", color:C.textD, cursor:"pointer", fontSize:"14px" }}>Шинэчлэх</button>
          </>
        )}
      </div>
    </div>
  );
}

function Journal() {
  const [entries, setEntries] = useState(()=>{ try{ return JSON.parse(localStorage.getItem("mgj")||"[]"); }catch{ return []; } });
  const [form, setForm] = useState({ practice:"", duration:"", insight:"", obstacle:"" });
  const [adding, setAdding] = useState(false);
  const save=()=>{
    if(!form.practice&&!form.insight) return;
    const e={ ...form, date:new Date().toLocaleDateString("mn-MN"), id:Date.now() };
    const u=[e,...entries]; setEntries(u);
    try{ localStorage.setItem("mgj",JSON.stringify(u)); }catch{}
    setForm({ practice:"", duration:"", insight:"", obstacle:"" }); setAdding(false);
  };
  const del=(id)=>{ const u=entries.filter(e=>e.id!==id); setEntries(u); try{ localStorage.setItem("mgj",JSON.stringify(u)); }catch{}; };
  return (
    <div style={{ padding:"20px 16px 100px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
        <div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", color:C.gold, margin:"0 0 3px" }}>Тэмдэглэл</h2>
          <p style={{ fontSize:"12px", color:C.textD, margin:0 }}>{entries.length} тэмдэглэл</p>
        </div>
        <button onClick={()=>setAdding(!adding)} style={{ background:adding?C.card:`${C.gold}18`, border:`1px solid ${adding?C.border:C.gold}`, borderRadius:"20px", padding:"8px 16px", color:adding?C.textD:C.gold, cursor:"pointer", fontSize:"13px" }}>{adding?"× Болих":"+ Нэмэх"}</button>
      </div>
      {adding&&(
        <div style={{ background:C.card, border:`1px solid ${C.goldD}55`, borderRadius:"16px", padding:"18px", marginBottom:"18px" }}>
          <p style={{ fontFamily:"Georgia,serif", fontSize:"14px", color:C.gold, margin:"0 0 13px" }}>Өнөөдрийн тэмдэглэл</p>
          {[{k:"practice",l:"Практик",p:"Амьсгааны бясалгал..."},{k:"duration",l:"Хугацаа (мин)",p:"15"},{k:"insight",l:"Ойлголт",p:"Өнөөдөр юу мэдэрсэн бэ..."},{k:"obstacle",l:"Саад",p:"Юу хэцүү байсан бэ..."}].map(f=>(
            <div key={f.k} style={{ marginBottom:"11px" }}>
              <label style={{ display:"block", fontSize:"11px", color:C.textD, marginBottom:"4px" }}>{f.l}</label>
              <textarea value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} placeholder={f.p} rows={f.k==="insight"||f.k==="obstacle"?2:1} style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:"8px", padding:"8px 10px", color:C.text, fontSize:"13px", resize:"none", boxSizing:"border-box", fontFamily:"inherit", lineHeight:1.5 }}/>
            </div>
          ))}
          <button onClick={save} style={{ width:"100%", background:`linear-gradient(135deg,${C.goldD},${C.gold}80)`, border:`1px solid ${C.gold}`, borderRadius:"10px", padding:"12px", color:C.white, cursor:"pointer", fontSize:"14px", fontFamily:"Georgia,serif" }}>Хадгалах 🙏</button>
        </div>
      )}
      {entries.length===0&&!adding&&(
        <div style={{ textAlign:"center", padding:"50px 0" }}>
          <p style={{ fontSize:"40px", margin:"0 0 12px" }}>📝</p>
          <p style={{ fontSize:"14px", color:C.textD, fontFamily:"Georgia,serif", margin:"0 0 6px" }}>Тэмдэглэл байхгүй байна</p>
          <p style={{ fontSize:"12px", color:C.textM }}>+ Нэмэх дарж эхлэн бичнэ үү</p>
        </div>
      )}
      {entries.map(e=>(
        <div key={e.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"14px 15px", marginBottom:"10px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px" }}>
            <span style={{ fontSize:"11px", color:C.gold }}>{e.date}</span>
            <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
              {e.duration&&<span style={{ fontSize:"11px", color:C.textD }}>⏱ {e.duration} мин</span>}
              <button onClick={()=>del(e.id)} style={{ background:"none", border:"none", color:C.textM, cursor:"pointer", fontSize:"14px", lineHeight:1, padding:0 }}>×</button>
            </div>
          </div>
          {e.practice&&<p style={{ fontSize:"13px", color:C.text, margin:"0 0 4px", fontFamily:"Georgia,serif" }}>🪷 {e.practice}</p>}
          {e.insight&&<p style={{ fontSize:"12px", color:C.textD, margin:"0 0 4px", lineHeight:1.6 }}>💡 {e.insight}</p>}
          {e.obstacle&&<p style={{ fontSize:"12px", color:C.textM, margin:0, lineHeight:1.6 }}>🌊 {e.obstacle}</p>}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("intro");
  const pages = { intro:<Intro/>, teach:<Teach/>, meditate:<Meditate/>, timer:<Timer/>, journal:<Journal/> };
  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif", position:"relative", maxWidth:"430px", margin:"0 auto" }}>
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}textarea:focus,button:focus{outline:none}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#3a3a50;border-radius:2px}@keyframes pulse{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}`}</style>
      <Mandala/>
      <div style={{ position:"relative", zIndex:1 }}>{pages[page]}</div>
      <NavBar active={page} set={setPage}/>
    </div>
  );
}
