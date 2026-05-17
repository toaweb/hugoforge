#!/usr/bin/env bash
# Generate branded static assets (OG image + favicons) from SVG sources.
# Sources live in assets/svg/; outputs are written to static/.
#
# Requires: node + @resvg/resvg-js + png-to-ico (installed in node_modules).
# Run from project root:  bash scripts/generate-assets.sh
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/generate-assets.js
