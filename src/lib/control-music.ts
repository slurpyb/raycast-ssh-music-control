import { getPreferenceValues, showHUD } from "@raycast/api";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { objectHasIn } from "ts-extras";

const execFileAsync = promisify(execFile);

type MusicAction = "back track" | "playpause" | "next track";

/** Sends an AppleScript command to Music on the remote Mac and reports the result in a HUD. */
export const controlMusic = async (action: MusicAction, successMessage: string): Promise<void> => {
  const { sshDestination } = getPreferenceValues<Preferences>();

  try {
    await execFileAsync(
      "/usr/bin/ssh",
      [
        "-o",
        "BatchMode=yes",
        "-o",
        "ConnectTimeout=3",
        "--",
        sshDestination.trim(),
        `osascript -e 'tell application "Music" to ${action}'`,
      ],
      {
        timeout: 10_000,
        // Raycast sets an LC_ALL that macOS's SSH config forwards, and it makes osascript hang on the remote Mac.
        env: { ...process.env, LC_ALL: "en_US.UTF-8" },
      },
    );
  } catch (error) {
    await showHUD(`❌ ${describeFailure(error)}`);
    return;
  }

  await showHUD(successMessage);
};

const describeFailure = (error: unknown): string => {
  const details = error instanceof Error ? error.message : String(error);

  // execFile sets `killed` when its own timeout stops the process.
  if (error instanceof Error && objectHasIn(error, "killed") && error.killed === true) {
    return "SSH took too long and was stopped";
  }

  if (details.includes("Permission denied")) return "SSH login failed. Check your SSH key.";
  if (details.includes("-1743")) return "Allow SSH to control Music on the remote Mac";
  if (details.includes("-1712")) return "Music did not respond. Check the remote Mac for a prompt.";
  if (/Could not resolve hostname|timed out|No route to host|Connection refused/.test(details)) {
    return "Cannot reach the remote Mac";
  }

  return details.trim().split("\n").at(-1) ?? "Unknown error";
};
