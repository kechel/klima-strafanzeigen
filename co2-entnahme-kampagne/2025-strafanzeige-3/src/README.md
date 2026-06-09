# Strafanzeige 2025-3: Antwort auf Blankettnorm-Argumentation

## Übersicht
Modulare Strafanzeige als Antwort auf die Blankettnorm-Argumentation der Staatsanwaltschaften.

## Dokument-Module
1. **`01-adresse.md`** - Adressteil mit Serienbrief-Feldern
2. **`02-uebersicht.md`** - Übersicht der vier Strafanzeigen
3. **`03-erkenntnisfortschritt.md`** - Hinfällige Genehmigungen
4. **`04-fahrlaessigkeit.md`** - Fahrlässige Genehmigungsverfahren
5. **`05-co2-verantwortung.md`** - Individuelle CO₂-Verantwortung
6. **`06-kosten-nutzen.md`** - Kosten-Nutzen-Analyse

## Anhänge
1. **`anhang-carbon-removal.md`** - Anhang 1: Carbon-Removal Erläuterung
2. **`anhang-klimaschaeden-kosten.md`** - Anhang 2: Klimaschädens-Kostenliste

## Build-Prozess

### Voraussetzungen
```bash
# pandoc installieren (macOS)
brew install pandoc

# pandoc installieren (Linux)
sudo apt-get install pandoc
```

### Build ausführen
```bash
# In das Arbeitsverzeichnis wechseln
cd 2025-strafanzeige-3

# Build-Script ausführen
./build.sh
```

**Ergebnis:** `strafanzeige-combined.odt` - Bereit für LibreOffice Writer

### Nachbearbeitung in LibreOffice
1. **Formatierung anpassen:** Schriftart, Abstände, Überschriften
2. **Serienbrief einrichten:** Verbindung zu `../staatsanwaltschaften.csv`
3. **Serienfelder ersetzen:** `[SERIENFELD: Ort]` → Serienbrief-Felder
4. **Final abspeichern:** Als Serienbrief-Vorlage

## Entwicklung
- **Format:** Stichpunkte + Fußnoten (kompakt, lesbar)
- **Bilder:** Platzhalter `[BILD: Beschreibung]` oder Markdown-Links
- **Modular:** Einzelne Dateien für einfache Bearbeitung