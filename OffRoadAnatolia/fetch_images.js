const articles = [
    "Ford_Ranger",
    "Toyota_Hilux",
    "Volkswagen_Amarok",
    "Hyundai_Tucson",
    "Toyota_Hilux",
    "Mercedes-Benz_X-Class",
    "Mitsubishi_Triton",
    "Nissan_Navara"
];

async function main() {
    for (const title of articles) {
        try {
            const infoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&pithumbsize=800&format=json`;
            const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'Node.js Bot' } });
            const infoData = await infoRes.json();
            const pages = infoData.query.pages;
            const pageId = Object.keys(pages)[0];
            const imgUrl = pages[pageId].thumbnail?.source || "None";
            console.log(`${title}: ${imgUrl}`);
        } catch (e) {
            console.log(`${title}: Error - ${e.message}`);
        }
    }
}

main();
