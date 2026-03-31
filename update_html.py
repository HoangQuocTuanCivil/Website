import os
import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace inline CSS with link
# Find the style block that starts with /* ---- HERO ---- */
style_pattern = re.compile(r'<style>\s*/\* ---- HERO ---- \*/.*?</style>', re.DOTALL)
content = style_pattern.sub('<link rel="stylesheet" href="styles/hero.css">', content)

# Replace inline JS for Hero Scene
js_pattern = re.compile(r'/\* ========= Hero Cosmos Canvas ========= \*/.*?\(\);\s*', re.DOTALL)
content = js_pattern.sub('', content)

# Add the script tag where the hero script used to be
content = content.replace('<script>\n    </script>', '<script src="js/hero-scene.js"></script>')
content = content.replace('<script>\n\n    </script>', '<script src="js/hero-scene.js"></script>')
content = re.sub(r'<script>\s*</script>', '<script src="js/hero-scene.js"></script>', content)

# Replace CTA block
cta_old = r'<a href="mailto:hoangquoctuan1395@gmail.com" class="btn btn-primary btn-lg" data-i18n="cta.button">Liên hệ với chúng tôi</a>'
cta_new = r'''<form action="https://formspree.io/f/mqazpjwk" method="POST" class="contact-form" style="max-width: 500px; margin: 2rem auto; text-align: left; display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" name="name" placeholder="Họ và tên của bạn" required style="padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white; font-family: inherit;">
                <input type="email" name="email" placeholder="Email liên hệ" required style="padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white; font-family: inherit;">
                <textarea name="message" rows="4" placeholder="Nội dung cần tư vấn..." required style="padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white; font-family: inherit; resize: vertical;"></textarea>
                <button type="submit" class="btn btn-primary btn-lg" style="border: none; cursor: pointer; text-align: center; width: 100%;" data-i18n="cta.button">Gửi Liên hệ</button>
            </form>'''
content = content.replace(cta_old, cta_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Add Open Graph Tags to all html files
og_tags = """
    <!-- Open Graph SEO -->
    <meta property="og:title" content="Hoang Quoc Tuan | BIM Innovator">
    <meta property="og:description" content="Chuyên gia giải pháp BIM & Digital Twin tại Việt Nam">
    <meta property="og:image" content="https://hoangquoctuan.com/assets/anh_dai_dien.jpg">
    <meta property="og:url" content="https://hoangquoctuan.com">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    if "<!-- Open Graph SEO -->" not in file_content:
        file_content = file_content.replace('</title>', '</title>' + og_tags)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(file_content)

print("HTML files updated successfully!")
