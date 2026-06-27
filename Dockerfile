FROM node:18-alpine AS base
WORKDIR /app
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/storage ./storage
RUN chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["node", "server.js"]