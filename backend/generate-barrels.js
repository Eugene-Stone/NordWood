import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "src");
const outputDir = path.join(__dirname, "types");
const outputFile = path.join(outputDir, "index.ts");

function getTsFiles(dir, fileList = []) {
	if (!fs.existsSync(dir)) return fileList;

	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			getTsFiles(filePath, fileList);
		} else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
			const content = fs.readFileSync(filePath, "utf8");
			if (
				content.includes("interface ") ||
				content.includes("export interface")
			) {
				// Очищаем имя файла: заменяем дефисы на нижнее подчеркивание
				let safeName = path.basename(file, ".ts").replace(/-/g, "_");

				fileList.push({
					path: filePath,
					name: safeName,
				});
			}
		}
	});
	return fileList;
}

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const allFiles = getTsFiles(srcDir);

// Защита от дубликатов имен файлов
const usedNames = new Set();
const exportsList = allFiles.map((fileObj) => {
	let relativePath = path
		.relative(outputDir, fileObj.path)
		.replace(/\\/g, "/")
		.replace(/\.ts$/, "");

	let exportName = fileObj.name;

	// Если такое имя уже занято (например, вторая "page"), добавляем суффикс на основе пути
	if (usedNames.has(exportName)) {
		if (relativePath.includes("components/")) {
			exportName = `Component_${exportName}`;
		} else if (relativePath.includes("api/")) {
			exportName = `Api_${exportName}`;
		} else {
			// Падаем на случай третьего дубля, просто добавив случайный индекс или счетчик
			exportName = `${exportName}_2`;
		}
	}

	usedNames.add(exportName);

	return `export * as ${exportName} from '${relativePath}';`;
});

fs.writeFileSync(outputFile, exportsList.join("\n") + "\n");
console.log(
	`✅ Успешно сгенерировано: ${exportsList.length} реэкспортов в ${outputFile}`,
);
