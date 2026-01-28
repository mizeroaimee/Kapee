#!/usr/bin/env python3
import re

file_path = 'src/pages/ProductDetails.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all base64 images with working Unsplash URLs
# Use a non-greedy match to stop at the first closing quote
content = re.sub(
    r'"data:image/jpeg;base64,[^"]*"',
    '"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop"',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully replaced all broken base64 image URLs with Unsplash URLs')
