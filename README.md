# Stream HD Media Player

A responsive single-page media player for sources that you own or are authorized to play. It is a static site deployable to Vercel.

## Features

- Direct audio, video, HLS (`.m3u8`), and YouTube links; local audio/video files
- TMDB movie/series metadata and search
- Installable PWA app shell with offline shell caching
- Phone/tablet responsive layout, keyboard/TV remote navigation, and Picture-in-Picture where supported
- Browser-local library backup/import and channel management

## Deploy

Deploy the repository root to Vercel. Keep `index.html`, `vercel.json`, `manifest.json`, `sw.js`, and `icon.svg` at the root. The service worker caches the app shell only; media streams remain online.

## TMDB setup

Open **Admin** in the browser, set a local admin password, enter your own TMDB API key, and save it. The key is stored only in that browser. Since client-side keys are visible to site visitors, restrict the key at TMDB; a server-side API proxy is recommended for a public production deployment. Search and title metadata remain disabled until a valid key is supplied.

The TMDB key previously embedded in the public source should be revoked/rotated before deployment.

## Add media and TV

Use **Admin** to add YouTube videos/channels or direct audio/video/HLS URLs. Direct source URLs must be absolute HTTP(S) links and work only when supported by the browser, the stream's codecs, and its CORS policy. For catalog items, add the TMDB ID; playback is available only when an authorized direct playback URL is supplied. Otherwise, use **Official Source** to discover licensed watch options.

Common audio formats include MP3, M4A, AAC, WAV, OGG, OPUS, and FLAC. Common video formats include MP4, WebM, MOV, and HLS; actual support varies by device. DRM playback and MPEG-DASH are not implemented.

## Access-control note

The Admin and VIP controls are local convenience features stored in browser storage, not authentication or authorization. Do not rely on them to protect private media or server operations.

## License and source rights

Only add streams you are authorized to distribute or play. TMDB supplies catalog metadata, not movie/series playback.
