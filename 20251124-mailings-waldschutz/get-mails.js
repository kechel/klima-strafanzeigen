const fs = require("fs");

// Datei einlesen (HTML oder Text)
const input = fs.readFileSync("input.txt", "utf8");

// einfache, robuste Email-Regex
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// alle Treffer sammeln
const matches = input.match(emailRegex) || [];

// Duplikate entfernen
const unique = [...new Set(matches)];

// Ausgabe kommagetrennt
console.log(unique.join(", "));
