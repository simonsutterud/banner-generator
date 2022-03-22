import sys
from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageOps, ImageStat
import uuid
import os

### DECLARE CLUBNAME
clubName = sys.argv[1]

### READ LOGO
logo = Image.open(sys.argv[2]).convert("RGBA")

## BG COLOR
bgColor = sys.argv[3]

### GET LOGO DIMENSIONS
width, height = logo.size

### SET LOGO SIZE
if width != height:
    aspectRatio = width / height
    if aspectRatio > 1:
        logo = logo.resize((1000, int(1000*aspectRatio)), Image.ANTIALIAS)
    else:
        logo = logo.resize((int(1000*aspectRatio), 1000), Image.ANTIALIAS)

if width != 1000 and height != 1000:
    logo = logo.resize((1000, 1000), Image.ANTIALIAS)

width, height = logo.size

### CREATE 3000x1000 BANNER WITH LOGO'S MOST USED COLOR AS BG
banner = Image.new("RGB", (3000, 1000), color = bgColor)

### RESIZE LOGO TO FIT BANNER
logo = logo.resize((int(height/2),int(width/2)), Image.ANTIALIAS)

### PASTE LOGO ON BANNER
banner.paste(logo, (int(1500-width/2/2), 140), logo)

def isBright(img):
   im = img.convert('L')
   stat = ImageStat.Stat(im)
   return stat.mean[0] > 155


### SET FONT AND WRITE ON BANNER
font = ImageFont.truetype("/app/font/Sofia_Pro_Black_Az.otf", 100)

draw = ImageDraw.Draw(banner)

draw.text((3000/2, 850), f"Velkommen til {clubName} sin nettbutikk!", font=font, anchor="mm", fill=((0, 0, 0) if isBright(banner) else (255, 255, 255)))

bannerName = "banner_" + str(uuid.uuid4().hex[:8])

### SAVE BANNER
banner.save("/app/img/banner/" + bannerName + ".png")

print('{"banner": "/img/banner/' + bannerName + '.png"}')

sys.stdout.flush()

sys.exit()