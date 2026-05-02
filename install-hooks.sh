#!/usr/bin/env bash
# Installs git hooks from .githooks/ into .git/hooks/
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOKS_SRC="$REPO_ROOT/.githooks"
HOOKS_DST="$REPO_ROOT/.git/hooks"

for hook in "$HOOKS_SRC"/*; do
    name=$(basename "$hook")
    target="$HOOKS_DST/$name"
    if [ -f "$target" ] && [ ! -L "$target" ]; then
        mv "$target" "$target.bak"
        echo "Backed up existing $name → $name.bak"
    fi
    ln -sf "$hook" "$target"
    echo "Installed: $name"
done

if ! command -v exiftool &>/dev/null; then
    echo ""
    echo "WARNING: exiftool not found. The pre-commit hook will warn but not block."
    echo "         Install it to enable automatic geotag removal:"
    echo "         brew install exiftool"
fi

echo ""
echo "Git hooks installed."
