from PIL import Image
from collections import Counter

def find_blue_color(image_path):
    img = Image.open(image_path)
    img = img.convert("RGB")
    img = img.resize((150, 150))
    
    pixels = list(img.getdata())
    
    # Filter for blue-ish pixels (Blue component significantly higher than Red and Green)
    blue_pixels = [p for p in pixels if p[2] > p[0] + 20 and p[2] > p[1] + 20]
    
    if not blue_pixels:
        return "No blue found"
        
    counts = Counter(blue_pixels)
    most_common = counts.most_common(1)[0][0]
    
    return '#{:02x}{:02x}{:02x}'.format(*most_common)

print("Blue Color:", find_blue_color("/home/ubuntu/upload/4bce32df-8214-4f92-abaa-06fbc275c4aa.jpg"))
