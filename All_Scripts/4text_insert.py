import os
from PIL import Image, ImageDraw, ImageFont
import pillow_avif  # This registers the AVIF opener/saver with Pillow

def process_images():
    # --- Configuration ---
    INPUT_FOLDER = "backdrops"
    OUTPUT_FOLDER = "output"
    FONT_PATH = "Montserrat.ttf"
    TARGET_SIZE = (640, 360)  
    ZOOM_FACTOR = 1.1          
    
    # Colors
    TEXT_COLOR = (113, 0, 0)      # Dark Red
    BTN_BG_COLOR = (255, 255, 255, 140) 
    BORDER_COLOR = (255, 140, 0)  # Orange
    BORDER_WIDTH = 6            
    
    # AVIF specific quality (usually 60-70 in AVIF is equivalent to 85 in WebP)
    AVIF_QUALITY = 40 

    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    valid_extensions = ('.jpg', '.jpeg', '.JPG', '.JPEG', 'webp', 'png')
    files = [f for f in os.listdir(INPUT_FOLDER) if f.endswith(valid_extensions)]

    if not files:
        print("No JPG files found!")
        return

    for filename in files:
        try:
            img_path = os.path.join(INPUT_FOLDER, filename)
            name_text = os.path.splitext(filename)[0].replace("-", " ").title()
            # Changed extension to .avif
            output_path = os.path.join(OUTPUT_FOLDER, f"{os.path.splitext(filename)[0]}.avif")

            with Image.open(img_path) as img:
                img = img.convert("RGBA")
                
                # --- 1. Object-Cover + Zoom Logic ---
                target_ratio = TARGET_SIZE[0] / TARGET_SIZE[1]
                img_ratio = img.width / img.height

                if img_ratio > target_ratio:
                    new_height = TARGET_SIZE[1]
                    new_width = int(new_height * img_ratio)
                else:
                    new_width = TARGET_SIZE[0]
                    new_height = int(new_width / img_ratio)

                zoomed_width = int(new_width * ZOOM_FACTOR)
                zoomed_height = int(new_height * ZOOM_FACTOR)

                img = img.resize((zoomed_width, zoomed_height), Image.Resampling.LANCZOS)
                left = (zoomed_width - TARGET_SIZE[0]) / 2
                top = (zoomed_height - TARGET_SIZE[1]) / 2
                right = (zoomed_width + TARGET_SIZE[0]) / 2
                bottom = (zoomed_height + TARGET_SIZE[1]) / 2
                img = img.crop((left, top, right, bottom))

                # --- 2. Drawing Layer ---
                overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
                draw = ImageDraw.Draw(overlay)
                
                font_size = int(TARGET_SIZE[0] * 0.04) 
                try:
                    font = ImageFont.truetype(FONT_PATH, font_size)
                except:
                    font = ImageFont.load_default()

                bbox = draw.textbbox((0, 0), name_text, font=font, anchor="mm")
                text_w, text_h = bbox[2] - bbox[0], bbox[3] - bbox[1]

                margin_bottom = 45 
                center_x, center_y = TARGET_SIZE[0] / 2, TARGET_SIZE[1] - margin_bottom

                # Button Rectangle
                padding_x, padding_y = 15, 6
                button_rect = [
                    center_x - (text_w / 2) - padding_x,
                    center_y - (text_h / 2) - padding_y,
                    center_x + (text_w / 2) + padding_x,
                    center_y + (text_h / 2) + padding_y
                ]

                draw.rounded_rectangle(button_rect, radius=3, fill=BTN_BG_COLOR)
                draw.text((center_x, center_y), name_text, font=font, fill=TEXT_COLOR, anchor="mm")

                # --- 3. Draw the Orange Border ---
                draw.rectangle(
                    [0, 0, TARGET_SIZE[0], TARGET_SIZE[1]], 
                    outline=BORDER_COLOR, 
                    width=BORDER_WIDTH
                )

                # --- 4. Save as AVIF ---
                final_img = Image.alpha_composite(img, overlay).convert("RGB")
                # Format is now AVIF
                final_img.save(output_path, "AVIF", quality=AVIF_QUALITY)
                print(f"✅ Created AVIF: {output_path}")

        except Exception as e:
            print(f"❌ Error with {filename}: {e}")

if __name__ == "__main__":
    process_images()