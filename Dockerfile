FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory
# (this will cache them and speed up future builds)
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Copy node_modules from temp directory and all (non-ignored)
# project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Build the app
ENV NODE_ENV=production
RUN bun --bun run build

# Copy dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=prerelease /usr/src/app/.git .
COPY --from=prerelease /usr/src/app/build .

# Add git so webapp can parse current commit hash
# TODO: Find away to predefine hash during build process
RUN apk add git
USER bun
RUN git config --global --add safe.directory /usr/src/app

EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "--bun", "run", "start" ]
