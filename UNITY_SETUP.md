# Unity WebGL Build Setup

Guide for building and integrating a Unity project as a WebGL demo in this Next.js site.

## Prerequisites

- Unity 2020.3 LTS or newer (2021+/2022+ recommended)
- A Unity project ready to build

## Building for WebGL

### 1. Configure Build Settings

In Unity, open **File > Build Settings**:

1. Select **WebGL** as the target platform
2. Click **Switch Platform** if not already selected
3. Click **Player Settings** and configure the options below

### 2. Player Settings (Recommended)

Under **Edit > Project Settings > Player > WebGL**:

- **Resolution and Presentation**
  - Default Canvas Width: `960`
  - Default Canvas Height: `600`
  - Run In Background: `enabled`
- **Publishing Settings**
  - Compression Format: `Disabled` (simplest setup; see Compression section below)
  - Decompression Fallback: `enabled` (if using compression)
  - Data Caching: `enabled`
- **Other Settings**
  - Color Space: `Gamma` (better WebGL compatibility)
  - Auto Graphics API: `enabled`
  - Strip Engine Code: `enabled` (reduces build size)
  - Managed Stripping Level: `Low` or `Medium`

### 3. Build the Project

1. Open **File > Build Settings**
2. Click **Build**
3. Select an output folder (e.g., `unity-webgl-build/`)
4. Wait for the build to complete

### 4. Locate the Build Output

After building, Unity creates a `Build/` folder containing:

```
unity-webgl-build/
  Build/
    Build.loader.js     <- WebGL loader script
    Build.data           <- Game data/assets
    Build.framework.js   <- Unity framework
    Build.wasm           <- WebAssembly binary
```

The exact filenames depend on your project name. The default is `Build.*`.

## Placing Files in the Project

Copy the four build files into `public/unity-build/`:

```
public/
  unity-build/
    Build.loader.js
    Build.data
    Build.framework.js
    Build.wasm
```

The `UnityPlayer` component expects this path and naming by default. If your build files have different names, pass the `buildName` prop:

```tsx
<UnityPlayer buildName="MyGame" />
```

This would look for `MyGame.loader.js`, `MyGame.data`, etc.

### File Structure

```
mnm-resume/
  public/
    unity-build/          <- Create this directory
      Build.loader.js
      Build.data
      Build.framework.js
      Build.wasm
  components/
    UnityPlayer.tsx       <- Loads files from /unity-build/
  pages/
    index.tsx             <- Unity Demo tab
```

## Compression Options

### No Compression (Simplest)

Set **Compression Format** to `Disabled` in Player Settings. Files will be larger but work everywhere with no server configuration.

### Gzip Compression

Set **Compression Format** to `Gzip`. Build output will have `.gz` extensions:

```
Build.loader.js
Build.data.gz
Build.framework.js.gz
Build.wasm.gz
```

Your hosting server must serve these with the correct `Content-Encoding: gzip` header, or enable **Decompression Fallback** in Unity Player Settings (adds a JS decompressor, slightly increases loader size).

### Brotli Compression

Set **Compression Format** to `Brotli`. Produces smallest files (`.br` extensions). Requires HTTPS and proper server headers. Enable **Decompression Fallback** if unsure about server support.

**Recommendation:** Start with `Disabled` compression for initial testing, then switch to Gzip with Decompression Fallback for production.

## Testing Locally

1. Place your build files in `public/unity-build/`
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open the site and click the **Unity Demo** tab
4. The Unity build should load with a progress bar

If the build files are not found, the tab will show a placeholder message listing the expected file paths.

## Troubleshooting

**Build not loading:**
- Verify all four files exist in `public/unity-build/`
- Check the browser console for errors
- Ensure filenames match (case-sensitive)

**WASM streaming error:**
- Your server may not serve `.wasm` files with `application/wasm` MIME type
- Add WASM MIME type to your server config or use Next.js headers config

**Memory errors:**
- Reduce texture sizes and asset quality in Unity
- Set a reasonable memory limit in Player Settings
- Use Strip Engine Code to reduce binary size

**Black screen after loading:**
- Check Unity console for runtime errors before building
- Ensure your scene has a camera and proper lighting
- Test the build locally with Unity's built-in server first

## Performance Tips

- Use texture compression (ASTC for mobile, DXT for desktop)
- Enable **Strip Engine Code** and use **Medium** stripping level
- Remove unused packages from Unity Package Manager
- Use addressable assets for large content
- Keep the initial scene lightweight
- Target WebGL 2.0 for better shader support
