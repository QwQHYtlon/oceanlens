# OceanLens AR Target Files

## ⚠️ TARGET IMAGE MUST BE PROVIDED

**CURRENT STATUS**: BLOCKED

The following files are REQUIRED for MindAR Image Tracking to work:

- `oceanlens-target.jpg` - OceanLens AR target image (MUST BE PROVIDED)
- `oceanlens-target.mind` - Compiled MindAR target file (MUST BE GENERATED)

Without these files, MindAR cannot perform image tracking and the AR feature will not work.

## How to Generate Real Target

### Step 1: Create Target Image

Create a high-quality image with:
- OceanLens logo
- Marine creature illustration
- Ocean background (coral reefs, fish schools, seaweed, rocks)
- Sufficient feature points (avoid large solid colors)
- Avoid symmetry
- Avoid reflective surfaces
- Recommended size: 1600×1200 pixels or similar ratio
- Format: JPG or PNG
- File size: < 1MB for web performance

**Important**: The image must be feature-rich for reliable image tracking. A simple logo-only image will not work well.

### Step 2: Generate .mind File

Use MindAR Compiler: https://hiukim.github.io/mind-ar-js-doc/tools/compile

1. Upload your target image (oceanlens-target.jpg)
2. Download the generated .mind file
3. Rename it to oceanlens-target.mind
4. Place both files in this directory (public/ar/)

### Step 3: Verify Files

Ensure both files exist in `public/ar/`:
- `oceanlens-target.jpg` (your original image)
- `oceanlens-target.mind` (compiled MindAR file)

## Usage

After providing the target files:
1. Print the target image
2. Point mobile camera at the target
3. The 3D marine creature will appear on the target

## Testing

Once target files are provided, test on:
- iPhone Safari (HTTPS required)
- Android Chrome (HTTPS required)

## Current Blocker

Phase 3.6b is BLOCKED until:
1. Real oceanlens-target.jpg is provided
2. Real oceanlens-target.mind is generated using MindAR Compiler
