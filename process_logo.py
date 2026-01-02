from PIL import Image
import numpy as np
from collections import Counter

def get_dominant_colors(image_path, num_colors=3):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    # Resize for faster processing
    img_small = img.resize((150, 150))
    
    # Get colors from non-transparent pixels
    pixels = list(img_small.getdata())
    valid_pixels = [p[:3] for p in pixels if p[3] > 0 and sum(p[:3]) < 750] # Filter out transparent and pure white
    
    if not valid_pixels:
        return []

    counts = Counter(valid_pixels)
    most_common = counts.most_common(num_colors)
    
    hex_colors = []
    for color, count in most_common:
        hex_colors.append('#{:02x}{:02x}{:02x}'.format(*color))
        
    return hex_colors

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Change white (also shades of whites) to transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Crop to content
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Processed image saved to {output_path}")

# Main execution
input_logo = "/home/ubuntu/upload/4bce32df-8214-4f92-abaa-06fbc275c4aa.jpg"
output_logo = "/home/ubuntu/eletro/client/public/images/logo.png"

# Analyze colors
colors = get_dominant_colors(input_logo)
print("Dominant Colors:", colors)

# Remove background
remove_background(input_logo, output_logo)
