import { controlMusic } from "./lib/control-music";

export default async function PlayPause(): Promise<void> {
  await controlMusic("playpause", "⏯️ Play/Pause");
}
