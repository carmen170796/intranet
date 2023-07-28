# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /drsa_reimbursement

ADD package.json package-lock.json .npmrc ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /drsa_reimbursement

COPY --from=deps /drsa_reimbursement/node_modules /drsa_reimbursement/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

WORKDIR /drsa_reimbursement

COPY --from=deps /drsa_reimbursement/node_modules /drsa_reimbursement/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV PORT="8080"
ENV NODE_ENV="production"

WORKDIR /drsa_reimbursement

COPY --from=production-deps /drsa_reimbursement/node_modules /drsa_reimbursement/node_modules

COPY --from=build /drsa_reimbursement/build /drsa_reimbursement/build
COPY --from=build /drsa_reimbursement/public /drsa_reimbursement/public
COPY --from=build /drsa_reimbursement/package.json /drsa_reimbursement/package.json
COPY --from=build /drsa_reimbursement/start.sh /drsa_reimbursement/start.sh

ENTRYPOINT [ "./start.sh" ]
