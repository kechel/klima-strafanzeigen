# Dateistruktur: Thematisch benannte Strafanzeigen

## Aktuelle Dateien (thematisch organisiert):

### Hauptstrafanzeigen:
- **`hauptanzeige-muellverbrennung.md`** ✅ - Müllverbrennung (NULL Nutzen, sofort abschaltbar)
- **`hauptanzeige-kohlekraftwerke.md`** ⚠️ - Kohlekraftwerke (wirtschaftlich überholt)  
- **`hauptanzeige-menschenrechte.md`** ⚠️ - Systematische Menschenrechtsverletzung

### Beschuldigte (nach Branchen):
- **`beschuldigte-muellverbrennung.md`** ✅ - REMONDIS, ALBA, Veolia, EEW
- **`beschuldigte-kohlekraftwerke.md`** ⚠️ - RWE, LEAG, EnBW, Vattenfall
- **`beschuldigte-behoerden.md`** ⚠️ - Genehmigungsbehörden nach Bundesländern

### Anhänge (thematisch):
- **`anhang-carbon-removal-kosten.md`** ✅ - Carbon-Removal Kosten + Schadensbilanz
- **`anhang-klimaschaeden-kosten.md`** ✅ - Deutsche Klimaschadensbilanz  
- **`anhang-wirtschaftsvergleich.md`** ⚠️ - Erneuerbare vs. fossile Kosten
- **`anhang-menschenrechte-gutachten.md`** ⚠️ - Art. 1, 2, 20a GG Analyse

### Build-System:
- **`build-selective.js`** ✅ - Node.js Builder mit Anhang-Auswahl
- **`build-config.js`** ✅ - Konfiguration für selektive Builds

## Verwendung:

```bash
# Einzelne Strafanzeigen:
node build-selective.js muellverbrennung   # → hauptanzeige-muellverbrennung.odt
node build-selective.js kohlekraftwerke    # → hauptanzeige-kohlekraftwerke.odt  
node build-selective.js menschenrechte     # → hauptanzeige-menschenrechte.odt

# Alle zusammen:
node build-selective.js all
```

## Anhang-Auswahl per Header:

```markdown
<!-- ANHAENGE: carbon-removal-kosten, klimaschaeden-kosten -->

# Hauptanzeige Müllverbrennung
...
```

**Carbon-Removal steht im Zentrum aller Strafanzeigen mit konkreten €-Beträgen pro deutschem Kind!**