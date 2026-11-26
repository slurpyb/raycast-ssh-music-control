import { controlMusic } from "./lib/control-music";

export default async function Previous(): Promise<void> {
  await controlMusic("back track", "⏮️ Previous Track");
}
