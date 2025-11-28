#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const allowedRoots = [
    path.join('apps', 'studio', 'src', 'app', 'dashboard'),
    path.join('apps', 'studio', 'src', 'app', 'studio'),
].map((p) => path.join(repoRoot, p));

const ignoredDirs = new Set([
    'node_modules',
    '.git',
    '.turbo',
    '.next',
    'dist',
    'build',
    'storybook-static',
]);

const validExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);

async function walk(dir, collector) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (ignoredDirs.has(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await walk(fullPath, collector);
            continue;
        }

        if (!validExtensions.has(path.extname(entry.name))) continue;
        const content = await fs.readFile(fullPath, 'utf8');
        if (!content.includes("@/components/ui")) continue;

        const normalizedPath = fullPath.split(path.sep).join(path.posix.sep);
        const isAllowed = allowedRoots.some((allowed) =>
            normalizedPath.startsWith(allowed.split(path.sep).join(path.posix.sep))
        );

        if (!isAllowed) {
            collector.push(normalizedPath.replace(repoRoot.split(path.sep).join(path.posix.sep), '.'));
        }
    }
}

(async () => {
    const violations = [];
    await walk(repoRoot, violations);

    if (violations.length > 0) {
        console.error('\n🚫 Uso indevido de shadcn detectado fora de /dashboard e /studio:');
        violations.forEach((file) => console.error(` - ${file}`));
        console.error('\nAcesse README.md para a política completa.');
        process.exit(1);
    }

    console.log('✅ Nenhum uso indevido de shadcn encontrado.');
})();
