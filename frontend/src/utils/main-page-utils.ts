import { Ayurveda, Yoga, VerifiedTraining, Peers, ExpertsInField, Test1, Test2, Test3, Test4 } from '../assets/img/index';
import { Links, MetaTag } from '../interfaces/main-menu';
import { ICourselList, IPractitioner, ITestimonialList } from '../interfaces/main-page';

export const CourselList: { en: ICourselList[], fr: ICourselList[] } = {
    en: [
        {
            id: 1,
            TopText: 'COMMITTED TO HEALTH',
            HeadingText: 'Alternative Medicine',
            Content: `Alternative medicine or traditional medicine is used in all regions of the world, and up to 80% of the
                  population in some countries in Africa, Asia, and Latin America use traditional medicine as their primary form
                  of healthcare.[...]`,
            subContent: `88% of all countries are estimated to use traditional medicine, such as herbal medicines, acupuncture, yoga,
        indigenous therapies and others.”  - World Health Organization.`,
            link: '/alternative-medicine',
            ImageList: [Ayurveda, Yoga]
        },
        {
            id: 2,
            TopText: 'COMMITTED TO HEALTH',
            HeadingText: 'SDG',
            Content: `VHealTHY strives to contribute to the achievements of the Sustainable Development Goals set forth
                  by the United Nations in the Agenda 2030. More particularly, VHealTHY plays an active role
                  in the following.`,
            link: '/sdg-media',
            list: ['SDG 3 and 10', 'SDG 8 and 9', 'SDG 5, 16 and 17'],
            ImageList: [Ayurveda, Yoga]
        },
        {
            id: 3,
            TopText: 'COMMITTED TO HEALTH',
            HeadingText: 'Healthy Lifestyle',
            Content: `Healthier together: `,
            subContent: `A healthy spirit in a healthy body. <br />
                Mens sana in corporare sano. <br />
                How VHealTHY enables reconnecting with our roots through holistic wellness?`,
            link: '/lifestyle-product',
            ImageList: [Ayurveda, Yoga]
        }
    ],
    fr: [
        {
            id: 1,
            TopText: 'Vhealthy, engagé pour la santé holistique',
            HeadingText: 'Médecine Alternative, intégrative, complémentaire',
            Content: `La médecine traditionnelle ou alternative est utilisée dans toutes les régions du monde, et environ 80% de la population dans certains pays d'Afrique, d'Asie et d'Amérique latine recourent à la médecine traditionnelle comme principal moyen de soins de santé [...]`,
            subContent: `On estime que 88% des pays utilisent la médecine traditionnelle, tels que les médicaments à base de plantes, l'acupuncture, le yoga, les thérapies indigènes et autres." - Organisation mondiale de la santé.`,
            link: '/alternative-medicine',
            ImageList: [Ayurveda, Yoga]
        },
        {
            id: 2,
            TopText: 'Vhealthy, engagé pour la santé holistique',
            HeadingText: 'ODDs de l’Agenda 2030',
            Content: `Vhealthy s'efforce de contribuer à la réalisation des Objectifs de Développement Durable énoncés dans l'Agenda 2030 des Nations Unies. Plus particulièrement, Vhealthy joue un rôle actif dans les domaines suivants.`,
            link: '/sdg-media',
            list: ['ODD 3 et 10', 'ODD 8 et 9', 'ODD 5, 16 et 17.'],
            ImageList: [Ayurveda, Yoga]
        },
        {
            id: 3,
            TopText: 'Vhealthy, engagé pour la santé holistique',
            HeadingText: 'Mode de vies sains',
            Content: `Ensemble pour une meilleure santé : Un esprit sain dans un corps sain Mens sana in corporare sano <br /> Comment Vhealthy nous permet de renouer avec nos racines grâce au bien-être holistique et à la digitalisation?`,
            link: '/lifestyle-product',
            ImageList: [Ayurveda, Yoga]
        }
    ]
}


