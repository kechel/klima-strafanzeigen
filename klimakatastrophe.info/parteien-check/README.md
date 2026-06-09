# Parteienanalyse 2025 - Versprechen vs. Wirkung

Modulares HTML-System zur Analyse der Bundestagswahlprogramme 2025

## Struktur

```
/
├── index.html      - Hauptseite mit Übersicht und Vergleichstabellen
├── styles.css      - Alle CSS-Styles (zentral)
├── script.js       - JavaScript für Interaktivität
└── README.md       - Diese Datei
```

## Features

### Modularer Aufbau
- **Getrennte Dateien** für HTML, CSS und JavaScript
- **Einfache Wartung**: Styles ändern ohne HTML anzufassen
- **Wiederverwendbar**: CSS und JS können für weitere Seiten genutzt werden

### Übersichtliche Tabellen
1. **Gesamtvergleich**: Alle Parteien mit Diskrepanz-Bewertung
2. **Migration**: Die dramatischsten Umkehrungen
3. **Rente**: Unbezahlbare Versprechen
4. **Klimapolitik**: Versprechen vs. Taten
5. **NEU: Politisches Spektrum**: Links/Rechts/Alice im Wunderland nach realer Wirkung

### Visuelle Features
- **Diskrepanz-Balken**: Farbcodiert (Grün/Gelb/Rot)
- **Sticky Navigation**: Bleibt beim Scrollen sichtbar
- **Responsive**: Funktioniert auf Desktop und Mobile
- **Smooth Scrolling**: Sanfte Navigation zwischen Sektionen

### Verständliches System
- **Keine abstrakten Punkte** (+3/-4) sondern klare Beschreibungen
- **Prozent-Diskrepanz**: 0% = perfekt, 100% = totale Umkehrung
- **Verbale Bewertung**: Was versprochen wird vs. was passieren würde

## Verwendung

### Lokal testen
1. Alle drei Dateien in einen Ordner legen
2. `index.html` im Browser öffnen

### Online stellen
1. Alle drei Dateien auf Webserver hochladen
2. Fertig - keine weiteren Abhängigkeiten nötig

### Anpassungen vornehmen

**Farben ändern:**
```css
/* In styles.css, Zeile 1-12 */
:root
{
  --color-primary: #2c5282  /* Hauptfarbe ändern */
  --color-accent: #e53e3e   /* Akzentfarbe ändern */
}
```

**Neue Partei hinzufügen:**
```html
<!-- In index.html, bei den overview-cards -->
<div class="party-card">
  <div class="party-header">
    <div class="party-badge neue-partei"></div>
    <h3 class="party-name">NEUE PARTEI</h3>
  </div>
  <!-- Rest wie bei anderen Parteien -->
</div>
```

```css
/* In styles.css, bei party-badge Farben */
.party-badge.neue-partei { background: #ff0000 }
```

**Tabellen erweitern:**
```html
<!-- Neue Zeile in Tabelle einfügen -->
<tr>
  <td>Inhalt Spalte 1</td>
  <td>Inhalt Spalte 2</td>
  <td>Inhalt Spalte 3</td>
</tr>
```

## Diskrepanz-Skala

- **0-20%** = Hohe Kohärenz (Grün) - Versprechen und Wirkung stimmen überein
- **21-50%** = Mittlere Kohärenz (Gelb) - Deutliche Abweichungen
- **51-100%** = Niedrige Kohärenz (Rot) - Starke bis totale Umkehrung

## Spektrum-Einordnung nach Wirkung

Die Analyse ordnet Parteien nicht nach Rhetorik, sondern nach realer systemischer Wirkung:

- **◄ LINKS** = Kohärente Politik - Klimaschutz ermöglicht versprochene Ziele (Linke, Grüne)
- **◆ ZENTRUM** = Inkohärente Politik - Vage Klimapolitik untergräbt eigene Ziele (SPD)
- **🐰 ALICE IM WUNDERLAND** = Selbstzerstörend - Produziert das Gegenteil der Versprechen (CDU, FDP, AfD)

Eine Partei, die "Heimat schützen" verspricht, aber die Heimat durch Klimaignoranz unbewohnbar macht, ist nicht "rechts" - sie ist Alice im Wunderland.

## Wissenschaftliche Grundlage

Die Bewertungen basieren auf:
- IPCC 6. Sachstandsbericht (Klimawandel)
- IOM Prognosen (Klimamigration)
- Offizielle Wahlprogramme 2025
- WZB Manifesto-Analysen

## Browser-Kompatibilität

Getestet in:
- Chrome/Edge (aktuell)
- Firefox (aktuell)
- Safari (aktuell)
- Mobile Browser (iOS/Android)

## Lizenz

Die Analyse dient der politischen Bildung. Quellen sind im Quellenverzeichnis verlinkt.
