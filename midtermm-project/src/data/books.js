export const books = [
    {
        id: 1,
        title: "Les Misérables",
        author: "Victor Hugo",
        year: 1862,
        category: "Roman",
        status: "disponible",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Les_Mis%C3%A9rables_1st_Edition.jpg",
        summary: "Un roman historique qui suit la vie de Jean Valjean et les luttes sociales en France."
    },
    {
        id: 2,
        title: "Le Comte de Monte-Cristo",
        author: "Alexandre Dumas",
        year: 1844,
        category: "Roman",
        status: "emprunté",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Le_Comte_de_Monte-Cristo_1.jpg",
        summary: "L'histoire d'Edmond Dantès, trahi et emprisonné, qui cherche à se venger."
    },
    {
        id: 3,
        title: "Madame Bovary",
        author: "Gustave Flaubert",
        year: 1857,
        category: "Roman",
        status: "disponible",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Madame_Bovary_1857_%28hi-res%29.jpg",
        summary: "Emma Bovary, insatisfaite de sa vie de province, cherche un amour idéal."
    },
    {
        id: 4,
        title: "Germinal",
        author: "Émile Zola",
        year: 1885,
        category: "Roman",
        status: "emprunté",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Zola_-_Germinal_1ere_edition.jpg",
        summary: "Une fresque sociale sur la vie des mineurs de charbon au XIXe siècle."
    },
    {
        id: 5,
        title: "Notre-Dame de Paris",
        author: "Victor Hugo",
        year: 1831,
        category: "Roman",
        status: "disponible",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Hugo_-_Notre-Dame_de_Paris_1.jpg",
        summary: "Une histoire d'amour et de tragédie autour de la cathédrale Notre-Dame."
    },
    {
        id: 6,
        title: "English Grammar in Use",
        author: "Raymond Murphy",
        year: 1985,
        category: "Langues",
        status: "disponible",
        image: "https://images-na.ssl-images-amazon.com/images/I/51AaPjWop5L.jpg",
        summary: "Un livre de référence pour apprendre la grammaire anglaise."
    },
    {
        id: 7,
        title: "Le Bon Usage",
        author: "Maurice Grevisse",
        year: 1936,
        category: "Langues",
        status: "emprunté",
        image: "https://images-na.ssl-images-amazon.com/images/I/51-Q+2M7h3L.jpg",
        summary: "Un livre détaillé sur la grammaire et l'usage du français."
    },
    {
        id: 8,
        title: "Spanish for Dummies",
        author: "Susana Wald",
        year: 2007,
        category: "Langues",
        status: "disponible",
        image: "https://images-na.ssl-images-amazon.com/images/I/51bUuwm2csL.jpg",
        summary: "Un guide pratique pour apprendre l'espagnol facilement."
    },
    {
        id: 9,
        title: "Japanese for Busy People",
        author: "AJALT",
        year: 1995,
        category: "Langues",
        status: "emprunté",
        image: "https://images-na.ssl-images-amazon.com/images/I/51qxYoV5XhL.jpg",
        summary: "Un livre populaire pour apprendre le japonais de manière pratique."
    },
    {
        id: 10,
        title: "Deutsch perfekt",
        author: "Sprachmagazin",
        year: 2010,
        category: "Langues",
        status: "disponible",
        image: "https://images-na.ssl-images-amazon.com/images/I/51XtI9h9YDL.jpg",
        summary: "Un magazine et guide pour apprendre l'allemand."
    },
    {
        id: 11,
        title: "Introduction to the Theory of Computation",
        author: "Michael Sipser",
        year: 1996,
        category: "Computer Science",
        status: "disponible",
        image: "https://images-na.ssl-images-amazon.com/images/I/71pLxlKuCOL.jpg",
        summary: "Un livre sur la théorie des langages formels et des automates."
    },
    {
        id: 12,
        title: "Computer Networking: A Top-Down Approach",
        author: "James F. Kurose, Keith W. Ross",
        year: 2000,
        category: "Networking",
        status: "emprunté",
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKOZ4pQL.jpg",
        summary: "Une introduction moderne aux réseaux informatiques."
    },
    {
        id: 13,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell, Peter Norvig",
        year: 1995,
        category: "AI",
        status: "disponible",
        image: "https://images-na.ssl-images-amazon.com/images/I/81Gs9fwY3FL.jpg",
        summary: "Un des manuels de référence sur l'intelligence artificielle."
    },
    {
        id: 14,
        title: "Linear Algebra and Its Applications",
        author: "Gilbert Strang",
        year: 1976,
        category: "Mathematics",
        status: "emprunté",
        image: "https://images-na.ssl-images-amazon.com/images/I/81tW+5vVe2L.jpg",
        summary: "Un livre fondamental sur l'algèbre linéaire appliquée."
    },
    {
        id: 15,
        title: "Calculus",
        author: "James Stewart",
        year: 1987,
        category: "Mathematics",
        status: "disponible",
        image: "https://images-na.ssl-images-amazon.com/images/I/71mLktmJ0XL.jpg",
        summary: "Un des livres de calcul les plus utilisés en université."
    },
    {
        id: 16,
        title: "Critique de la raison pure",
        author: "Immanuel Kant",
        year: 1781,
        category: "Philosophy",
        status: "disponible",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Critique_of_Pure_Reason_%281781%29.jpg/800px-Critique_of_Pure_Reason_%281781%29.jpg",
        summary: "Un ouvrage philosophique majeur qui définit les limites de la connaissance humaine."
    },
    {
        id: 17,
        title: "Ainsi parlait Zarathoustra",
        author: "Friedrich Nietzsche",
        year: 1883,
        category: "Philosophy",
        status: "emprunté",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Ainsi_parlait_Zarathoustra.jpg",
        summary: "Un livre philosophique qui explore le concept du surhomme et la morale."
    }
];