export const PractitionerList: { en: IPractitioner[], fr: IPractitioner[] } = {
    en: [
        {
            id: 1,
            image: VerifiedTraining,
            title: 'Verified training and experience',
            heading: `Vhealthy ensures excellence in wellbeing with certified experts.`,
            text: ` All qualifications are rigorously verified, guaranteeing authenticity and reliability of each professional.`
        },
        {
            id: 2,
            image: ExpertsInField,
            title: 'Experts in the Field',
            heading: `Vhealthy supports its caregivers.`,
            text: ` The platform hosts numerous training of trainer sessions, supports and showcases work of the experts enabling online promotion and accessibility.`
        },
        {
            id: 3,
            image: Peers,
            title: 'Recommended by Peers',
            heading: `Vhealthy cares about achieving well being for all.`,
            text: ` Vhealthy's mission,"Healthier together with holistic wellness” and “Achieving wellbeing for all” reflects our commitment to holistic health and wellbeing.`
        }
    ],
    fr: [
        {
            id: 1,
            image: VerifiedTraining,
            title: 'Formations et expériences vérifiées des experts',
            heading: `Vhealthy s'engage à fournir une excellence en matière de bien-être grâce à des experts certifiés.`,
            text: ` Toutes les qualifications et compétences ont été soigneusement vérifiées pour confirmer l'authenticité et la fiabilité de chaque professionnel.`
        },
        {
            id: 2,
            image: ExpertsInField,
            title: 'Experts dans le domaine du bien-être',
            heading: `Vhealthy soutient ses intervenants.`,
            text: ` La plateforme propose de nombreuses sessions de formation pour les formateurs, soutient et met en valeur le travail des experts en permettant une promotion en ligne et une accessibilité.`
        },
        {
            id: 3,
            image: Peers,
            title: 'Recommandé par divers groupes',
            heading: `Vhealthy se soucie d'atteindre le bien-être pour tous.`,
            text: ` La mission de Vhealthy, "Ensemble vers un bien-être holistique" et "Atteindre le bien-être pour tous", reflète notre engagement envers la santé holistique et le bien-être.`
        }
    ]
}


