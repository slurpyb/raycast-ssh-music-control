import { controlMusic } from "./lib/control-music";

export default async function Next(): Promise<void> {
  await controlMusic("next track", "⏭️ Next Track");
}
