import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.toLowerCase().endsWith(".html")) htmlFiles.push(fullPath);
  }
}

function localTarget(fromFile, reference) {
  const clean = reference.split("#", 1)[0].split("?", 1)[0];
  if (!clean) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    return { invalidEncoding: true, target: clean };
  }
  if (decoded.startsWith("/clean26/")) return path.join(root, decoded.slice(9));
  if (decoded.startsWith("/")) return path.join(root, decoded.slice(1));
  return path.resolve(path.dirname(fromFile), decoded);
}

function resolveExisting(target) {
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    const index = path.join(target, "index.html");
    return fs.existsSync(index) ? index : null;
  }
  return fs.existsSync(target) ? target : null;
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

walk(root);
htmlFiles.sort();

const problems = [];
let referencesChecked = 0;
const attributePattern = /\b(href|data-src|src|poster)\s*=\s*(["'])(.*?)\2/gi;

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const ids = new Set([...source.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)].map((match) => match[2]));
  for (const match of source.matchAll(attributePattern)) {
    const [, attribute, , reference] = match;
    if (reference.startsWith("#")) {
      referencesChecked += 1;
      if (reference.length > 1 && !ids.has(reference.slice(1))) {
        problems.push({ file: relative(file), attribute, reference, issue: "missing fragment on same page" });
      }
      continue;
    }
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|$)/i.test(reference)) continue;
    referencesChecked += 1;
    const result = localTarget(file, reference);
    if (!result) continue;
    if (result.invalidEncoding) {
      problems.push({ file: relative(file), attribute, reference, issue: "invalid URL encoding" });
      continue;
    }
    const existing = resolveExisting(result);
    if (!existing) {
      problems.push({ file: relative(file), attribute, reference, issue: "missing local target" });
      continue;
    }
    const fragment = reference.includes("#") ? reference.slice(reference.indexOf("#") + 1) : "";
    if (fragment && existing.toLowerCase().endsWith(".html")) {
      const targetSource = fs.readFileSync(existing, "utf8");
      const targetIds = new Set([...targetSource.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)].map((item) => item[2]));
      if (!targetIds.has(fragment)) {
        problems.push({ file: relative(file), attribute, reference, issue: "missing fragment on target page" });
      }
    }
  }
}

console.log(JSON.stringify({
  root,
  htmlPages: htmlFiles.length,
  referencesChecked,
  problemCount: problems.length,
  problems,
}, null, 2));

process.exitCode = problems.length ? 1 : 0;
