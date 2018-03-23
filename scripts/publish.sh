# Build JavaScript artifacts
rollup --config scripts/rollup.config.js

# Copy Flow typing to the right place
cp typings/dataclass.js.flow build/dataclass.js.flow
