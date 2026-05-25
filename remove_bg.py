from PIL import Image
import sys

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Get background color from top-left pixel
    bg_color = datas[0]
    
    # Tolerance for gray
    tolerance = 30
    
    newData = []
    for item in datas:
        if (abs(item[0] - bg_color[0]) < tolerance and 
            abs(item[1] - bg_color[1]) < tolerance and 
            abs(item[2] - bg_color[2]) < tolerance):
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

remove_background("public/images/profile.png", "public/images/profile_transparent.png")
