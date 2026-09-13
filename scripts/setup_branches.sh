#!/bin/bash
# ============================================================================
# KIOT FEST - REBUILD GENUINE INCREMENTAL WORKSHOP BRANCHES
# ============================================================================

set -e
echo "🚀 Building all 18 progressive workshop branches with genuine code steps..."
node "$(dirname "$0")/build_all_branches.js"
echo "✅ All 18 branches rebuilt successfully!"
