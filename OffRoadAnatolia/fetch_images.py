import urllib.request
import json

vehicles = [
    "Ford Ranger Wildtrak",
    "Toyota Hilux GR Sport",
    "Volkswagen Amarok 2023",
    "Hyundai Tucson N Line",
    "Toyota Hilux Invincible",
    "Mercedes-Benz X-Class",
    "Mitsubishi L200",
    "Nissan Navara D23"
]

def get_image(query):
    # Search for files
    search_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:{query.replace(' ', '%20')} type:bitmap&srnamespace=6&format=json"
    try:
        req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            if not data['query']['search']: return None
            
            title = data['query']['search'][0]['title']
            
            # Get imageinfo
            info_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json"
            req2 = urllib.request.Request(info_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2) as resp2:
                info_data = json.loads(resp2.read())
                pages = info_data['query']['pages']
                for page_id in pages:
                    return pages[page_id]['imageinfo'][0]['url']
    except Exception as e:
        print(f"Error for {query}: {e}")
    return None

for v in vehicles:
    url = get_image(v)
    print(f"{v}: {url}")
