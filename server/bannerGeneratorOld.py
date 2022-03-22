import sys
from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageOps

### DECLARE CLUBNAME
clubName = sys.argv[1]

### READ LOGO
logo = Image.open(sys.argv[2])

## BG COLOR
bgColor = sys.argv[3]

### CONVERT LOGO TO RGB
rgbLogo = logo.convert("RGB")

### GET LOGO PIXELS
pixels = list(rgbLogo.getdata())

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

### GET PIXELS TO SKIP FOR LOOPING THROUGH LOGO PIXELS
pixelsToSkip = int(width/2) + 1
everyNthPixel = pixels[::pixelsToSkip]

### DICT FOR STORING UNIQUE COLORS IN LOGO
readPixels = {}

### LOOP THROUGH EVERY NTH PIXEL AND STORE UNIQUE COLORS
for pixel in everyNthPixel:
    if pixel not in readPixels and pixel != (0, 0, 0) and pixel != (255, 255, 255):
        readPixels[pixel] = pixels.count(pixel)

### IF NO COLORS, SET COLOR == WHITE
if len(readPixels) == 0:
    readPixels[(255, 255, 255)] = 1

### SORT DICT IN DESC. ORDER AFTER MOST USED COLORS
sortedPixels = sorted(readPixels.items(), key = lambda x: x[1], reverse = True)

### GET THE MOST USED COLOR FROM LOGO
mostUsedColor = sortedPixels[0][0]
secondMostUsedColor = sortedPixels[1][0]

if sys.argv[3]:
    mostUsedColor = bgColor

### CREATE 3000x1000 BANNER WITH LOGO'S MOST USED COLOR AS BG
banner = Image.new("RGB", (3000, 1000), color = mostUsedColor)

### RESIZE LOGO TO FIT BANNER
logo = logo.resize((int(height/2),int(width/2)), Image.ANTIALIAS)

### PASTE LOGO ON BANNER
banner.paste(logo, (int(1500-width/2/2), 140), logo)

### CHECK IF BANNER IS TOO BRIGHT (LOGO NOT VISIBLE), AND IF SO, SET BG = BLACK
extrema = banner.convert("L").getextrema()

avgBrightness = sum(extrema)/len(extrema)

if avgBrightness > 240:
    mostUsedColor = (0, 0, 0)
    banner = Image.new("RGB", (3000, 1000), color = (mostUsedColor))
    banner.paste(logo, (int(1500-width/2/2), 140), logo)
    

### SET FONT AND WRITE ON BANNER
font = ImageFont.truetype("./font/Sofia Pro Black Az.otf", 100)
draw = ImageDraw.Draw(banner)

draw.text((3000/2, 850), f"Velkommen til {clubName} sin nettbutikk!", font=font, anchor="mm", fill=((0, 0, 0) if mostUsedColor == (255,255,255) else (255,255,255)))

### SAVE BANNER
banner.save("./img/banner/banner.png")

bannerWithBorder = ImageOps.expand(Image.open("./img/banner/banner.png"), border=30, fill=(secondMostUsedColor))

bannerWithBorder.save("./img/banner/banner_with_border.png")

print('{"banner": "/img/banner/banner.png", "bannerWithBorder": "/img/banner/banner_with_border.png"}')

sys.stdout.flush()