export const TestimonialList: ITestimonialList[] = [
    {
        id: 1,
        Heading: 'Ms Ania Smati',
        age: '30 years old',
        country: `France`,
        profession: `Jurist`,
        Content: `Thank you Vhealthy for introduced me to Traditional Chinese Medicine (TCM! ) I used TCM for my intestin ; TCM is an ancient system that views health as a balance of vital forces. It includes practices like acupuncture, herbal medicine, and Qi Gong, focusing on restoring harmony in the body. TCM is based on the concepts of Yin and Yang, as well as the flow of Qi energy. Many find it effective for various health issues and as a holistic approach to wellbeing. `,
        image: Test1
    },
    {
        id: 2,
        Heading: 'Mr Olivier K',
        age: '42 ans',
        country: `France`,
        profession: `Finance assistant <br />  International organization`,
        Content: ` Dès mon jeune âge, j'ai eu connaissance de la médecine traditionnelle quoique je suis d'une génération ayant grandi à l'époque moderne de ma société. J'avais une grand-mère qui connaissait les différents remèdes contre toutes sortes de maux. De telles connaissances se transmettaient de générations en générations à travers le temps. Par exemple, je me souviens que, lorsqu'on avait de la fièvre, elle s'empressait de chercher une plante qu'on appelle "UMURAVUMBA" dans ma langue maternelle. Il fallait respirer la vapeur dégagée par cette plante en ébullution. C'est donc, comme ça qu'elle nous soignait lorsqu'on était en vacances chez elle à la campagne. Dans mon pays d'origine (Burundi), une certaine opinion confond la médecine traditionnelle avec l'obscurantisme. Cette dernière se sert des méthodes occultes pour lancer des mauvais sorts aux gens ou pour les éloigner. L'association burundaise des tradi-praticiens (ATRAPRABU) essaie de dissiper tout amalgame dans ce sens. Il existe même au sein du Ministère Burundais de la Santé, un service chargé de la promotion de la médecine traditionnelle. Je pense que ce type de médecine contribue également à soigner les différentes maladies et souvent, les remèdes proposées n'ont pas d'effets secondaires comme c'est le cas pour la médecine moderne.`,
        image: Test2
    },
    {
        id: 3,
        Heading: 'Mr Saurabh Gupta',
        age: '36 years old',
        country: `India`,
        profession: `Entrepreneur and financial markets expert`,
        Content: ` Taking care of mental health is not as advertised as taking care of our physical health (gyms, diests, products related, etc.). In this age, people often get lonely, sometimes depressed as they don't focus on their mental health. Its as essential to take care of our mental health as we are supposed to with our physical health. Meditation is the most accessible and doesn't even cost money. Everyone should do it for 20 mins a day.`,
        image: Test3
    },
    {
        id: 4,
        Heading: 'Mr Adnene Lassoued ',
        age: "Président en exercice de l'instance d'accès à l'information",
        country: `Tunisie`,
        profession: `Magistrat`,
        Content: `À l 'ére de la numérisation, la santé mentale des individus est confrontée à de nombreux défis.  Pour un grand nombre de gens , le stress et l'anxiété sont une réalité quotidienne qu'ils gèrent tant bien que mal et ceci est causé en grande partie par l'utilisation excessive des réseaux sociaux.  Mais malgré les dommages psychologiques engendrés par ces nouvelles technologies,  ces mêmes réseaux sociaux peuvent  porter des solutions à ces problèmes.  En effet, des alternatives technologiques telles que des applications ou tout autre moyen de communication,  peuvent être mises en place afin de  porter des solutions adéquates pour une bonne prise en charge mentale de gestion de stress.  Elles peuvent aussi faire bénéficier ces individus d'une assistance médicale et d'un soutien psychologique personnalisé.  Mais surtout mener à travers ces outils technologiques des campagnes de sensibilisation d'envergure quant à l'importance de se préserver contre la dépendance aux réseaux sociaux et de privilégier une vie équilibrée ôu les activités seront diversifiées pour mettre fin au mieux à cette dépendance.`,
        image: Test4
    }
];

export const FooterLinksTherapy: Links[] = [
    { id: 1, translateKey: "footer-keys.traditional-medicine", link: `/our-experts/traditional-medicine` },
    { id: 2, translateKey: "footer-keys.personal-development", link: `/our-experts/personal-development` },
    { id: 3, translateKey: "footer-keys.coaching", link: `/our-experts/coaching` },
    { id: 4, translateKey: "footer-keys.nutritionist", link: `/our-experts/nutritionist` },
    { id: 5, translateKey: "footer-keys.hypnotherapy", link: `/our-experts/hypnotherapy` },
    { id: 6, translateKey: "footer-keys.adhd", link: `/our-experts/adhd` },
    { id: 7, translateKey: "footer-keys.holistic-healing", link: `/our-experts/holistic-healing` },
];

export const FooterLinksSpeciality: Links[] = [
    { id: 1, translateKey: "footer-keys.naturopathy", link: `/our-experts/naturopathy` },
    { id: 2, translateKey: "footer-keys.therapy", link: `/our-experts/therapy` },
    { id: 3, translateKey: "footer-keys.life-coach", link: `/our-experts/life-coach` },
    { id: 4, translateKey: "footer-keys.nlp", link: `/our-experts/nlp` },
    { id: 5, translateKey: "footer-keys.ayurveda", link: `/our-experts/ayurveda` },
    { id: 6, translateKey: "footer-keys.behavioral-therapy", link: `/our-experts/behavioral-therapy` },
    { id: 7, translateKey: "footer-keys.chinese-medicine", link: `/our-experts/chinese-medicine` },
];

