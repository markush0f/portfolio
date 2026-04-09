import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const conflictMarkerPattern = /^(<<<<<<<|=======|>>>>>>>)( .*)?$/m;
const rootsToScan = ["src", "test", "scripts", "package.json", "tsconfig.json"];
const detectedConflicts = [];

async function collectFiles(targetPath) {
  const targetStats = await stat(targetPath);

  if (targetStats.isFile()) {
    return [targetPath];
  }

  const children = await readdir(targetPath);
  const nestedFiles = await Promise.all(
    children.map((child) => collectFiles(path.join(targetPath, child))),
  );

  return nestedFiles.flat();
}

for (const root of rootsToScan) {
  try {
    const files = await collectFiles(root);

    for (const file of files) {
      const content = await readFile(file, "utf8");

      if (conflictMarkerPattern.test(content)) {
        detectedConflicts.push(file);
      }
    }
  } catch {
    // Ignore missing optional paths.
  }
}

if (detectedConflicts.length > 0) {
  console.error("Conflict markers detected in:");
  detectedConflicts.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}
