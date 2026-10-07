# Stream HD Media Player

A responsive single-page media player for sources that you own or are authorized to play. It is a static site deployable to Vercel.

## Features

- Direct audio, video, HLS (`.m3u8`), and YouTube links; local audio/video files
- TMDB movie/series metadata and search
- Installable PWA app shell with offline shell caching
- Phone/tablet responsive layout, keyboard/TV remote navigation, and Picture-in-Picture where supported
- Browser-local library backup/import and channel management

## Deploy

Deploy the repository root to Vercel. Keep `index.html`, `api/`, `vercel.json`, `manifest.json`, `sw.js`, and `icon.svg` at the root. The service worker caches the app shell only; media streams remain online.

## TMDB setup

In Vercel, open **Project Settings → Environment Variables**, add `TMDB_API_KEY` with your TMDB v3 API key for Production and Preview, then redeploy. The `/api/tmdb/*` serverless proxy injects the key on the server, so it is not sent to browsers. Search and title metadata become available after the redeploy. The Admin key field remains an optional local-development fallback.

The TMDB key previously embedded in the public source should be revoked/rotated before deployment.

## Jamendo music setup

Create an application in the [Jamendo developer portal](https://devportal.jamendo.com/), then add its Client ID to Vercel as `JAMENDO_CLIENT_ID` for Production and Preview. Redeploy after saving it. **Find Music** searches Jamendo automatically and plays the returned stream URL in the built-in audio player; each result includes artist attribution and a link back to Jamendo. Use the API only within Jamendo's license terms and request limits.

## Add media and TV

Use the paste panel to play YouTube, audio, video, or HLS links in the embedded player. **Download** uses a browser-integrated blob download for Jamendo tracks and direct media sources that permit CORS; embedded video and live HLS streams remain playback-only. Jamendo tracks include artist attribution and a link back to their Jamendo page. Direct source URLs must be absolute HTTP(S) links and work only when supported by the browser, the stream's codecs, and its CORS policy. For catalog items, add the TMDB ID for metadata and add an authorized direct MP4, WebM, MOV, or HLS URL in the optional playback field to enable **PLAY FULL**. TMDB does not provide full movie or series files.

Common audio formats include MP3, M4A, AAC, WAV, OGG, OPUS, and FLAC. Common video formats include MP4, WebM, MOV, and HLS; actual support varies by device. DRM playback and MPEG-DASH are not implemented.

## Access-control note

The Admin and VIP controls are local convenience features stored in browser storage, not authentication or authorization. Do not rely on them to protect private media or server operations.

## License and source rights

Only add streams you are authorized to distribute or play. TMDB supplies catalog metadata, not movie/series playback.
