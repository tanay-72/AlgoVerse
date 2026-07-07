# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /repo
RUN corepack enable

# ---- deps: install full workspace dependencies ----
FROM base AS deps
COPY package.json package-lock.json turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN npm ci

# ---- build: generate Prisma client and compile TypeScript ----
FROM base AS build
COPY --from=deps /repo/node_modules ./node_modules
COPY . .
RUN npm run db:generate --workspace=apps/api
RUN npm run build --workspace=@algoverse/shared-types --if-present
RUN npm run build --workspace=apps/api
RUN test -f apps/api/dist/main.js || (echo "ERROR: nest build did not produce apps/api/dist/main.js" && exit 1)

# ---- runtime: minimal production image ----
FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/apps/api/dist ./apps/api/dist
COPY --from=build /repo/apps/api/prisma ./apps/api/prisma
COPY --from=build /repo/apps/api/package.json ./apps/api/package.json

# @algoverse/shared-types is linked into node_modules as an npm workspace
# symlink pointing outside node_modules (../../packages/shared-types). Some
# build/registry pipelines don't reliably preserve symlinks that cross
# directory boundaries across image layers, so replace it with a real,
# self-contained copy instead of depending on the symlink surviving intact.
RUN rm -f node_modules/@algoverse/shared-types
COPY --from=build /repo/packages/shared-types/dist ./node_modules/@algoverse/shared-types/dist
COPY --from=build /repo/packages/shared-types/package.json ./node_modules/@algoverse/shared-types/package.json

RUN test -f apps/api/dist/main.js || (echo "ERROR: main.js missing from runtime image after COPY" && exit 1)
RUN test ! -L node_modules/@algoverse/shared-types || (echo "ERROR: @algoverse/shared-types is still a symlink" && exit 1)
RUN node -e "require('reflect-metadata'); require('./apps/api/dist/modules/algorithms/dto/query-algorithms.dto.js')" || (echo "ERROR: compiled app cannot resolve @algoverse/shared-types at runtime" && exit 1)

# Stamp the exact build time into the image so /api/health can prove whether a
# running container is actually serving this image or a stale one.
RUN date -u +"%Y-%m-%dT%H:%M:%SZ" > apps/api/dist/.built-at && cat apps/api/dist/.built-at

EXPOSE 4000
# Print the build marker and a directory listing of the shared-types package
# before starting node, so this is visible in deploy logs even if node
# crashes immediately during module loading.
CMD ["sh", "-c", "echo \"IMAGE BUILT AT: $(cat apps/api/dist/.built-at)\"; echo 'node_modules/@algoverse/shared-types contents:'; find node_modules/@algoverse/shared-types; exec node apps/api/dist/main.js"]
