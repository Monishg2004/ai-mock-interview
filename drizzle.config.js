import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://ai-mock-interview_owner:wLI7PtAvEa0e@ep-shrill-bread-a1fmjum6.ap-southeast-1.aws.neon.tech/ai-mock-interview?sslmode=require",
  },
});