export const Objectives: Links[] = [
    { id: 1, translateKey: "footer-keys.nutrition-guidance", link: `/our-experts/nutrition-guidance` },
    { id: 2, translateKey: "footer-keys.fight-anxiety", link: `/our-experts/fight-anxiety` },
    { id: 3, translateKey: "footer-keys.self-exploration", link: `/our-experts/self-exploration` },
    { id: 4, translateKey: "footer-keys.emotional-balance", link: `/our-experts/emotional-balance` },
    { id: 5, translateKey: "footer-keys.personal-development", link: `/our-experts/personal-development` },
    { id: 6, translateKey: "footer-keys.increase-self-confidence", link: `/our-experts/increase-self-confidence` },
    { id: 7, translateKey: "footer-keys.addressing-unhealthy-habits", link: `/our-experts/addressing-unhealthy-habits` },
];

export const Blogs: Links[] = [
    { id: 1, outsideURL: true, link: `${process.env.PUBLIC_URL}/documents/WHO Traditional Med. Report.pdf` },
    { id: 2, outsideURL: true, link: `${process.env.PUBLIC_URL}/documents/WHO Ayurveda.pdf` },
    { id: 3, outsideURL: true, link: `${process.env.PUBLIC_URL}/documents/Bridging Ayurveda.pdf` },
    { id: 4, outsideURL: true, link: `${process.env.PUBLIC_URL}/documents/Traditional Approaches to Mental Wellness Harnessi.pdf` },
]

export const Metatags: MetaTag[] = [
    {
        link: "*",
        title: "vHealthy",
        description: "Discover a healthier you: VhealTHY's online wellbeing Consultation.",
    },
    {
        link: "/",
        title: "Global Experts in Traditional Medicine & Mental Health at your fingertips",
        description: "Discover a healthier you: VhealTHY's online wellbeing Consultation.",
    },
    {
        link: "/our-experts",
        title: "Our Experts - Find Best Practitioners in Holistic Health",
        description: "Discover our team of experts in traditional medicine. Learn about their knowledge and practices to find the perfect match for your holistic health needs.",
    },
    {
        link: "/about-us",
        title: "What makes Vhealthy special?",
        description: "Explore our mission and holistic wellbeing. Learn about experts and traditional medicine for optimal health",
    },
    {
        link: "/alternative-medicine",
        title: "Alternative & Traditional Medicine - Healing Through Ancient Wisdom",
        description: "Discover ancient wisdom and holistic practices for optimal health with our traditional medicine offerings. Explore natural remedies and holistic approaches",
    },
    {
        link: "/sdg-media",
        title: "SDGs & Media - Achieving the Sustainable Development Goals",
        description: "Explore Vhealthy's role in advancing the Sustainable Development Goals (SDGs) and how our platform promotes awareness, education, and healthy actions",
    },
    {
        link: "/lifestyle-product",
        title: "Lifestyle & Products - Elevate wellness naturally",
        description: "Discover healthy lifestyle and wellness products to elevate your wellbeing naturally. Explore holistic approaches and sustainable solutions",
    },
    {
        link: "/public/sign-in",
        title: "Login - Access my account",
        description: "Join our 300 pre-registered wellbeing enthusiasts for free on Vhealthy to begin your pursuit of a healthier lifestyle!",
    },
    {
        link: "/public/client/sign-in",
        title: "Login - Access my account",
        description: "Join our 300 pre-registered wellbeing enthusiasts for free on Vhealthy to begin your pursuit of a healthier lifestyleEMAIL/ Request early access. Stay tuned and stay healthy as our welbpage evolves. Happy day! ❤",
    },
    {
        link: "/public/consultant/sign-in",
        title: "Login - Access my account",
        description: "I am an expert in traditional medicine (e.g. Ayurveda) or alternative medicine. Join our 500 pre-registered wellbeing advocates for free on Vhealthy to keep promoting healthier lifestyleLog in as a consultant / Create an account. For any question, feel free to contact our team at ingrid@vhealthy.fr. Happy day! ❤",
    },
]
